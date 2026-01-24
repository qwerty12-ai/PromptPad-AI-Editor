"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const puter = typeof window !== "undefined" ? window.puter : null;

const Editor = ({ prompt, onSave, fetchAnalytics, toggleCompare, isCompared }) => {
  const [localContent, setLocalContent] = useState(prompt?.content || "")
  const [localTitle, setLocalTitle] = useState(prompt?.title || "")
  const [loadingOutput, setLoadingOutput] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedModel, setSelectedModel] = useState(prompt?.model || "")

  useEffect(() => {
    setLocalContent(prompt?.content ?? "");
    setLocalTitle(prompt?.title ?? "");
    setSelectedModel(prompt?.model??"")
  }, [prompt])

  const handleSave = async () => {
    if (!prompt?._id) return;
    const updated = { ...prompt, title: localTitle, content: localContent, model: selectedModel }
    onSave(updated)
    try {
      setSaving(true);
      const res = await axios.put(`/api/prompts/${prompt._id}`, updated, { withCredentials: true });
      const savedPrompt = res?.data?.prompt ?? res?.data;
      if (savedPrompt) onSave(savedPrompt)
    } catch (error) {
      console.warn("Could not persist prompt via PUT", error?.response?.data || error.message)
    } finally {
      setSaving(false);
    }
  }

  const handleGenerateOutput = async () => {
    if (!prompt?._id) return;
    if(!window.puter || !window.puter.ai || !window.puter.ai.chat) {
      console.error("puter not ready")
      return;
    }
    try {
      setLoadingOutput(true)

      const resp = await window.puter.ai.chat([{role: "user", content: localContent}])
      const out = resp?.message?.content ?? resp?.output_text ?? resp?.output ??  ""

      onSave({...prompt, output: out, content: localContent})

      await axios.post("/api/prompts/output", {
        promptId: prompt._id, 
        output: out,
      },{withCredentials: true})

    } catch (error) {
      console.error("puter.ai.chat error", error?.response?.data || error.message)
    } finally {
      setLoadingOutput(false)
    }
  };

  const handleShowAnalytics = () => {
    if (!prompt?._id) return;
    fetchAnalytics(prompt._id)
  }

  return (
    <>
    
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold mb-3 text-3xl text-black">Edit Selected Prompt<p className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-2 mt-1 rounded-md text-sm sm:text-base max-w-2xl text-center font-light">
          ⚠️ <strong>Note:</strong> (ensure to "save" the title and content after u written it or edited it before u "generate output")
        </p></h3>
      <input
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        placeholder="Prompt title"
        className="border rounded px-3 py-2 text-gray-500"
      />

      <textarea
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        placeholder="Write your prompt here..."
        className="border p-3 rounded w-full h-40 resize-y text-gray-500"
      />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="llama-3.1-8b">Llama 3.1 (8B)</option>
          <option value="mistral-7b-instruct">Mistral 7B Instruct</option>
          <option value="phi-2">Phi-2 (tiny, faster)</option>
        </select> */}

        <button
          disabled={saving}
          onClick={handleSave}
          className={`px-4 py-2 rounded ${saving ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          disabled={loadingOutput}
          onClick={handleGenerateOutput}
          className={`px-4 py-2 rounded ${loadingOutput ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"} text-white`}
        >
          {loadingOutput ? "Generating..." : "Generate Output"}
        </button>
        <button
          onClick={handleShowAnalytics}
          className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Show Analytics
        </button>

        <button
          onClick={() => toggleCompare(prompt._id)}
          className={`px-4 py-2 rounded ${isCompared ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"} text-white`}
        >
          {isCompared ? "Remove from Compare" : "Compare"}
        </button>
      </div>

      <div>
        <h4 className="font-medium mb-1 text-lg">AI Output</h4>
        {prompt.output ? (
          <pre className="bg-gray-50 rounded p-3 whitespace-pre-wrap wrap-break-word">
            {prompt.output}
          </pre>
        ) : (
          <div className="text-sm text-gray-500">
            No output yet. Click "Generate Output" to get AI output.
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Editor