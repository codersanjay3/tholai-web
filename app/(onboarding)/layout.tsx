import Image from 'next/image'
import Link from 'next/link'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#d6eaf8] flex flex-col">
      {/* Minimal nav */}
      <header className="px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="tholai" width={28} height={28} />
          <span className="text-sm font-black text-[#1a3a5c] uppercase tracking-tight">Tholai</span>
        </Link>
        <span className="text-xs text-[#5a85aa]">Takes 2 minutes</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  )
}
