"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import AddHabit from "../components/habits/AddHabit";

const Page = () => {
  const [isToggleHabit, setIsToggleHabit] = useState(false);
  const completeDate = [
    new Date(2023, 5, 2),
    new Date(2023, 5, 10),
    new Date(2023, 5, 6),
    new Date(2023, 5, 11),
    new Date(2023, 5, 7),
  ];

  return (
    <div className="bg-gray-50 h-screen">
      <section className="w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        {isToggleHabit && <AddHabit onClose={() => setIsToggleHabit(false)} />}
        <div className="text-black flex justify-between">
          <div className="mt-2">
            <h1 className="font-bold text-gray-900">Habit Tracker</h1>
            <p className="text-gray-500 mb-4">
              เปลี่ยนนิสัยเพื่อเป็นคนที่ดีกว่าเดิม
            </p>
            <div className="flex gap-2">
              <HabitTag color="green" text="อ่านหนังสือ 30 นาที" />
              <HabitTag color="purple" text="ออกกำลังกาย" />
              <HabitTag color="pink" text="ทานผลไม้" />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              onClick={() => {
                setIsToggleHabit(!isToggleHabit);
              }}
            >
              <PlusIcon className="h-4 w-5" />
              เพิ่มนิสัยใหม่
            </button>
          </div>
        </div>
      </section>

      <section className="w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="text-black flex justify-between">
          <div className="mt-2 flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <h1 className="font-bold text-gray-900">อ่านหนังสือ 30 นาที</h1>
          </div>
          <div>
            <p className="text-gray-500">7 วันที่สำเร็จในปีนี้</p>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-700 focus:outline-none  rounded-lg border-3 border-gray-200 border-dashed bg-gray-100 cursor-pointer"
            >
              ยังไม่ได้ทำ
            </button>
          </div>
        </div>

        <DayPicker
          defaultMonth={completeDate[0]}
          modifiers={{
            completeDate,
          }}
          modifiersStyles={{
            completeDate: {
              backgroundColor: "#10b981",
              color: "white",
              borderRadius: "0px",
              fontWeight: "bold",
            },
          }}
        />
      </section>
    </div>
  );
};

const HabitTag = ({ color, text }: { color: string; text: string }) => (
  <button
    type="button"
    className="shadow-md flex items-center gap-2 border-2 bg-white border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
  >
    <span className={`w-4 h-4 bg-${color}-500 rounded-full`}></span>
    <span className="text-gray-700">{text}</span>
    <TrashIcon className="h-4 w-4 text-gray-500" />
  </button>
);

export default Page;
