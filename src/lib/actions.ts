"use server";

import { signUpSchema } from "@/schema";
import { db } from "@/lib/prisma";

type FormData = {
  email: string;
  password: string;
};

export async function signUp(data: FormData) {
  try {
    const validated = signUpSchema.parse(data);

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "This email is already registered. Try signing in instead.",
      };
    }

    // Save to DB
    await db.user.create({ data: validated });

    return {
      success: true,
      message: "Signed up successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
