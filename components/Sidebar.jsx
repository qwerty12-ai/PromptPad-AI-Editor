"use client";

import React from "react";
import PromptCard from "./PromptCard";
import { IoClose } from "react-icons/io5";

const Sidebar = ({
  prompts = [],
  onSelect,
  onDelete,
  loading,
  comparedIds = [],
  onToggleCompare,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} md:hidden`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed md:static z-50 bg-white w-64 h-full p-4 border-r shadow-lg transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-3 md:hidden">
          <h4 className="text-lg font-medium text-gray-700">Prompts</h4>
          <button onClick={onClose} className="text-gray-600 text-2xl">
            <IoClose />
          </button>
        </div>

        <div className="hidden md:block mb-3">
          <h4 className="text-lg font-medium text-gray-700">Prompts</h4>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-150px)]">
          {loading && <p className="text-gray-500">Loading prompts...</p>}
          {prompts.length === 0 && !loading && (
            <p className="text-sm text-gray-500">No prompts yet — create one to get started.</p>
          )}

          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              onClick={() => onSelect(prompt)}
              onDelete={onDelete}
              onToggleCompare={onToggleCompare}
              isCompared={Array.isArray(comparedIds) && comparedIds.includes(prompt._id)}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;