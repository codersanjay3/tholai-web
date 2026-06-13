'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs'

export function Nav() {
  const { isSignedIn } = useAuth()

  return (
    <nav
      className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 mb-6"
      style={{ boxShadow: '0 2px 16px rgba(30,100,180,0.06)' }}
    >
      <Link href="/" className="font-['Cormorant_Garamond'] text-[22px] font-bold text-[#1a3a5c] tracking-tight">
        tholai
      </Link>
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <SignInButton>
              <button className="text-sm text-[#7aabcf] font-medium hover:text-[#1a3a5c] transition-colors">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm bg-[#1a3a5c] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
                Get started
              </button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  )
}
