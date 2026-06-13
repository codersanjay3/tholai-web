import { auth, currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase.server'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const QUICK_ACTIONS = [
  { href: '/dashboard/routine',  label: 'View routine',   desc: 'AM + PM steps' },
  { href: '/dashboard/products', label: 'Products',       desc: 'Your recommendations' },
  { href: '/dashboard/progress', label: 'Track progress', desc: 'Glow Score history' },
  { href: '/scan/photo',         label: 'Re-scan',        desc: 'Update your profile' },
]

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  let latestScan = null
  if (userId) {
    const { data } = await supabaseAdmin()
      .from('skin_profiles')
      .select('skin_type, hydration_estimate, concerns, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    latestScan = data
  }

  const glowScore = latestScan
    ? Math.round(((latestScan.hydration_estimate ?? 50) + 50) / 2)
    : null

  const circumference = 2 * Math.PI * 42

  return (
    <div className="grid gap-6">
      <Card className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#c3dff2" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="#1a3a5c" strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - (glowScore ?? 0) / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1a3a5c]">
              {glowScore ?? '—'}
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#7aabcf] font-semibold uppercase tracking-widest mb-1">Glow Score</p>
          <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1a3a5c]">
            {user?.firstName ? `Hi, ${user.firstName}` : 'Welcome back'}
          </p>
          <p className="text-sm text-[#7aabcf] mt-1">
            {latestScan
              ? `${latestScan.skin_type} skin · Last scanned ${new Date(latestScan.created_at).toLocaleDateString()}`
              : 'No scan yet — start your skin analysis'}
          </p>
          {!latestScan && (
            <Link href="/scan/photo">
              <Button size="sm" className="mt-3">Scan now →</Button>
            </Link>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {QUICK_ACTIONS.map(a => (
          <Link key={a.href} href={a.href}>
            <Card className="hover:scale-[1.02] transition-transform cursor-pointer h-full">
              <p className="font-semibold text-[#1a3a5c] mb-1">{a.label}</p>
              <p className="text-xs text-[#7aabcf]">{a.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
