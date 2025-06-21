"use client";

import { useState, useEffect } from "react";
import { HabitFromDB } from "../schema";
import { toast } from "sonner";

export const useHabits = ({userId} : {userId: string}) => {
  const [habits, setHabits] = useState<HabitFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(userId);

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/habit/${userId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const resData = await res.json();
      const data: HabitFromDB[] = resData.habits;      
      setHabits(data);
      
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const toggleHabitCompletion = async (habitId: string, dayDate: Date) => {
    const dayDateISO = dayDate.toISOString();
    try {
      const res = await fetch(`api/habit/${habitId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dayDateISO }),
      });

      const result = await res.json();
      fetchHabits();
      if (!res.ok) {
        toast(result.error || "Something went wrong, please try again.");
        return;
      }
    } catch (err) {
      console.error("fetch error:", err);
      toast("Network error, please check your connection and try again.");
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;

    try {
      const response = await fetch(`/api/habit/${habitId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete habit");
      }

      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
      setError("Failed to delete habit");
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return {
    habits,
    loading,
    error,
    toggleHabitCompletion,
    deleteHabit,
    fetchHabits,
  };
};
