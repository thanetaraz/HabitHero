
import { Prisma } from "@prisma/client";
import { db } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {habitCompletionSchema} from "../../../../schema";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
      const habit = await db.habit.findUnique({ where: {id}});
      if (!habit) return new Response("Not found", { status: 404 });
      return NextResponse.json(habit,{ status:200});  
  } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }  
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
      const isHabitVaild = await db.habit.findUnique({ where: {id}});
      if (!isHabitVaild) return new Response("Not found", { status: 404 });
      await db.habit.delete({ where: {id}});
      return NextResponse.json({ message: "Habit deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err); 
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }  
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
    
  const habit = await db.habit.findUnique({ where: { id } });
  if (!habit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const input = { ...body, habitId: id };
    const result = habitCompletionSchema.safeParse(input);
    
    if (!result.success) {
      let zodErrors = {};
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }
    
    await db.habitCompletion.create({
      data: result.data
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {    
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Completion for this date already exists" },
        { status: 409 }
      );
    }
    
    
    console.error("Error creating habit completion:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}