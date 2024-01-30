"use server";

import crypto from "crypto";
import prisma from "@/lib/db";
export async function emailExists(email: string) {
    const user = await prisma.users.findUnique({
        where: { email: email },
    });

    return !!user;
}

async function hashScrypt(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString("hex"));
        });
    });
}

export async function registerUser(email: string, password: string) {
    // has the password with scrypt and with a randomly generated salt
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await hashScrypt(password, salt);
    const user = await prisma.users.create({
        data: {
            email: email,
            password_hash: hash,
            password_salt: salt,
        },
    });

    return user;
}
