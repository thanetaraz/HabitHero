import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "./ui/ConfirmModal"; // import your modal
import { HabitFromDB, habitSchema } from "../../schema";
import { z } from "zod";
import { COLOR_MAP } from "../../lib/habits";

export default function HabitList() {
  const [habits, setHabits] = useState<HabitFromDB[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch("http://localhost:3000/api/habit");
      if (!res.ok) throw new Error("Failed to fetch habits");
      const data = await res.json();
      const parsed = z.array(habitSchema).safeParse(data);
      if (!parsed.success) {
        console.error("Invalid habit data", parsed.error);
        throw new Error("Invalid habit data format");
      }
      setHabits(parsed.data);
    };
    fetchHabits();
  }, []);
  function handleDeleteClick(id: string) {
    setSelectedHabitId(id);
    setIsModalOpen(true);
  }
  async function handleConfirmDelete() {
    if (!selectedHabitId) return;

    try {
      const res = await fetch(`/api/habit/${selectedHabitId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setHabits((prev) => prev.filter((habit) => habit.id !== selectedHabitId));
      setIsModalOpen(false);
      setSelectedHabitId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete habit. Try again.");
    }
  }

  function handleCancel() {
    setIsModalOpen(false);
    setSelectedHabitId(null);
  }

  return (
    <>
      {habits.length > 0 ? (
        <>
          {habits.map((habit) => (
            <button
              key={habit.id}
              type="button"
              className="shadow-md flex items-center gap-2 border-2 bg-white border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => handleDeleteClick(habit.id)}
            >
              <span
                className="inline-block w-4 h-4  rounded-full mr-2"
                style={{ backgroundColor: COLOR_MAP[habit.color] }}
              ></span>
              <span className="text-gray-700">{habit.name}</span>
              <TrashIcon className="h-4 w-4 text-gray-500" />
            </button>
          ))}
          <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancel}
          />
        </>
      ) : null}
    </>
  );
}
