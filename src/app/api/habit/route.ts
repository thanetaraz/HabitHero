import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { createHabit,getHabits } from "@/actions/index";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const habit = await createHabit(json);
    return Response.json(habit, { status: 201 });

  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json({ error: err.message }, { status: 400 });
    }

    console.error("createHabit error:", err);
    return Response.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(_req: NextRequest) {
  try {
    const habits = await getHabits();
    return Response.json(habits, { status: 200 });
  } catch (error) {
    console.error("GET /api/habit error:", error);
    return Response.json("Internal Server Error", { status: 500 });
  }
}


