'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const BUDGETS = [
  { id: 'under30',   label: 'Under $30',   sub: 'Drugstore finds' },
  { id: '30to75',    label: '$30 – $75',   sub: 'Mid-range picks' },
  { id: '75to150',   label: '$75 – $150',  sub: 'Premium options' },
  { id: '150plus',   label: '$150+',       sub: 'Luxury skincare' },
]

export default function BudgetPage() {
  const router  = useRouter()
  const [selected, setSelected] = useState<string>('')

  const next = () => {
    saveOnboarding({ budget: selected })
    router.push('/onboarding/basics')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={2} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 2 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        Monthly skincare budget?
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">We&apos;ll only recommend products in your range.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {BUDGETS.map(b => (
          <button
            key={b.id}
            onClick={() => setSelected(b.id)}
            className={`flex flex-col p-5 rounded-2xl border-[1.5px] text-left transition-all
              ${selected === b.id
                ? 'border-[#1a3a5c] bg-[#eef7fd]'
                : 'border-[#c3dff2] bg-white hover:bg-[#eef7fd]'}`}
          >
            <span className="text-base font-semibold text-[#1a3a5c]">{b.label}</span>
            <span className="text-xs text-[#7aabcf] mt-1">{b.sub}</span>
          </button>
        ))}
      </div>

      <Button size="lg" onClick={next} disabled={!selected}>
        Continue →
      </Button>
    </Card>
  )
}
