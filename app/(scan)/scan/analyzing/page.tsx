'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { saveAnalysis } from '@/lib/analysis-store'

const STEPS = ['Preparing your image...', 'Reading skin texture...', 'Identifying concerns...', 'Building your profile...']

export default function AnalyzingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 1800)

    const run = async () => {
      const photo = sessionStorage.getItem('tholai_photo')
      if (!photo) { router.replace('/scan/photo'); return }

      const base64 = photo.split(',')[1]
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mimeType: 'image/jpeg' }),
        })
        if (!res.ok) throw new Error('Analysis failed')
        const { analysis } = await res.json()
        saveAnalysis(analysis)
        router.replace('/scan/results')
      } catch {
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
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#c3dff2]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1a3a5c] animate-spin" />
      </div>
      <h2 className="font-['Cormorant_Garamond'] text-[28px] font-bold text-[#1a3a5c] mb-2">
        Analysing your skin
      </h2>
      <p className="text-sm text-[#7aabcf]">{STEPS[step]}</p>
    </Card>
  )
}
