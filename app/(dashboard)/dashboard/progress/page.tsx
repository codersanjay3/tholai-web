'use client'

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const MOCK_DATA = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  scores: [62, 67, 71, 75],
}

export default function ProgressPage() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [{
          label: 'Glow Score',
          data: MOCK_DATA.scores,
          borderColor: '#1a3a5c',
          backgroundColor: 'rgba(26,58,92,0.06)',
          borderWidth: 2,
          pointBackgroundColor: '#1a3a5c',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, grid: { color: '#c3dff2' }, ticks: { color: '#7aabcf' } },
          x: { grid: { display: false }, ticks: { color: '#7aabcf' } },
        },
      },
    })
    return () => chart.destroy()
  }, [])

  return (
    <div className="grid gap-6">
      <Card>
        <p className="text-xs text-[#7aabcf] font-semibold uppercase tracking-widest mb-4">Glow Score history</p>
        <canvas ref={chartRef} />
      </Card>
      <Card>
        <p className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1a3a5c] mb-2">Weekly check-in</p>
        <p className="text-sm text-[#7aabcf] mb-4">Upload a photo each week to track your skin&apos;s progress.</p>
        <Button size="md" onClick={() => document.getElementById('checkin-upload')?.click()}>
          Upload check-in photo
        </Button>
        <input id="checkin-upload" type="file" accept="image/*" className="hidden" />
      </Card>
    </div>
  )
}
