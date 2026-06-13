import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase.server'
import { Card } from '@/components/ui/Card'

const PLACEHOLDER_PRODUCTS = [
  { name: 'CeraVe Hydrating Cleanser',           category: 'Cleanser',    price: '$16', match: 98 },
  { name: "Paula's Choice BHA Exfoliant",        category: 'Treatment',   price: '$34', match: 95 },
  { name: 'La Roche-Posay Effaclar Moisturiser', category: 'Moisturiser', price: '$28', match: 92 },
  { name: 'EltaMD UV Clear SPF 46',              category: 'Sunscreen',   price: '$41', match: 90 },
]

export default async function ProductsPage() {
  const { userId } = await auth()

  let concerns: string[] = []
  if (userId) {
    const { data } = await supabaseAdmin()
      .from('skin_profiles')
      .select('concerns')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (data?.concerns) {
      concerns = (data.concerns as Array<{ label: string }>).map(c => c.label)
    }
  }

  return (
    <div>
      {concerns.length > 0 && (
        <p className="text-sm text-[#7aabcf] mb-4">
          Matched to your concerns: {concerns.slice(0, 3).join(', ')}
        </p>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {PLACEHOLDER_PRODUCTS.map(p => (
          <Card key={p.name} className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#7aabcf] font-semibold uppercase tracking-wider">{p.category}</p>
                <p className="font-semibold text-[#1a3a5c] mt-1">{p.name}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-sm font-semibold text-[#1a3a5c]">{p.price}</p>
                <p className="text-xs text-[#7aabcf]">{p.match}% match</p>
              </div>
            </div>
            <div className="h-1 bg-[#eef7fd] rounded-full mt-2">
              <div className="h-1 bg-[#1a3a5c] rounded-full" style={{ width: `${p.match}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
