import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateText, Output } from 'ai'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase.server'

const SkinConcernSchema = z.object({
  id: z.string(),
  label: z.string(),
  severity: z.number().min(0).max(10),
})

const AnalysisSchema = z.object({
  skin_type: z.enum(['oily', 'dry', 'combination', 'normal', 'sensitive']),
  skin_tone_fitzpatrick: z.number().min(1).max(6),
  hydration_estimate: z.number().min(0).max(100),
  concerns: z.array(SkinConcernSchema),
  analysis_summary: z.string(),
  am_routine: z.array(z.object({
    step: z.number(),
    action: z.string(),
    product_type: z.string(),
    why: z.string(),
  })),
  pm_routine: z.array(z.object({
    step: z.number(),
    action: z.string(),
    product_type: z.string(),
    why: z.string(),
  })),
  product_recommendations: z.array(z.object({
    name: z.string(),
    type: z.string(),
    price_range: z.string(),
    why: z.string(),
  })),
  glow_score: z.number().min(0).max(100),
})

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { imageBase64, mimeType, onboardingData } = await req.json()

  const goals = onboardingData?.goals?.join(', ') || 'general skin health'
  const budget = onboardingData?.budget || 'moderate'
  const age = onboardingData?.age || 'unknown'
  const sensitivity = onboardingData?.sensitivity ?? 2
  const sensitivityLabel = ['none', 'mild', 'moderate', 'high', 'very high'][Math.min(sensitivity - 1, 4)]

  try {
    const { output: analysis } = await generateText({
      model: 'anthropic/claude-haiku-4.5',
      output: Output.object({ schema: AnalysisSchema }),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: imageBase64,
              mediaType: (mimeType || 'image/jpeg') as `image/${string}`,
            },
            {
              type: 'text',
              text: `You are a dermatology AI assistant. Analyse this person's skin from the photo.

User profile:
- Age: ${age}
- Skin goals: ${goals}
- Monthly skincare budget: ${budget}
- Skin sensitivity: ${sensitivityLabel}

Provide a thorough, personalised skin analysis. Be specific to what you can observe in the photo.
Keep product recommendations within their stated budget.
Build a practical AM routine (3-5 steps) and PM routine (3-5 steps).
The analysis_summary should be 2-3 sentences — warm, direct, like a knowledgeable friend.`,
            },
          ],
        },
      ],
    })

    await supabaseAdmin().from('skin_profiles').upsert(
      {
        user_id:               userId,
        skin_type:             analysis.skin_type,
        concerns:              analysis.concerns,
        hydration_estimate:    analysis.hydration_estimate,
        analysis_summary:      analysis.analysis_summary,
        skin_tone_fitzpatrick: analysis.skin_tone_fitzpatrick,
        updated_at:            new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )

    return NextResponse.json({ analysis })
  } catch (err) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
