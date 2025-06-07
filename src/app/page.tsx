import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const Page = () => {
  return (
    <div className="text-red-400 bg-gray-50 h-screen">
      <div className="w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <section className="text-black flex justify-between">
          <div className="mt-4">
            <h1 className="font-bold text-gray-900">Habit Tracker</h1>
            <p className="text-gray-500 mb-4">
              เปลี่ยนนิสัยเพื่อเป็นคนที่ดีกว่าเดิม
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="shadow-md bg-blue-100 flex items-center gap-2 border-2 border-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span className="text-blue-700">อ่านหนังสือ 30 นาที</span>
                <TrashIcon className="h-4 w-4 text-gray-500" />
              </button>
              <button
                type="button"
                className="shadow-md flex items-center gap-2 border-2 bg-white border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
                <span className="text-gray-700">ออกกำลังกาย</span>
                <TrashIcon className="h-4 w-4 text-gray-500" />
              </button>
              <button
                type="button"
                className="shadow-md flex items-center gap-2 border-2 bg-white border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <span className="w-4 h-4 bg-pink-500 rounded-full"></span>
                <span className="text-gray-700">ทานผลไม้</span>
                <TrashIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
            >
              <PlusIcon className="h-4 w-5" />
              เพิ่มนิสัยใหม่
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
