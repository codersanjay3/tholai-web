'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs'

export function Nav() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#e8f0f8]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="tholai" width={32} height={32} className="text-[#1a3a5c]" />
          <span className="text-[15px] font-black tracking-tight text-[#1a3a5c] uppercase">Tholai</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm text-[#5a85aa] hover:text-[#1a3a5c] transition-colors">How it works</Link>
          <Link href="#features" className="text-sm text-[#5a85aa] hover:text-[#1a3a5c] transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm text-[#5a85aa] hover:text-[#1a3a5c] transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-sm text-[#5a85aa] font-medium hover:text-[#1a3a5c] transition-colors">Dashboard</Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <button className="text-sm text-[#5a85aa] font-medium hover:text-[#1a3a5c] transition-colors px-4 py-2 rounded-lg border border-[#c3dff2] hover:border-[#1a3a5c] transition-all">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="text-sm bg-[#1a3a5c] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#243f6a] transition-colors">
                  Get started →
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
