"use server";

import { db } from "../app/utils/prisma";
import { redirect } from "next/navigation";
import { habitSchema } from "../schema";
import { z } from "zod";

export async function createHabit(values: z.infer<typeof habitSchema>) {
  const result = habitSchema.safeParse(values);

  if (!result.success) {
    return { status: "error", message: result.error.message };
  }    
  const {name,description,category,selectedDays,color} = result.data;

try {    
    const habit = await db.habit.create({
      data: {
        name,
        description,
        category,
        selectedDays,
        color,        
        createdAt: new Date(), 
        
      },
    });

    console.log("Habit created successfully:", habit);
  } catch (error) {
    console.error("Error creating habit:", error);
    throw new Error("Failed to create habit");
  }

  return { status: "success", message: "Habit created successfully" };
}