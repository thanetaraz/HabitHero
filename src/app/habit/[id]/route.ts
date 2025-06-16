import { habits } from "../db";

export async function GET(_req:Request, {params}:{params: {id:string}}) {
    const {id} = await params;
    const habit = habits.find(h => h.id === +id);
    return habit ? new Response(JSON.stringify(habit)) : new Response("Habit not found",{status: 404});
} 

export async function DELETE(req:Request, {params}:{params: {id:string}}) {
    const {id} = params;
    const habitId = +id;

    const index = habits.findIndex(h => h.id === habitId);
    if(index === -1){
        return new Response(JSON.stringify({error: "Movie not found"}), {
            status: 404
        });
    }

    habits.splice(index,1);

    return new Response(JSON.stringify({message : "Habit deleted successfully"}), {status: 200});

} 