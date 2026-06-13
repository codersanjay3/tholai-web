import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase.server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { imageBase64, mimeType } = await req.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const res = await fetch(`${supabaseUrl}/functions/v1/analyze-face`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ imageBase64, mimeType, userId }),
  })

  if (!res.ok) return NextResponse.json({ error: 'Analysis failed' }, { status: 502 })

  const { analysis } = await res.json()

  await supabaseAdmin().from('skin_profiles').insert({
    user_id:               userId,
    skin_type:             analysis.skin_type,
    concerns:              analysis.concerns,
    hydration_estimate:    analysis.hydration_estimate,
    analysis_summary:      analysis.analysis_summary,
    skin_tone_fitzpatrick: analysis.skin_tone_fitzpatrick,
  })

  return NextResponse.json({ analysis })
}
