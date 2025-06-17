"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, HabitFormData } from "../../schema";
import { CATEGORY_OPTIONS, COLORS, COLOR_MAP, DAYS, Days } from "@/lib/habits";
import { createHabit } from "../../actions";

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
    const result = await createHabit(data);

    return result.status === "error"
      ? console.log(result.message)
      : console.log(result.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        placeholder="Habit name"
        className="border px-3 py-2 w-full"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
      {errors.color && <p className="text-red-500">{errors.color.message}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Habit
      </button>
    </form>
  );
}
