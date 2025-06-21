"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddHabit from "@/components/habits/AddHabit";
import HabitCard from "@/components/habits/HabitCard";
import WeekNavigation from "@/components/habits/WeekNavigation";
import EmptyState from "@/components/habits/EmptyState";
import ErrorMessage from "@/components/habits/ui/ErrorMessage";
import LoadingSpinner from "@/components/habits/ui/LoadingSpinner";
import Navbar from "@/components/habits/Navbar";
import { useHabits } from "@/hooks/useHabits";
import { getWeekStart, getThaiDate } from "@/lib/date";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function HabitTracker() {
  const [isToggleHabit, setIsToggleHabit] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getWeekStart(getThaiDate())
  );

  const { habits, loading, error, toggleHabitCompletion, deleteHabit } =
    useHabits();

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  function Navbar() {
    const { data: session } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
      setIsSigningOut(true);
      await signOut({ callbackUrl: "/sign-in" });
    };

    if (!session?.user) return null;

    return (
      <div className="flex gap-4 items-center text-center">
        <div className="text-sm font-medium text-gray-700">
          {session.user.email}
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Navbar />
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-1">
                HabitHero
              </h1>
              <p className="text-gray-500 text-sm">
                Track your weekly progress
              </p>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        <WeekNavigation
          currentWeekStart={currentWeekStart}
          onWeekChange={setCurrentWeekStart}
        />

        <div className="mb-8">
          <button
            onClick={() => setIsToggleHabit(!isToggleHabit)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <Plus size={16} />
            Add Habit
          </button>
        </div>

        {isToggleHabit && <AddHabit onClose={() => setIsToggleHabit(false)} />}

        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {habits.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    weekDates={weekDates}
                    currentWeekStart={currentWeekStart}
                    onToggleCompletion={toggleHabitCompletion}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
