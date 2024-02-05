"use client";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { authSignUp, emailExists } from "@/lib/authServices";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
    .object({
        email: z
            .string()
            .max(50, "ایمیل باید حداکثر ۵۰ کاراکتر باشد")
            .email({ message: "ایمیل نامعتبر" }),
        password: z
            .string()
            .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" })
            .max(64, { message: "رمز عبور حداکثر ۶۴ حرف می‌تواند باشد" })
            .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
            .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
        confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "رمز عبور ها باید یکسان باشد",
        path: ["confirmPassword"],
    });

export default function SignUp() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (await emailExists(values.email)) {
            form.setError("email", {
                type: "manual",
                message: "ایمیل وارد شده قبلا ثبت شده است",
            });
            return;
        }
        return authSignUp(values.email, values.password);
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ایمیل</FormLabel>
                                <FormControl>
                                    <Input dir="ltr" {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رمز عبور</FormLabel>
                                <FormControl>
                                    <Input dir="ltr" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>تکرار رمز عبور</FormLabel>
                                <FormControl>
                                    <Input dir="ltr" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        variant={"default"}
                        type="submit"
                        className="w-full font-normal text-black">
                        ثبت نام
                    </Button>
                </form>
            </Form>
            <Link href="/login" className="my-5 w-full text-center text-sky-700 md:my-10">
                ورود به اکانت
            </Link>
        </>
    );
}
