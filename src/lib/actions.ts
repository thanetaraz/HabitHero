"use server";

import { signUpSchema } from "@/schema";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type FormData = {
  email: string;
  password: string;
};

export async function signUp(data: FormData) {
  try {
    const validated = signUpSchema.parse(data);
    
    const hashedPassword = await bcrypt.hash(validated.password, 10);
    
    
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "This email is already registered. Try signing in instead.",
      };
    }

    
    await db.user.create({
      data: {
        email: validated.email,    
        password: hashedPassword,  
      },
    });

    return {
      success: true,
      message: "Signed up successfully",
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    };
  }
}