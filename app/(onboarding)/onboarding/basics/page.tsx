'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const SENSITIVITY_LABELS = ['None', 'Mild', 'Moderate', 'High', 'Very high']

export default function BasicsPage() {
  const router = useRouter()
  const [age, setAge] = useState<number>(28)
  const [sensitivity, setSens] = useState(2)

  const next = () => {
    saveOnboarding({ age, sensitivity })
    router.push('/sign-up')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={3} total={3} />
      <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-2">Step 3 of 3</p>
      <h2 className="text-[32px] font-bold text-[#1a3a5c] leading-tight mb-1">
        A little about you
      </h2>
      <p className="text-sm text-[#5a85aa] mb-8">Helps us tailor recommendations to your skin at this stage of life.</p>

      {/* Age slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-wider">Age</p>
          <span className="text-2xl font-black text-[#1a3a5c]">{age}</span>
        </div>
        <input
          type="range"
          min={13}
          max={80}
          step={1}
          value={age}
          onChange={e => setAge(Number(e.target.value))}
          className="w-full accent-[#1a3a5c] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[#5a85aa] mt-1">
          <span>13</span>
          <span>80</span>
        </div>
      </div>

      {/* Sensitivity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-wider">Skin sensitivity</p>
          <span className="text-sm font-semibold text-[#1a3a5c]">{SENSITIVITY_LABELS[sensitivity - 1]}</span>
        </div>
        <input
          type="range" min={1} max={5} step={1} value={sensitivity}
          onChange={e => setSens(Number(e.target.value))}
          className="w-full accent-[#1a3a5c] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[#5a85aa] mt-1">
          <span>None</span><span>Very high</span>
        </div>
      </div>

      <Button size="lg" onClick={next}>
        Create my free account →
      </Button>
    </Card>
  )
}
