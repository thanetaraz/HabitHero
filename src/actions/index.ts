"use server";

import { db } from "../app/utils/prisma";
import { habitInputSchema } from "../schema";
import { z } from "zod";


export async function createHabit(values: z.infer<typeof habitInputSchema>) {
  const parsed = habitInputSchema.parse(values);
  return db.habit.create({ data: parsed });
}
export async function getHabits() {
  return await db.habit.findMany();
}

export async function getHabitById(id: string) {
    return await db.habit.findUnique({ where: {id}});
}

export async function deteleById(id: string) {
    return await db.habit.delete({ where: {id}});
}