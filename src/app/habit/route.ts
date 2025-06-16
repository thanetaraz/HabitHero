import { habits } from "./db";

 export async function GET(){
    return Response.json(habits);
 }
 export async function POST(req: Request){
    const habit = await req.json();
    const newHabit = {...habit};
    habits.push(newHabit);
    return new Response(JSON.stringify(newHabit));
 }