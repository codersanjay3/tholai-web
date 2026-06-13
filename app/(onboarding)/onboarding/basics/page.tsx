'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveOnboarding } from '@/lib/onboarding-store'

const SENSITIVITY_LABELS = ['None', 'Mild', 'Moderate', 'High', 'Very high']
const SENSITIVITY_DESC = [
  'No reactions to products',
  'Occasional tightness or redness',
  'Regularly reacts to fragrances',
  'Most products cause irritation',
  'Extremely reactive skin',
]

export default function BasicsPage() {
  const router = useRouter()
  const [age, setAge] = useState<number>(28)
  const [sensitivity, setSens] = useState(2)

  const next = () => {
    saveOnboarding({ age, sensitivity })
    router.push('/sign-up')
  }

  return (
    <div className="w-full max-w-[640px]">
      {/* Progress */}
      <div className="flex gap-1.5 mb-10">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full" style={{ background: '#1a3a5c' }} />
        ))}
      </div>

      <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-3">Step 3 of 3</p>
      <h1 className="text-4xl font-black text-[#1a3a5c] leading-tight mb-2">
        A little about<br />you
      </h1>
      <p className="text-[#5a85aa] mb-10">Tailors recommendations to your skin at this stage of life.</p>

      {/* Age */}
      <div
        className="bg-white rounded-2xl p-6 mb-4"
        style={{ boxShadow: '0 2px 12px rgba(30,100,180,0.06)', border: '1px solid #e8f0f8' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-wider">Age</p>
            <p className="text-xs text-[#5a85aa] mt-0.5">Slide to your age</p>
          </div>
          <span className="text-4xl font-black text-[#1a3a5c] tabular-nums">{age}</span>
        </div>
        <input
          type="range" min={13} max={80} step={1} value={age}
          onChange={e => setAge(Number(e.target.value))}
          className="w-full accent-[#1a3a5c] cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-xs text-[#5a85aa] mt-2">
          <span>13</span><span>80</span>
        </div>
      </div>

      {/* Sensitivity */}
      <div
        className="bg-white rounded-2xl p-6 mb-10"
        style={{ boxShadow: '0 2px 12px rgba(30,100,180,0.06)', border: '1px solid #e8f0f8' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-wider">Skin sensitivity</p>
            <p className="text-xs text-[#5a85aa] mt-0.5">{SENSITIVITY_DESC[sensitivity - 1]}</p>
          </div>
          <span className="text-sm font-bold text-[#1a3a5c]">{SENSITIVITY_LABELS[sensitivity - 1]}</span>
        </div>
        <div className="mt-4">
          <input
            type="range" min={1} max={5} step={1} value={sensitivity}
            onChange={e => setSens(Number(e.target.value))}
            className="w-full accent-[#1a3a5c] cursor-pointer h-1.5"
          />
          <div className="flex justify-between text-xs text-[#5a85aa] mt-2">
            <span>None</span><span>Very high</span>
          </div>
        </div>
      </div>

      <button
        onClick={next}
        className="w-full py-4 rounded-2xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90"
        style={{ background: '#1a3a5c', color: 'white' }}
      >
        Create my free account →
      </button>
      <p className="text-center text-xs text-[#5a85aa] mt-3">Free forever · No credit card</p>
    </div>
  )
}
