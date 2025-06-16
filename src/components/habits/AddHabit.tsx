"use client";

import React, { useState, useEffect } from "react";
import {
  Day,
  CATEGORY_OPTIONS,
  COLORS,
  HabitFormData,
} from "../../app/lib/habits";

export default function AddHabit({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: "",
    description: "",
    category: null,
    selectedDays: [],
    color: "#3B82F6",
  });

  const toggleDay = (day: Day) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedDays.includes(day);
      return {
        ...prev,
        selectedDays: alreadySelected
          ? prev.selectedDays.filter((d) => d !== day)
          : [...prev.selectedDays, day],
      };
    });
  };

  const setAllDays = () => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    }));
  };

  const setWeekdays = () => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    }));
  };

  const setWeekends = () => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: ["Sat", "Sun"],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final form data:", formData);
  };

  useEffect(() => {
    console.log("formData updated: ", formData);
  }, [formData]);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Habit</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Habit Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Drink 8 glasses of water"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
            required
          />

          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Why is this habit important to you?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={200}
            rows={3}
          />

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={setAllDays}
              className="bg-blue-200 text-blue-600 rounded-full text-xs font-medium px-3 py-1"
            >
              All Days
            </button>
            <button
              type="button"
              onClick={setWeekdays}
              className="bg-green-200 text-green-600 rounded-full text-xs font-medium px-3 py-1"
            >
              Weekdays
            </button>
            <button
              type="button"
              onClick={setWeekends}
              className="bg-purple-200 text-purple-600 rounded-full text-xs font-medium px-3 py-1"
            >
              Weekends
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
              const isSelected = formData.selectedDays.includes(day as Day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day as Day)}
                  className={`rounded-xl py-2 font-medium transition duration-300 ${
                    isSelected
                      ? "bg-blue-700 text-white"
                      : "bg-blue-200 text-blue-800 hover:bg-blue-400"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category || ""}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              -- Select a category --
            </option>
            {CATEGORY_OPTIONS.map((category, index) => (
              <option key={index} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium text-gray-700">
            Color Theme
          </label>
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, color }))}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color
                    ? "border-gray-800"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Habit
          </button>
        </form>
      </div>
    </div>
  );
}
