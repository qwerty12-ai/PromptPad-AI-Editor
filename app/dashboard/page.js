"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import CompareView from "@/components/CompareView";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { useSession } from "next-auth/react";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState("");
  const [newPromptContent, setNewPromptContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("open-llama-3b");

  useEffect(() => {
    if (!session) return;
    const fetchPrompts = async () => {
      try {
        setLoadingPrompts(true);
        const res = await axios.get("/api/prompts");
        setPrompts(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPrompts(false);
      }
    };
    fetchPrompts();
  }, [session]);

  const handleSelectPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setAnalytics(false);
    setSidebarOpen(false);
  };

  const handleSavePrompt = (updatedPrompt) => {
    setPrompts((prev) =>
      prev.map((p) => (String(p._id) === String(updatedPrompt._id) ? updatedPrompt : p))
    );
    setSelectedPrompt(updatedPrompt);
  };

  const handleCreatePrompt = async () => {
    if (!newPromptContent || !session) return;
    const titleToSave =
      newPromptTitle?.trim() !== "" ? newPromptTitle : "New Prompt";
    try {
      const res = await axios.post(
        "/api/prompts",
        {
          userId: session.user.id,
          title: titleToSave,
          content: newPromptContent,
          model: selectedModel, // persist model choice
        },
        { withCredentials: true }
      );
      const created = res.data; // expecting API returns created prompt object
      if (!created) {
        console.warn("Create prompt: unexpected response", res.data);
        return;
      }
      setPrompts((prev) => [created, ...prev]);
      setSelectedPrompt(created);
      // DO NOT auto-add to compare unless you want that behavior.
      setNewPromptTitle("");
      setNewPromptContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePrompt = async (id) => {
    try {
      await axios.delete(`/api/prompts/${id}`, { withCredentials: true });
      setPrompts((prev) => prev.filter((p) => String(p._id) !== String(id)));
      if (selectedPrompt?._id === id) setSelectedPrompt(null);
      setSelectedCompareIds((prev) => prev.filter((pid) => String(pid) !== String(id)));
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const fetchAnalytics = async (promptId) => {
    try {
      setLoadingAnalytics(true);
      const res = await axios.get(`/api/analytics?promptId=${promptId}`, {
        withCredentials: true,
      });
      setAnalytics(res.data || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  if (status === "loading")
    return <p className="text-gray-700">Loading session...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Bar for mobile */}
      <div className="flex items-center justify-between p-4 bg-white border-b md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 text-2xl"
        >
          <FiMenu />
        </button>
        <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          prompts={prompts}
          onSelect={handleSelectPrompt}
          onDelete={handleDeletePrompt}
          loading={loadingPrompts}
          comparedIds={selectedCompareIds}
          onToggleCompare={(id) =>
            setSelectedCompareIds((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            )
          }
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 p-4 md:p-6 overflow-auto md:ml-64">
          {prompts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Welcome! Start by creating your prompt below.
            </div>
          ) : selectedPrompt && selectedCompareIds.length < 2 ? (
            <Editor
              prompt={selectedPrompt}
              onSave={handleSavePrompt}
              fetchAnalytics={fetchAnalytics}
              toggleCompare={(id) =>
                setSelectedCompareIds((prev) =>
                  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                )
              }
              isCompared={selectedCompareIds.includes(selectedPrompt?._id)}
              analytics={analytics}
            />
          ) : (
            <p className="text-gray-500">
              {selectedCompareIds.length >= 2 ? "Comparing prompts - editor hidden." : "Select a prompt or create a new one to start editing"}
            </p>
          )}

          <div className="mt-8 bg-white p-4 rounded shadow-sm">
            <h4 className="font-semibold mb-4 text-xl sm:text-2xl text-black">Create a new prompt</h4>
            {/* <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-3">
              <label className="text-gray-600 font-medium mr-2">Choose Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                <option value="open-llama-3b">Open LLaMA 3B</option>
                <option value="open-mistral-7b">Open Mistral 7B</option>
                <option value="open-phi-2">Phi-2 (tiny & fast)</option>
              </select>
            </div> */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded w-full sm:w-1/3 text-gray-500"
                value={newPromptTitle}
                onChange={(e) => setNewPromptTitle(e.target.value)}
              />
            </div>

            <textarea
              placeholder="Content"
              className="border p-2 rounded w-full my-3 min-h-25 text-gray-500"
              value={newPromptContent}
              onChange={(e) => setNewPromptContent(e.target.value)}
            />
            <button
              onClick={handleCreatePrompt}
              className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Create Prompt
            </button>
          </div>

          {selectedCompareIds.length >= 2 && (
            <div className="mt-6">
              <CompareView selectedIds={selectedCompareIds} />
            </div>
          )}
          {analytics && (
            <div className="mt-6">
              <AnalyticsPanel stats={analytics} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;