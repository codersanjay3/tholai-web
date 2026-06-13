'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const PILLS = ['AI skin scan', 'Personalised routines', 'Product matching', 'Glow Score tracking']

export default function LandingPage() {
  const router = useRouter()

  return (
    <Card className="flex flex-col items-center text-center py-16 px-8 gap-6">
      {/* Logo mark */}
      <div className="w-[72px] h-[72px] rounded-[20px] bg-[#d6eaf8] flex items-center justify-center">
        <span className="font-['Cormorant_Garamond'] text-[38px] font-bold text-[#1a3a5c] leading-none">t</span>
      </div>

      {/* Headline */}
      <h1 className="font-['Cormorant_Garamond'] text-[52px] font-bold text-[#1a3a5c] tracking-tight leading-[1.05]">
        Your skin,<br />understood.
      </h1>

      {/* Subhead */}
      <p className="text-[#7aabcf] text-[15px] leading-relaxed max-w-[380px]">
        AI-powered analysis of your unique skin — personalised routines and product
        recommendations that actually work.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {PILLS.map(p => (
          <span
            key={p}
            className="bg-[#eef7fd] text-[#1a3a5c] text-xs font-medium px-4 py-2 rounded-full"
          >
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 w-full max-w-[300px] mt-2">
        <Button size="lg" onClick={() => router.push('/onboarding/goals')}>
          Get started — it&apos;s free
        </Button>
        <p className="text-xs text-[#7aabcf]">Free scan · No credit card required</p>
      </div>
    </Card>
  )
}
