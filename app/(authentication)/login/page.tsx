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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authLogin } from "@/lib/authServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z
        .string()
        .max(50, "ایمیل باید حداکثر ۵۰ کاراکتر باشد")
        .email({ message: "ایمیل نامعتبر" }),
    password: z
        .string()
        .min(8, { message: "یادآوری: رمز عبور باید حداقل ۸ کاراکتر باشد" })
        .max(64, { message: "یادآوری: رمز عبور حداکثر ۶۴ حرف می‌تواند باشد" })
        .regex(/[a-z]/, { message: "یادآوری: رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
        .regex(/[0-9]/, { message: "یادآوری: رمز عبور باید شامل حداقل یک عدد باشد" }),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await authLogin(values.email, values.password);
        if (result && result.error) {
            form.setError("email", {
                type: "manual",
                message: "",
            });
            form.setError("password", {
                type: "manual",
                message: result.error,
            });
        }
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
                                    <Input dir="ltr" type="email" {...field} />
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
                                <FormLabel className="inline-flex w-full flex-row justify-between">
                                    رمز عبور
                                    <Link href="/forgot-password" className="text-sky-700">
                                        فراموشی رمز عبور
                                    </Link>
                                </FormLabel>
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
                        ورود
                    </Button>
                </form>
            </Form>
            <Link href="/signup" className="my-5 w-full text-center text-sky-700 md:my-10">
                اکانت نداری؟ اینجا ثبت نام کن
            </Link>
        </>
    );
}
