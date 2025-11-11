"use client";

import React from 'react'

const PromptCard = ({prompt, onClick, onDelete, onToggleCompare, isCompared = false}) => {
  return (
    <>
    
    <div
      className={'p-3 bg-white rounded shadow flex flex-col gap-2 transition hover:bg-blue-50'}
      title={prompt.title || "Untitled Project"}
    >
      <div onClick={onClick} className='flex-1 cursor-pointer'>
        <h3 className="font-semibold text-gray-800">{prompt.title || "Untitled Prompt"}</h3>
        {prompt.createdAt && (
          <p className="text-xs text-gray-500">Created: {new Date(prompt.createdAt).toLocaleDateString()}</p>
        )}
        {prompt.output && (
          <p className="text-xs text-gray-500 truncate">Last Output: {String(prompt.output).slice(0,50)}...</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onToggleCompare) onToggleCompare(prompt._id)
            }}
            className={`px-2 py-1 text-sm rounded border ${
              isCompared ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-200"
            }`}
            aria-pressed={isCompared}
            title={isCompared ? "Remove from compare" : "Add to compare"}
          >
            {isCompared ? "Comparing" : "Compare"}
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(prompt._id)
            }}
            className='text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm'
          >
            Delete Prompt
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default PromptCard