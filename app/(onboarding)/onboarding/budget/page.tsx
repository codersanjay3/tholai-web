'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveOnboarding } from '@/lib/onboarding-store'

const BUDGETS = [
  { id: 'under30',  label: 'Under $30',   sub: 'Drugstore finds that work' },
  { id: '30to75',   label: '$30 – $75',   sub: 'The sweet spot for most' },
  { id: '75to150',  label: '$75 – $150',  sub: 'Premium, targeted formulas' },
  { id: '150plus',  label: '$150+',       sub: 'Luxury and clinical-grade' },
]

export default function BudgetPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('')

  const next = () => {
    saveOnboarding({ budget: selected })
    router.push('/onboarding/basics')
  }

  return (
    <div className="w-full max-w-[640px]">
      {/* Progress */}
      <div className="flex gap-1.5 mb-10">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all"
            style={{ background: i <= 2 ? '#1a3a5c' : '#c3dff2' }} />
        ))}
      </div>

      <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-3">Step 2 of 3</p>
      <h1 className="text-4xl font-black text-[#1a3a5c] leading-tight mb-2">
        Monthly skincare<br />budget?
      </h1>
      <p className="text-[#5a85aa] mb-10">We only recommend products in your range.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {BUDGETS.map(b => {
          const active = selected === b.id
          return (
            <button
              key={b.id}
              onClick={() => setSelected(b.id)}
              className="flex flex-col p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer"
              style={{
                background: active ? '#1a3a5c' : 'white',
                boxShadow: active
                  ? '0 8px 32px rgba(26,58,92,0.18)'
                  : '0 2px 12px rgba(30,100,180,0.06)',
                border: active ? 'none' : '1px solid #e8f0f8',
                transform: active ? 'translateY(-1px)' : undefined,
              }}
            >
              <span className="text-xl font-black mb-1"
                style={{ color: active ? 'white' : '#1a3a5c' }}>
                {b.label}
              </span>
              <span className="text-xs"
                style={{ color: active ? 'rgba(255,255,255,0.6)' : '#5a85aa' }}>
                {b.sub}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={next}
        disabled={!selected}
        className="w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-40"
        style={{ background: '#1a3a5c', color: 'white' }}
      >
        Continue →
      </button>
    </div>
  )
}
