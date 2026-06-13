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
  const [ageIndex, setAgeIndex]  = useState<number>(2)
  const [sensitivity, setSens]  = useState(1)

  const next = () => {
    saveOnboarding({ ageRange: AGE_RANGES[ageIndex], sensitivity })
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
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#7aabcf]">Teens</span>
          <span className="text-sm font-semibold text-[#1a3a5c]">{AGE_RANGES[ageIndex]}</span>
          <span className="text-xs text-[#7aabcf]">50s+</span>
        </div>
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={ageIndex}
          onChange={e => setAgeIndex(Number(e.target.value))}
          className="w-full accent-[#1a3a5c]"
        />
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

      <Button size="lg" onClick={next}>
        Create my free account →
      </Button>
    </Card>
  )
}
