import { getHabitById ,deteleById} from "@/actions/index";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const habit = await getHabitById(id);
  if (!habit) return new Response("Not found", { status: 404 });
  return Response.json(habit,{ status:200});
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const habit = await getHabitById(id);
  if (!habit) return new Response("Not found", { status: 404 });  
  const deletedHabit  = await deteleById(id);
  return Response.json(deletedHabit,{status:200});
}