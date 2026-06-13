'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const GOALS = [
  { id: 'acne',       label: 'Clear acne',         emoji: '✦' },
  { id: 'hydration',  label: 'Deep hydration',      emoji: '◈' },
  { id: 'antiaging',  label: 'Anti-aging',          emoji: '◇' },
  { id: 'brighten',   label: 'Brighter skin',       emoji: '○' },
  { id: 'sensitive',  label: 'Calm sensitivity',    emoji: '◉' },
  { id: 'pores',      label: 'Minimize pores',      emoji: '◌' },
]

export default function GoalsPage() {
  const router  = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const next = () => {
    saveOnboarding({ goals: selected })
    router.push('/onboarding/budget')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={1} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 1 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        What are your skin goals?
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">Select all that apply.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {GOALS.map(g => (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-[1.5px] text-left transition-all
              ${selected.includes(g.id)
                ? 'border-[#1a3a5c] bg-[#eef7fd] text-[#1a3a5c]'
                : 'border-[#c3dff2] bg-white text-[#1a3a5c] hover:bg-[#eef7fd]'}`}
          >
            <span className="text-lg">{g.emoji}</span>
            <span className="text-sm font-medium">{g.label}</span>
          </button>
        ))}
      </div>

      <Button size="lg" onClick={next} disabled={selected.length === 0}>
        Continue →
      </Button>
    </Card>
  )
}
