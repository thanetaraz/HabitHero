"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, HabitFormData } from "../../schema";
import { CATEGORY_OPTIONS, COLORS, COLOR_MAP, DAYS, Days } from "@/lib/habits";
import Button from "./ui/Button";

export default function AddHabit({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "OTHER",
      selectedDays: ["Mon"],
      color: "BLUE",
    },
  });

  const selectedDays = watch("selectedDays");
  const color = watch("color");
  const [isLoading, setIsLoading] = useState(false);

  const toggleDay = (day: Days) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      if (selectedDays.length === 1) {
        alert("You must select at least one day");
        return;
      }
      const updated = selectedDays.filter((d) => d !== day);
      setValue("selectedDays", updated as [Days, ...Days[]], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const updated = [...selectedDays, day];
      setValue("selectedDays", updated as [Days, ...Days[]], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: HabitFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Something went wrong, please try again.");
        return;
      }
      alert("Habit created successfully!");
      onClose();
    } catch (err) {
      console.error("fetch error:", err);
      alert("Network error, please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow  p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Create Habit
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name")}
              placeholder="Habit name"
              className="border px-3 py-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <textarea
              {...register("description")}
              placeholder="Description"
              className="border px-3 py-2 w-full"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <select
              {...register("category")}
              defaultValue=""
              className="border px-3 py-2 w-full"
            >
              <option value="" disabled>
                -- Select category --
              </option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}

            <div className="flex gap-2 flex-wrap">
              {DAYS.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1 rounded-full ${
                    selectedDays.includes(day)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {errors.selectedDays && (
              <p className="text-red-500">{errors.selectedDays.message}</p>
            )}

            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  style={{ backgroundColor: COLOR_MAP[c] }}
                  onClick={() => setValue("color", c)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    c === color ? "border-black" : "border-transparent"
                  }`}
                />
              ))}
            </div>
            {errors.color && (
              <p className="text-red-500">{errors.color.message}</p>
            )}
            <Button type="submit" isLoading={isLoading} className="w-full">
              Save Habit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
