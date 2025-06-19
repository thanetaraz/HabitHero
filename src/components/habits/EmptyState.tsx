"use client";

import { Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Plus size={20} className="text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm mb-1">No habits yet</p>
      <p className="text-gray-400 text-xs">
        Create your first habit to get started
      </p>
    </div>
  );
}
