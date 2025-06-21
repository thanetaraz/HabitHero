"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type FormData = z.infer<typeof signUpSchema>;

export default function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        const message =
          res.error === "Configuration"
            ? "Invalid email or password"
            : res.error;

        setServerError(message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

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
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="underline font-medium text-primary">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
