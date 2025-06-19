
import { Prisma } from "@prisma/client";
import { db } from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import {habitCompletionSchema} from "../../../../schema";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
      const habit = await db.habit.findUnique({ where: {id}});
      if (!habit) return new Response("Not found", { status: 404 });
      return NextResponse.json(habit,{ status:200});  
  } catch (error) {
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
  } catch (error) {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }  
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  const habit = await db.habit.findUnique({ where: {id}});
  if (!habit) {
    return  NextResponse.json({message: "Habit not found"}, { status: 404 });
  }
  try {    
    const body = await req.json();     
    const input = {...body,habitId: id};        
    const result = habitCompletionSchema.safeParse(input);
    let zodErrors = {};
    if(!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = {...zodErrors, [issue.path[0]] : issue.message};
      return NextResponse.json(
      Object.keys(zodErrors).length > 0 ? {errors: zodErrors} : {success: true});
    });  
  }         
    await db.habitCompletion.create({ data: result.data });
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
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
