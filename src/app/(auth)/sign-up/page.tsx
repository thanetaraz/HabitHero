"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/actions";
import Link from "next/link";

type FormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const res = await signUp(data);
    if (res.success) {
      toast("Your account has been created successfully.");
      router.push("/sign-in");
    } else {
      setServerError(res.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="email" />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline font-medium text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
