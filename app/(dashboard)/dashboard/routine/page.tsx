import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase.server'
import { Card } from '@/components/ui/Card'

const AM_STEPS = ['Gentle cleanser', 'Hydrating toner', 'Vitamin C serum', 'Moisturiser', 'SPF 50']
const PM_STEPS = ['Oil cleanser', 'Foaming cleanser', 'Treatment serum', 'Night cream']

export default async function RoutinePage() {
  const { userId } = await auth()

  let skinType = 'normal'
  if (userId) {
    const { data } = await supabaseAdmin()
      .from('skin_profiles')
      .select('skin_type')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (data) skinType = data.skin_type
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { label: 'AM Routine', emoji: '☀', steps: AM_STEPS },
        { label: 'PM Routine', emoji: '◑', steps: PM_STEPS },
      ].map(r => (
        <Card key={r.label}>
          <p className="text-xs text-[#7aabcf] font-semibold uppercase tracking-widest mb-3">{r.emoji} {r.label}</p>
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1a3a5c] mb-4 capitalize">
            {skinType} skin
          </h3>
          <div className="flex flex-col gap-3">
            {r.steps.map((s, i) => (
              <div key={s} className="flex items-center gap-4 p-3 bg-[#eef7fd] rounded-xl">
                <span className="w-6 h-6 rounded-full bg-[#1a3a5c] text-white text-xs flex items-center justify-center font-semibold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-[#1a3a5c] font-medium">{s}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
