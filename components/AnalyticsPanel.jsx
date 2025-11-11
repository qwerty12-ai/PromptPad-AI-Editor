"use client"

import axios from 'axios'
import React, { useState, useEffect } from 'react'

const AnalyticsPanel = ({ stats: initialStats }) => {
    const [stats, setStats] = useState(initialStats || { totalPrompts: 0, latency: 0 })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
      if (initialStats) return;
      const fetchStats = async () => {
        try {
          setLoading(true)
          setError("")
          const response = await axios.get('/api/analytics')
          setStats(response.data || { totalPrompts: 0, latency: 0 })
        } catch (error) {
          console.error(error)
          setError("Failed to fetch analytics")
        } finally {
          setLoading(false)
        }
      }

      fetchStats()
    }, [initialStats])

    if (loading) return <p className='p-4 text-gray-500'>Loading...</p>
    if (error) return <p className='p-4 text-red-500'>{error}</p>

    return (
      <div className='p-4 border rounded bg-gray-50'>
        <h2 className='font-semibold mb-2'>Analytics</h2>
        <p>Total Prompts: {stats.totalPrompts ?? 0}</p>
        <p>Average Latency (ms) : {typeof stats.latency === "number" ? stats.latency.toFixed(2) : stats.latency ?? "-"}</p>
      </div>
    )
}

export default AnalyticsPanel