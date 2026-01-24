"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CompareView = ({ selectedIds = [] }) => {
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!selectedIds || selectedIds.length < 2) {
            setPrompts([]);
            return;
        }

        const fetchcompare = async () => {
            try {
                setLoading(true)
                setError("")
                const response = await axios.get(`/api/compare?ids=${selectedIds.join(',')}`);
                setPrompts(Array.isArray(response.data) ? response.data : (response.data?.prompts ?? []))
            } catch (error) {
                console.error(error)
                setError("Failed to fetch prompts to compare")
            } finally {
                setLoading(false)
            }
        };

        fetchcompare()
    }, [selectedIds])

    if (!selectedIds || selectedIds.length < 2) return <p className='p-4 text-gray-500'>Select 2+ prompts to compare.</p>
    if (loading) return <p className='p-4 text-gray-500'>Loading compare view...</p>
    if (error) return <p className='p-4 text-red-500'>{error}</p>

    const orderedPrompts = selectedIds.map((id) => prompts.find((p) => String(p._id) === String(id))).filter(Boolean);

    return (<>
        <div className="mt-3 font-semibold text-3xl text-black">Compare Prompts</div>
        <div className='p-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orderedPrompts.map((prompt) => (
                    <div key={prompt._id} className='p-4 border rounded bg-white min-h-40'>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-black">{prompt.title || "Untitled"}</h3>
                            <div className="text-xs text-gray-500">{prompt.createdAt ? new Date(prompt.createdAt).toLocaleDateString() : null}</div>
                        </div>

                        <div className='mt-3'>
                            <h4 className='font-medium text-sm text-gray-700'>Prompt</h4>
                            <pre className='whitespace-pre-wrap mt-1 bg-gray-50 p-3 rounded text-sm wrap-break-word text-black'>{prompt.content}</pre>
                        </div>

                        <div className="mt-3">
                            <h4 className='font-medium text-sm text-gray-700'>Output</h4>
                            <pre className='whitespace-pre-wrap mt-1 bg-gray-50 p-3 rounded text-sm wrap-break-word text-black'>{prompt.output || "-No output-"}</pre>
                        </div>
                    </div>       
                ))}
            </div>
        </div>
    </>
    )
}

export default CompareView