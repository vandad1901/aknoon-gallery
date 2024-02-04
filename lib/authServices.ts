"use server";

import type { Session, User } from "lucia";

import { Argon2id } from "oslo/password";
import { cache } from "react";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function emailExists(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    return !!user;
}

export async function authSignUp(email: string, password: string): Promise<ActionResult> {
    await prisma.user.deleteMany();
    const hash = await new Argon2id().hash(password);
    try {
        const user = await prisma.user.create({
            data: {
                id: generateId(15),
                email: email,
                password_hash: hash,
            },
        });
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (e: any) {
        return { error: e.message };
    }
    return redirect("/");
}

export async function authLogin(email: string, password: string): Promise<ActionResult> {
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });
    if (!existingUser) {
        return {
            error: "حسابی با این مشخصات یافت نشد",
        };
    }

    const validPassword = await new Argon2id().verify(existingUser.password_hash, password);
    if (!validPassword) {
        return {
            error: "حسابی با این مشخصات یافت نشد",
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export const validateRequest = cache(async (): Promise<authResultType> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return { isLoggedIn: false, user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);
    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
            // Blank session deletes the session on the user's device
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {}
    if (result.user !== null && result.session !== null) {
        return {
            isLoggedIn: true,
            user: result.user,
            session: result.session,
        };
    }
    return {
        isLoggedIn: false,
        session: result.session,
        user: result.user,
    };
});

type ActionResult = { error: string };
export type authResultType =
    | { isLoggedIn: true; user: User; session: Session }
    | { isLoggedIn: false; user: null; session: null };
