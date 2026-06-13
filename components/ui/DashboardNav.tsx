'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/dashboard',          label: 'Home' },
  { href: '/dashboard/routine',  label: 'Routine' },
  { href: '/dashboard/products', label: 'Products' },
  { href: '/dashboard/progress', label: 'Progress' },
]

export function DashboardNav() {
  const pathname = usePathname()
  return (
    <div className="flex gap-1 bg-white rounded-2xl p-1 mb-6" style={{ boxShadow: '0 2px 16px rgba(30,100,180,0.06)' }}>
      {TABS.map(t => (
        <Link
          key={t.href}
          href={t.href}
          className={`flex-1 text-center py-2 px-3 rounded-xl text-sm font-medium transition-all
            ${pathname === t.href
              ? 'bg-[#1a3a5c] text-white'
              : 'text-[#7aabcf] hover:text-[#1a3a5c] hover:bg-[#eef7fd]'}`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  )
}
