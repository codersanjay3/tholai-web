'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveOnboarding } from '@/lib/onboarding-store'

const GOALS = [
  { id: 'acne',      label: 'Clear acne',       desc: 'Reduce breakouts and congestion' },
  { id: 'hydration', label: 'Deep hydration',   desc: 'Plump, dewy skin all day' },
  { id: 'antiaging', label: 'Anti-aging',        desc: 'Smooth fine lines and firm skin' },
  { id: 'brighten',  label: 'Brighter skin',    desc: 'Even tone and radiant glow' },
  { id: 'sensitive', label: 'Calm sensitivity', desc: 'Reduce redness and irritation' },
  { id: 'pores',     label: 'Minimize pores',   desc: 'Refined texture and clarity' },
]

export default function GoalsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const next = () => {
    saveOnboarding({ goals: selected })
    router.push('/onboarding/budget')
  }

  return (
    <div className="w-full max-w-[640px]">
      {/* Progress */}
      <div className="flex gap-1.5 mb-10">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all"
            style={{ background: i <= 1 ? '#1a3a5c' : '#c3dff2' }} />
        ))}
      </div>

      <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-3">Step 1 of 3</p>
      <h1 className="text-4xl font-black text-[#1a3a5c] leading-tight mb-2">
        What are your<br />skin goals?
      </h1>
      <p className="text-[#5a85aa] mb-10">Select everything that matters to you.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {GOALS.map(g => {
          const active = selected.includes(g.id)
          return (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer"
              style={{
                background: active ? '#1a3a5c' : 'white',
                boxShadow: active
                  ? '0 8px 32px rgba(26,58,92,0.18)'
                  : '0 2px 12px rgba(30,100,180,0.06)',
                border: active ? 'none' : '1px solid #e8f0f8',
                transform: active ? 'translateY(-1px)' : undefined,
              }}
            >
              <div
                className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all"
                style={{
                  background: active ? 'rgba(255,255,255,0.2)' : '#eef7fd',
                  border: active ? 'none' : '1.5px solid #c3dff2',
                }}
              >
                {active && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: active ? 'white' : '#1a3a5c' }}>
                  {g.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: active ? 'rgba(255,255,255,0.6)' : '#5a85aa' }}>
                  {g.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={next}
        disabled={selected.length === 0}
        className="w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-40"
        style={{ background: '#1a3a5c', color: 'white' }}
      >
        Continue →
      </button>
      {selected.length > 0 && (
        <p className="text-center text-xs text-[#5a85aa] mt-3">
          {selected.length} goal{selected.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}
