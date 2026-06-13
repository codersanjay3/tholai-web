'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { saveAnalysis } from '@/lib/analysis-store'
import { loadOnboarding } from '@/lib/onboarding-store'

const STEPS = [
  'Preparing your image...',
  'Reading skin texture...',
  'Identifying concerns...',
  'Building your routine...',
  'Almost done...',
]

export default function AnalyzingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 2500)

    const run = async () => {
      const photo = sessionStorage.getItem('tholai_photo')
      if (!photo) { router.replace('/scan/photo'); return }

      const base64 = photo.split(',')[1]
      const onboardingData = loadOnboarding()

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: 'image/jpeg',
            onboardingData,
          }),
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          console.error('Analyze failed:', err)
          throw new Error('Analysis failed')
        }
        const { analysis } = await res.json()
        saveAnalysis(analysis)
        router.replace('/scan/results')
      } catch (e) {
        console.error(e)
        router.replace('/scan/photo')
      } finally {
        clearInterval(interval)
      }
    }

    run()
    return () => clearInterval(interval)
  }, [router])

  return (
    <Card className="max-w-[400px] mx-auto text-center py-16">
      {/* Spinner */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#c3dff2]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1a3a5c] animate-spin" />
      </div>
      <h2 className="text-[26px] font-bold text-[#1a3a5c] mb-3">
        Analysing your skin
      </h2>
      <p className="text-sm text-[#5a85aa] mb-6">{STEPS[step]}</p>
      {/* Progress dots */}
      <div className="flex justify-center gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{ background: i <= step ? '#1a3a5c' : '#c3dff2' }}
          />
        ))}
      </div>
    </Card>
  )
}
