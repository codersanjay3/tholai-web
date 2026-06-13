'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConcernBar } from '@/components/ui/ConcernBar'
import { loadAnalysis, type SkinAnalysis } from '@/lib/analysis-store'
import { loadOnboarding, clearOnboarding } from '@/lib/onboarding-store'

const SKIN_TYPE_LABELS: Record<string, string> = {
  oily: 'Oily', dry: 'Dry', combination: 'Combination', normal: 'Normal', sensitive: 'Sensitive',
}

export default function ResultsPage() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null)

  useEffect(() => {
    setAnalysis(loadAnalysis())
    // Flush onboarding data to Supabase now that user is authed
    const data = loadOnboarding()
    if (data && Object.keys(data).length > 0) {
      fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(() => clearOnboarding())
    }
  }, [])

  if (!analysis) return (
    <Card className="max-w-[600px] mx-auto text-center py-12">
      <p className="text-[#7aabcf]">No analysis found.{' '}
        <button onClick={() => router.push('/scan/photo')} className="text-[#1a3a5c] underline">Scan again</button>
      </p>
    </Card>
  )

  const concerns = Array.isArray(analysis.concerns) ? analysis.concerns : []

  return (
    <Card className="max-w-[600px] mx-auto">
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-3">Your skin profile</p>

      <div className="inline-block bg-[#eef7fd] px-4 py-2 rounded-full mb-4">
        <span className="text-[#1a3a5c] font-semibold">{SKIN_TYPE_LABELS[analysis.skin_type] ?? analysis.skin_type} skin</span>
      </div>

      <p className="text-sm text-[#1a3a5c] leading-relaxed mb-6">{analysis.analysis_summary}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#eef7fd] rounded-2xl p-4 text-center">
          <p className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1a3a5c]">{analysis.hydration_estimate}%</p>
          <p className="text-xs text-[#7aabcf] mt-1">Hydration</p>
        </div>
        <div className="bg-[#eef7fd] rounded-2xl p-4 text-center">
          <p className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1a3a5c]">{concerns.length}</p>
          <p className="text-xs text-[#7aabcf] mt-1">Concerns found</p>
        </div>
      </div>

      <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1a3a5c] mb-4">Skin concerns</h3>
      {[...concerns].sort((a, b) => b.severity - a.severity).map(c => (
        <ConcernBar key={c.id} label={c.label} severity={c.severity} />
      ))}

      <p className="text-xs text-[#7aabcf] text-center my-4">
        tholai is not a medical service. Consult a dermatologist for skin conditions.
      </p>

      <Button size="lg" onClick={() => router.push('/dashboard')}>
        Go to my dashboard →
      </Button>
    </Card>
  )
}
