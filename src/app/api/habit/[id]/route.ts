import { getHabitById ,deteleById} from "@/actions/index";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const habit = await getHabitById(params.id);
  if (!habit) return new Response("Not found", { status: 404 });
  return Response.json(habit,{ status:200});
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const habit = await getHabitById(params.id);
  if (!habit) return new Response("Not found", { status: 404 });  
  const deletedHabit  = await deteleById(params.id);
  return Response.json(deletedHabit,{status:200});
}