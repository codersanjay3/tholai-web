import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase.server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  const body = await req.json()
  const { goals, budget, ageRange, sensitivity } = body

  const { error } = await supabaseAdmin()
    .from('users')
    .upsert({
      id:                userId,
      email:             user?.emailAddresses[0]?.emailAddress ?? '',
      subscription_tier: 'free',
      goals:             goals,
      budget:            budget,
      age_range:         ageRange,
      sensitivity:       sensitivity,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
