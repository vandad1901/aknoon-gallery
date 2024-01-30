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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z
        .string()
        .max(50, "ایمیل باید حداکثر ۵۰ کاراکتر باشد")
        .email({ message: "ایمیل نامعتبر" }),
    password: z
        .string()
        .min(10, { message: "یادآوری: رمز عبور باید حداقل ۱۰ کاراکتر باشد" })
        .max(64, { message: "یادآوری: رمز عبور حداکثر ۵۰ حرف می‌تواند باشد" })
        .regex(/[a-z]/, { message: "یادآوری: رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
        .regex(/[0-9]/, { message: "یادآوری« رمز عبور باید شامل حداقل یک عدد باشد" })
        .regex(/[A-Z@$!%*#?&+\-_=^()]/, {
            message: "یادآوری: رمز عبور باید شامل حداقل یک حرف بزرگ و یا یک کاراکتر خاص باشد",
        }),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className="m-10 flex justify-center">
            <div className="flex w-96 flex-col gap-10 rounded-xl border p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ایمیل</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" dir="ltr" {...field} />
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
                                    <FormLabel className="flex flex-row justify-between">
                                        <p>رمز عبور</p>
                                        <Link href="/forgot-password" className="text-sky-700">
                                            فراموشی رمز عبور
                                        </Link>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" dir="ltr" {...field} />
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
                <Link href="/signup" className="my-10 w-full text-center text-sky-700">
                    اکانت نداری؟ اینجا ثبت نام کن
                </Link>
            </div>
        </div>
    );
}
