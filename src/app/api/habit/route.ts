import { NextRequest, NextResponse } from "next/server";
import {habitSchema} from "@/schema";
import { db } from "@/lib/prisma";
import { toZonedTime, format } from "date-fns-tz";
const TIMEZONE = "Asia/Bangkok";


export async function POST(req: NextRequest) {
  const body: unknown = await req.json();  
  const result = habitSchema.safeParse(body);
  let zodErrors = {};
  if(!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = {...zodErrors, [issue.path[0]] : issue.message};
    });
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }  
  try {

     const userId = result.data.userId;
    
    const habitCount = await db.habit.count({
      where: { userId },
    });

    if (habitCount >= 10) {
      return NextResponse.json(
        { message: "You can only create up to 10 habits" },
        { status: 400 }
      );
    }

    const newHabit = await db.habit.create({
    data : result.data,    
  });
  return NextResponse.json({ success: true, habit: newHabit }, { status: 201 });  
  } catch (error) {    
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }  
}

export async function GET() {
  try {
    const habits = await db.habit.findMany({ 
      include: { completions: true },
    });
    
    const transformedHabits = habits.map(habit => {
      const transformedCompletions = habit.completions.map(completion => {        
        const dateInBangkok = toZonedTime(completion.date, TIMEZONE);        
        const formattedDate = format(dateInBangkok, "yyyy-MM-dd", { timeZone: TIMEZONE });

        return {
          ...completion,
          date: formattedDate,
        };
      });

      return {
        ...habit,
        completions: transformedCompletions,
      };
    });

    return NextResponse.json(transformedHabits, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 


