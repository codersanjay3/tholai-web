'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const AGE_RANGES = ['Teens', '20s', '30s', '40s', '50s+']
const SENSITIVITY_LABELS = ['None', 'Mild', 'Moderate', 'High', 'Very high']

export default function BasicsPage() {
  const router       = useRouter()
  const [age, setAge]           = useState('')
  const [sensitivity, setSens]  = useState(1)

  const next = () => {
    saveOnboarding({ ageRange: age, sensitivity })
    router.push('/sign-up')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={3} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 3 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        A little about you
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">Helps us tailor recommendations.</p>

      <div className="mb-8">
        <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-wider mb-3">Age range</p>
        <div className="flex gap-2 flex-wrap">
          {AGE_RANGES.map(a => (
            <button
              key={a}
              onClick={() => setAge(a)}
              className={`px-5 py-2 rounded-full border-[1.5px] text-sm font-medium transition-all
                ${age === a
                  ? 'border-[#1a3a5c] bg-[#eef7fd] text-[#1a3a5c]'
                  : 'border-[#c3dff2] text-[#7aabcf] hover:bg-[#eef7fd]'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-wider mb-3">
          Skin sensitivity — {SENSITIVITY_LABELS[sensitivity - 1]}
        </p>
        <input
          type="range" min={1} max={5} value={sensitivity}
          onChange={e => setSens(Number(e.target.value))}
          className="w-full accent-[#1a3a5c]"
        />
        <div className="flex justify-between text-xs text-[#7aabcf] mt-1">
          <span>None</span><span>Very high</span>
        </div>
      </div>

      <Button size="lg" onClick={next} disabled={!age}>
        Create my free account →
      </Button>
    </Card>
  )
}
