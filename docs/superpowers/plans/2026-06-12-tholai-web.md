# tholai Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full tholai skincare web app — questionnaire → Clerk auth → face scan → AI analysis → personalised dashboard.

**Architecture:** Next.js 16 App Router, Clerk auth (app_3F3htG8zFfK06fTCEKKNuV7XVY2), Supabase database, deployed to Vercel. Route groups separate marketing/onboarding/scan/dashboard concerns. `proxy.ts` protects authenticated routes.

**Tech Stack:** Next.js 16.2.9, TypeScript, Tailwind CSS, Clerk (`@clerk/nextjs`), Supabase JS client, Chart.js, Google Fonts (Cormorant Garamond + DM Sans)

---

## Task 1: Dependencies, Env, Design Tokens

**Files:**
- Modify: `package.json` (add deps)
- Create: `app/globals.css` (design tokens + font imports)
- Create: `.env.local` (env var stubs)
- Create: `lib/supabase.ts` (Supabase client)
- Create: `lib/tokens.ts` (colour/spacing constants for use in JS)

- [ ] **Step 1: Install dependencies**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
npm install @clerk/nextjs @supabase/supabase-js chart.js react-chartjs-2
```

Expected: no errors, `node_modules/@clerk/nextjs` exists.

- [ ] **Step 2: Create `.env.local` with required stubs**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_ME
CLERK_SECRET_KEY=sk_test_REPLACE_ME
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/scan/photo
NEXT_PUBLIC_SUPABASE_URL=REPLACE_ME
NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_ME
SUPABASE_SERVICE_ROLE_KEY=REPLACE_ME
EOF
```

- [ ] **Step 3: Write `app/globals.css`**

Replace the existing `app/globals.css` entirely:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
@import "tailwindcss";

:root {
  --bg:      #d6eaf8;
  --surface: #ffffff;
  --text:    #1a3a5c;
  --muted:   #7aabcf;
  --border:  #c3dff2;
  --hover:   #eef7fd;
  --shadow:  0 4px 24px rgba(30, 100, 180, 0.07);
}

* { box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .display {
  font-family: 'Cormorant Garamond', serif;
}
```

- [ ] **Step 4: Create `lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, anon)

// Server-side only (API routes)
export function supabaseAdmin() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
```

- [ ] **Step 5: Create `lib/tokens.ts`**

```typescript
export const colors = {
  bg:      '#d6eaf8',
  surface: '#ffffff',
  text:    '#1a3a5c',
  muted:   '#7aabcf',
  border:  '#c3dff2',
  hover:   '#eef7fd',
} as const

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '20px',
} as const
```

- [ ] **Step 6: Init Clerk — run Clerk CLI**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
command -v clerk && clerk --version || npm install -g clerk
clerk auth login
clerk init --app app_3F3htG8zFfK06fTCEKKNuV7XVY2
```

Expected: Clerk detects Next.js, installs provider, creates `proxy.ts` (or `middleware.ts`).

- [ ] **Step 7: Verify proxy.ts matcher includes Clerk path**

Check `proxy.ts` (or `middleware.ts`) exists and has:
```typescript
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
}
```

Add `'/__clerk/:path*'` if missing.

- [ ] **Step 8: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: scaffold Next.js 16 with Clerk, Supabase, design tokens"
```

---

## Task 2: Layout Components

**Files:**
- Create: `components/ui/PageWrapper.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Nav.tsx`
- Create: `components/ui/ProgressBar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/ui/PageWrapper.tsx`**

```tsx
export function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`min-h-screen bg-[#d6eaf8] ${className}`}>
      <div className="max-w-[1100px] mx-auto px-4 py-6">
        {children}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create `components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = "font-['DM_Sans'] font-semibold rounded-xl transition-opacity disabled:opacity-40 cursor-pointer"
  const variants = {
    primary: 'bg-[#1a3a5c] text-white hover:opacity-90',
    outline: 'bg-transparent text-[#1a3a5c] border-[1.5px] border-[#c3dff2] hover:bg-[#eef7fd]',
  }
  const sizes = {
    sm:  'px-4 py-2 text-sm',
    md:  'px-6 py-3 text-sm',
    lg:  'px-8 py-4 text-base w-full',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Create `components/ui/Card.tsx`**

```tsx
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-[20px] p-6 ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(30,100,180,0.07)' }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Create `components/ui/Nav.tsx`**

```tsx
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Nav() {
  return (
    <nav
      className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 mb-6"
      style={{ boxShadow: '0 2px 16px rgba(30,100,180,0.06)' }}
    >
      <Link href="/" className="font-['Cormorant_Garamond'] text-[22px] font-bold text-[#1a3a5c] tracking-tight">
        tholai
      </Link>
      <div className="flex items-center gap-3">
        <SignedOut>
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
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
```

- [ ] **Step 5: Create `components/ui/ProgressBar.tsx` (for onboarding steps)**

```tsx
export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="w-full h-1 bg-[#c3dff2] rounded-full mb-8">
      <div
        className="h-1 bg-[#1a3a5c] rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
```

- [ ] **Step 6: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'tholai — Your skin, understood.',
  description: 'AI-powered skincare analysis and personalised routines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: add layout components — Nav, Card, Button, PageWrapper, ProgressBar"
```

---

## Task 3: Landing Page

**Files:**
- Create: `app/(marketing)/page.tsx`
- Create: `app/(marketing)/layout.tsx`

- [ ] **Step 1: Create `app/(marketing)/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      {children}
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create `app/(marketing)/page.tsx`**

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const PILLS = ['AI skin scan', 'Personalised routines', 'Product matching', 'Glow Score tracking']

export default function LandingPage() {
  const router = useRouter()

  return (
    <Card className="flex flex-col items-center text-center py-16 px-8 gap-6">
      {/* Logo mark */}
      <div className="w-[72px] h-[72px] rounded-[20px] bg-[#d6eaf8] flex items-center justify-center">
        <span className="font-['Cormorant_Garamond'] text-[38px] font-bold text-[#1a3a5c] leading-none">t</span>
      </div>

      {/* Headline */}
      <h1 className="font-['Cormorant_Garamond'] text-[52px] font-bold text-[#1a3a5c] tracking-tight leading-[1.05]">
        Your skin,<br />understood.
      </h1>

      {/* Subhead */}
      <p className="text-[#7aabcf] text-[15px] leading-relaxed max-w-[380px]">
        AI-powered analysis of your unique skin — personalised routines and product
        recommendations that actually work.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {PILLS.map(p => (
          <span
            key={p}
            className="bg-[#eef7fd] text-[#1a3a5c] text-xs font-medium px-4 py-2 rounded-full"
          >
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 w-full max-w-[300px] mt-2">
        <Button size="lg" onClick={() => router.push('/onboarding/goals')}>
          Get started — it&apos;s free
        </Button>
        <p className="text-xs text-[#7aabcf]">Free scan · No credit card required</p>
      </div>
    </Card>
  )
}
```

- [ ] **Step 3: Remove default Next.js `app/page.tsx` if it exists at root**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
# The (marketing)/page.tsx handles / — remove any conflicting root page
ls app/page.tsx && rm app/page.tsx || true
```

- [ ] **Step 4: Verify dev server renders landing page**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
npm run dev &
sleep 4 && curl -s http://localhost:3000 | grep -c "tholai" && kill %1
```

Expected: output is `1` or greater (tholai appears in rendered HTML).

- [ ] **Step 5: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: landing page with centered hero, feature pills, CTA"
```

---

## Task 4: Onboarding Questionnaire (Goals → Budget → Basics)

**Files:**
- Create: `app/(onboarding)/layout.tsx`
- Create: `app/(onboarding)/onboarding/goals/page.tsx`
- Create: `app/(onboarding)/onboarding/budget/page.tsx`
- Create: `app/(onboarding)/onboarding/basics/page.tsx`
- Create: `lib/onboarding-store.ts`

- [ ] **Step 1: Create `lib/onboarding-store.ts`**

```typescript
export interface OnboardingData {
  goals:       string[]
  budget:      string
  ageRange:    string
  sensitivity: number
}

const KEY = 'tholai_onboarding'

export function saveOnboarding(data: Partial<OnboardingData>) {
  const existing = loadOnboarding()
  localStorage.setItem(KEY, JSON.stringify({ ...existing, ...data }))
}

export function loadOnboarding(): Partial<OnboardingData> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function clearOnboarding() {
  localStorage.removeItem(KEY)
}
```

- [ ] **Step 2: Create `app/(onboarding)/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      {children}
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Create `app/(onboarding)/onboarding/goals/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const GOALS = [
  { id: 'acne',       label: 'Clear acne',         emoji: '✦' },
  { id: 'hydration',  label: 'Deep hydration',      emoji: '◈' },
  { id: 'antiaging',  label: 'Anti-aging',          emoji: '◇' },
  { id: 'brighten',   label: 'Brighter skin',       emoji: '○' },
  { id: 'sensitive',  label: 'Calm sensitivity',    emoji: '◉' },
  { id: 'pores',      label: 'Minimize pores',      emoji: '◌' },
]

export default function GoalsPage() {
  const router  = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const next = () => {
    saveOnboarding({ goals: selected })
    router.push('/onboarding/budget')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={1} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 1 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        What are your skin goals?
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">Select all that apply.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {GOALS.map(g => (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-[1.5px] text-left transition-all
              ${selected.includes(g.id)
                ? 'border-[#1a3a5c] bg-[#eef7fd] text-[#1a3a5c]'
                : 'border-[#c3dff2] bg-white text-[#1a3a5c] hover:bg-[#eef7fd]'}`}
          >
            <span className="text-lg">{g.emoji}</span>
            <span className="text-sm font-medium">{g.label}</span>
          </button>
        ))}
      </div>

      <Button size="lg" onClick={next} disabled={selected.length === 0}>
        Continue →
      </Button>
    </Card>
  )
}
```

- [ ] **Step 4: Create `app/(onboarding)/onboarding/budget/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const BUDGETS = [
  { id: 'under30',   label: 'Under $30',   sub: 'Drugstore finds' },
  { id: '30to75',    label: '$30 – $75',   sub: 'Mid-range picks' },
  { id: '75to150',   label: '$75 – $150',  sub: 'Premium options' },
  { id: '150plus',   label: '$150+',       sub: 'Luxury skincare' },
]

export default function BudgetPage() {
  const router  = useRouter()
  const [selected, setSelected] = useState<string>('')

  const next = () => {
    saveOnboarding({ budget: selected })
    router.push('/onboarding/basics')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={2} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 2 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        Monthly skincare budget?
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">We&apos;ll only recommend products in your range.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {BUDGETS.map(b => (
          <button
            key={b.id}
            onClick={() => setSelected(b.id)}
            className={`flex flex-col p-5 rounded-2xl border-[1.5px] text-left transition-all
              ${selected === b.id
                ? 'border-[#1a3a5c] bg-[#eef7fd]'
                : 'border-[#c3dff2] bg-white hover:bg-[#eef7fd]'}`}
          >
            <span className="text-base font-semibold text-[#1a3a5c]">{b.label}</span>
            <span className="text-xs text-[#7aabcf] mt-1">{b.sub}</span>
          </button>
        ))}
      </div>

      <Button size="lg" onClick={next} disabled={!selected}>
        Continue →
      </Button>
    </Card>
  )
}
```

- [ ] **Step 5: Create `app/(onboarding)/onboarding/basics/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { saveOnboarding } from '@/lib/onboarding-store'

const AGE_RANGES = ['Teens', '20s', '30s', '40s', '50s+']
const SENSITIVITY_LABELS = ['None', 'Mild', 'Moderate', 'High', 'Very high']

export default function BasicsPage() {
  const router       = useRouter()
  const [age, setAge]           = useState('')
  const [sensitivity, setSens]  = useState(1)

  const next = () => {
    saveOnboarding({ ageRange: age, sensitivity })
    router.push('/sign-up')
  }

  return (
    <Card className="max-w-[560px] mx-auto">
      <ProgressBar step={3} total={3} />
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-2">Step 3 of 3</p>
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] leading-tight mb-1">
        A little about you
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">Helps us tailor recommendations.</p>

      <div className="mb-8">
        <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-wider mb-3">Age range</p>
        <div className="flex gap-2 flex-wrap">
          {AGE_RANGES.map(a => (
            <button
              key={a}
              onClick={() => setAge(a)}
              className={`px-5 py-2 rounded-full border-[1.5px] text-sm font-medium transition-all
                ${age === a
                  ? 'border-[#1a3a5c] bg-[#eef7fd] text-[#1a3a5c]'
                  : 'border-[#c3dff2] text-[#7aabcf] hover:bg-[#eef7fd]'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-wider mb-3">
          Skin sensitivity — {SENSITIVITY_LABELS[sensitivity - 1]}
        </p>
        <input
          type="range" min={1} max={5} value={sensitivity}
          onChange={e => setSens(Number(e.target.value))}
          className="w-full accent-[#1a3a5c]"
        />
        <div className="flex justify-between text-xs text-[#7aabcf] mt-1">
          <span>None</span><span>Very high</span>
        </div>
      </div>

      <Button size="lg" onClick={next} disabled={!age}>
        Create my free account →
      </Button>
    </Card>
  )
}
```

- [ ] **Step 6: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: onboarding questionnaire — goals, budget, basics with localStorage"
```

---

## Task 5: Clerk Auth Pages (Styled)

**Files:**
- Create: `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- Create: `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- Create: `app/(auth)/layout.tsx`

- [ ] **Step 1: Create `app/(auth)/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      <div className="flex justify-center mt-8">{children}</div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx`**

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary:    '#1a3a5c',
          colorBackground: '#ffffff',
          colorText:       '#1a3a5c',
          colorTextSecondary: '#7aabcf',
          colorInputBackground: '#ffffff',
          colorInputText:  '#1a3a5c',
          borderRadius:    '12px',
          fontFamily:      "'DM Sans', sans-serif",
        },
        elements: {
          card:            'shadow-none border border-[#c3dff2] rounded-[20px]',
          headerTitle:     "font-['Cormorant_Garamond'] text-3xl font-bold",
          formButtonPrimary: 'bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white',
        },
      }}
    />
  )
}
```

- [ ] **Step 3: Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx`**

```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary:    '#1a3a5c',
          colorBackground: '#ffffff',
          colorText:       '#1a3a5c',
          colorTextSecondary: '#7aabcf',
          colorInputBackground: '#ffffff',
          colorInputText:  '#1a3a5c',
          borderRadius:    '12px',
          fontFamily:      "'DM Sans', sans-serif",
        },
        elements: {
          card:            'shadow-none border border-[#c3dff2] rounded-[20px]',
          headerTitle:     "font-['Cormorant_Garamond'] text-3xl font-bold",
          formButtonPrimary: 'bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white',
        },
      }}
    />
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: Clerk sign-in and sign-up pages styled to tholai palette"
```

---

## Task 6: Auth Proxy (Route Protection)

**Files:**
- Create or modify: `proxy.ts` (Next.js 16 uses proxy.ts; fallback to `middleware.ts` if proxy.ts not created by `clerk init`)

- [ ] **Step 1: Create/update `proxy.ts`**

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtected = createRouteMatcher(['/dashboard(.*)', '/scan(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: proxy.ts — protect /dashboard and /scan routes with Clerk"
```

---

## Task 7: API Routes

**Files:**
- Create: `app/api/onboarding/route.ts`
- Create: `app/api/analyze/route.ts`

- [ ] **Step 1: Create `app/api/onboarding/route.ts`**

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { goals, budget, ageRange, sensitivity, email } = body

  const { error } = await supabaseAdmin()
    .from('users')
    .upsert({
      id:               userId,
      email:            email ?? '',
      subscription_tier: 'free',
      goals:            goals,
      budget:           budget,
      age_range:        ageRange,
      sensitivity:      sensitivity,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Create `app/api/analyze/route.ts`**

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
    user_id:            userId,
    skin_type:          analysis.skin_type,
    concerns:           analysis.concerns,
    hydration_estimate: analysis.hydration_estimate,
    analysis_summary:   analysis.analysis_summary,
    skin_tone_fitzpatrick: analysis.skin_tone_fitzpatrick,
  })

  return NextResponse.json({ analysis })
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: API routes — /api/onboarding and /api/analyze"
```

---

## Task 8: Scan Flow (Photo → Analyzing → Results)

**Files:**
- Create: `app/(scan)/layout.tsx`
- Create: `app/(scan)/scan/photo/page.tsx`
- Create: `app/(scan)/scan/analyzing/page.tsx`
- Create: `app/(scan)/scan/results/page.tsx`
- Create: `lib/analysis-store.ts`

- [ ] **Step 1: Create `lib/analysis-store.ts`**

```typescript
export interface SkinConcern { id: string; label: string; severity: number }
export interface SkinAnalysis {
  skin_type:             string
  concerns:              SkinConcern[]
  hydration_estimate:    number
  analysis_summary:      string
  skin_tone_fitzpatrick: number
}

const KEY = 'tholai_latest_analysis'

export function saveAnalysis(a: SkinAnalysis) {
  sessionStorage.setItem(KEY, JSON.stringify(a))
}

export function loadAnalysis(): SkinAnalysis | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
```

- [ ] **Step 2: Create `app/(scan)/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      {children}
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Create `app/(scan)/scan/photo/page.tsx`**

```tsx
'use client'

import { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PhotoPage() {
  const router     = useRouter()
  const videoRef   = useRef<HTMLVideoElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const fileRef    = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)

  const startCamera = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    if (videoRef.current) { videoRef.current.srcObject = stream; setStreaming(true) }
  }, [])

  const capture = useCallback(() => {
    const v = videoRef.current; const c = canvasRef.current
    if (!v || !c) return
    c.width = v.videoWidth; c.height = v.videoHeight
    c.getContext('2d')!.drawImage(v, 0, 0)
    setPreview(c.toDataURL('image/jpeg', 0.9))
    ;(v.srcObject as MediaStream)?.getTracks().forEach(t => t.stop())
    setStreaming(false)
  }, [])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const proceed = useCallback(() => {
    if (!preview) return
    sessionStorage.setItem('tholai_photo', preview)
    router.push('/scan/analyzing')
  }, [preview, router])

  return (
    <Card className="max-w-[560px] mx-auto text-center">
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] mb-2">
        Scan your skin
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">
        Take a photo or upload one. Good lighting gives the best results.
      </p>

      {/* Camera / preview area */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-6 rounded-2xl overflow-hidden bg-[#eef7fd]">
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
        {!preview && !streaming && (
          <div className="absolute inset-0 flex items-center justify-center text-[#7aabcf] text-sm">
            Camera preview
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col gap-3">
        {!preview && !streaming && (
          <>
            <Button size="lg" onClick={startCamera}>Use camera</Button>
            <Button size="lg" variant="outline" onClick={() => fileRef.current?.click()}>
              Upload photo
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </>
        )}
        {streaming && (
          <Button size="lg" onClick={capture}>Take photo</Button>
        )}
        {preview && (
          <>
            <Button size="lg" onClick={proceed}>Use this photo →</Button>
            <Button size="lg" variant="outline" onClick={() => setPreview(null)}>Retake</Button>
          </>
        )}
      </div>
    </Card>
  )
}
```

- [ ] **Step 4: Create `app/(scan)/scan/analyzing/page.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { saveAnalysis } from '@/lib/analysis-store'

const STEPS = ['Preparing your image...', 'Reading skin texture...', 'Identifying concerns...', 'Building your profile...']

export default function AnalyzingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 1800)

    const run = async () => {
      const photo = sessionStorage.getItem('tholai_photo')
      if (!photo) { router.replace('/scan/photo'); return }

      const base64 = photo.split(',')[1]
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType: 'image/jpeg' }),
      })

      if (!res.ok) { router.replace('/scan/photo'); return }
      const { analysis } = await res.json()
      saveAnalysis(analysis)
      clearInterval(interval)
      router.replace('/scan/results')
    }

    run()
    return () => clearInterval(interval)
  }, [router])

  return (
    <Card className="max-w-[400px] mx-auto text-center py-16">
      {/* Spinner */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#c3dff2]" />
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1a3a5c] animate-spin"
        />
      </div>
      <h2 className="font-['Cormorant_Garamond'] text-[28px] font-bold text-[#1a3a5c] mb-2">
        Analysing your skin
      </h2>
      <p className="text-sm text-[#7aabcf] transition-all duration-300">{STEPS[step]}</p>
    </Card>
  )
}
```

- [ ] **Step 5: Create `components/ui/ConcernBar.tsx`**

```tsx
export function ConcernBar({ label, severity }: { label: string; severity: number }) {
  const pct = Math.round((severity / 10) * 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#1a3a5c] font-medium">{label}</span>
        <span className="text-[#7aabcf]">{severity}/10</span>
      </div>
      <div className="h-2 bg-[#eef7fd] rounded-full overflow-hidden">
        <div
          className="h-2 bg-[#1a3a5c] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `app/(scan)/scan/results/page.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConcernBar } from '@/components/ui/ConcernBar'
import { loadAnalysis, type SkinAnalysis } from '@/lib/analysis-store'

const SKIN_TYPE_LABELS: Record<string, string> = {
  oily: 'Oily', dry: 'Dry', combination: 'Combination', normal: 'Normal', sensitive: 'Sensitive',
}

export default function ResultsPage() {
  const router   = useRouter()
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null)

  useEffect(() => { setAnalysis(loadAnalysis()) }, [])

  if (!analysis) return (
    <Card className="max-w-[600px] mx-auto text-center py-12">
      <p className="text-[#7aabcf]">No analysis found. <button onClick={() => router.push('/scan/photo')} className="text-[#1a3a5c] underline">Scan again</button></p>
    </Card>
  )

  const concerns = Array.isArray(analysis.concerns) ? analysis.concerns : []

  // Persist onboarding data to Supabase now that user is authed
  useEffect(() => {
    const data = localStorage.getItem('tholai_onboarding')
    if (!data) return
    const parsed = JSON.parse(data)
    fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    }).then(() => localStorage.removeItem('tholai_onboarding'))
  }, [])

  return (
    <Card className="max-w-[600px] mx-auto">
      <p className="text-xs font-semibold text-[#7aabcf] uppercase tracking-widest mb-3">Your skin profile</p>

      <div className="inline-block bg-[#eef7fd] px-4 py-2 rounded-full mb-4">
        <span className="text-[#1a3a5c] font-semibold">{SKIN_TYPE_LABELS[analysis.skin_type] ?? analysis.skin_type} skin</span>
      </div>

      <p className="text-sm text-[#1a3a5c] leading-relaxed mb-6">{analysis.analysis_summary}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#eef7fd] rounded-2xl p-4 text-center">
          <p className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1a3a5c]">{analysis.hydration_estimate}%</p>
          <p className="text-xs text-[#7aabcf] mt-1">Hydration</p>
        </div>
        <div className="bg-[#eef7fd] rounded-2xl p-4 text-center">
          <p className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1a3a5c]">{concerns.length}</p>
          <p className="text-xs text-[#7aabcf] mt-1">Concerns found</p>
        </div>
      </div>

      {/* Concern bars */}
      <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1a3a5c] mb-4">Skin concerns</h3>
      {[...concerns].sort((a, b) => b.severity - a.severity).map(c => (
        <ConcernBar key={c.id} label={c.label} severity={c.severity} />
      ))}

      <p className="text-xs text-[#7aabcf] text-center my-4">
        tholai is not a medical service. Consult a dermatologist for skin conditions.
      </p>

      <Button size="lg" onClick={() => router.push('/dashboard')}>
        Go to my dashboard →
      </Button>
    </Card>
  )
}
```

- [ ] **Step 7: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: scan flow — photo capture/upload, analyzing spinner, results with concern bars"
```

---

## Task 9: Dashboard

**Files:**
- Create: `app/(dashboard)/layout.tsx`
- Create: `app/(dashboard)/dashboard/page.tsx`
- Create: `app/(dashboard)/dashboard/routine/page.tsx`
- Create: `app/(dashboard)/dashboard/products/page.tsx`
- Create: `app/(dashboard)/dashboard/progress/page.tsx`
- Create: `components/ui/DashboardNav.tsx`

- [ ] **Step 1: Create `components/ui/DashboardNav.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `app/(dashboard)/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { DashboardNav } from '@/components/ui/DashboardNav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      <DashboardNav />
      {children}
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Create `app/(dashboard)/dashboard/page.tsx`**

```tsx
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
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

  return (
    <div className="grid gap-6">
      {/* Glow Score */}
      <Card className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#c3dff2" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="#1a3a5c" strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - (glowScore ?? 0) / 100)}`}
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

      {/* Quick actions */}
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
```

- [ ] **Step 4: Create `app/(dashboard)/dashboard/routine/page.tsx`**

```tsx
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
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
      {[{ label: 'AM Routine', emoji: '☀', steps: AM_STEPS }, { label: 'PM Routine', emoji: '◑', steps: PM_STEPS }].map(r => (
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
```

- [ ] **Step 5: Create `app/(dashboard)/dashboard/products/page.tsx`**

```tsx
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Card } from '@/components/ui/Card'

const PLACEHOLDER_PRODUCTS = [
  { name: 'CeraVe Hydrating Cleanser', category: 'Cleanser', price: '$16', match: 98 },
  { name: 'Paula\'s Choice BHA Exfoliant', category: 'Treatment', price: '$34', match: 95 },
  { name: 'La Roche-Posay Effaclar Moisturiser', category: 'Moisturiser', price: '$28', match: 92 },
  { name: 'EltaMD UV Clear SPF 46', category: 'Sunscreen', price: '$41', match: 90 },
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
    if (data?.concerns) concerns = (data.concerns as Array<{ label: string }>).map(c => c.label)
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
```

- [ ] **Step 6: Create `app/(dashboard)/dashboard/progress/page.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const MOCK_DATA = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  scores: [62, 67, 71, 75],
}

export default function ProgressPage() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [{
          label: 'Glow Score',
          data: MOCK_DATA.scores,
          borderColor: '#1a3a5c',
          backgroundColor: 'rgba(26,58,92,0.06)',
          borderWidth: 2,
          pointBackgroundColor: '#1a3a5c',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, grid: { color: '#c3dff2' }, ticks: { color: '#7aabcf' } },
          x: { grid: { display: false }, ticks: { color: '#7aabcf' } },
        },
      },
    })
    return () => chart.destroy()
  }, [])

  return (
    <div className="grid gap-6">
      <Card>
        <p className="text-xs text-[#7aabcf] font-semibold uppercase tracking-widest mb-4">Glow Score history</p>
        <canvas ref={chartRef} />
      </Card>

      <Card>
        <p className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1a3a5c] mb-2">Weekly check-in</p>
        <p className="text-sm text-[#7aabcf] mb-4">Upload a photo each week to track your skin&apos;s progress.</p>
        <Button size="md" onClick={() => document.getElementById('checkin-upload')?.click()}>
          Upload check-in photo
        </Button>
        <input id="checkin-upload" type="file" accept="image/*" className="hidden" />
      </Card>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git add -A
git commit -m "feat: full dashboard — home, routine, products, progress with Glow Score"
```

---

## Task 10: GitHub Repo + Vercel Deploy

**Files:**
- Modify: `.gitignore` (ensure .env.local is excluded)

- [ ] **Step 1: Verify `.gitignore` excludes secrets**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
grep -q ".env.local" .gitignore && echo "OK" || echo ".env.local" >> .gitignore
```

- [ ] **Step 2: Create new GitHub repo and push**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
git init 2>/dev/null || true
gh repo create tholai-web --public --source=. --remote=origin --push
```

Expected: GitHub URL printed, branch pushed.

- [ ] **Step 3: Add Vercel project**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
npx vercel --yes
```

Follow prompts: link to existing Vercel account, create new project named `tholai-web`.

- [ ] **Step 4: Set environment variables on Vercel**

```bash
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
npx vercel env add CLERK_SECRET_KEY
npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL
npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL
npx vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
npx vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
```

- [ ] **Step 5: Deploy to production**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
npx vercel --prod
```

Expected: production URL printed (e.g. `https://tholai-web.vercel.app`).

- [ ] **Step 6: Run `clerk doctor` to verify setup**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
clerk doctor
```

Expected: all checks pass.

---

## Task 11: Clerk CLI Init (if not done in Task 1)

This task runs the Clerk CLI interactively if `clerk init` was not completed in Task 1.

- [ ] **Step 1: Check if Clerk is already initialized**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
grep -q "CLERK" .env.local && echo "Already initialized" || echo "Needs clerk init"
```

- [ ] **Step 2: If not initialized, run Clerk CLI login + init**

```bash
clerk auth login
clerk init --app app_3F3htG8zFfK06fTCEKKNuV7XVY2
```

- [ ] **Step 3: Final health check**

```bash
cd /Users/sanjaysubramania/Projects/tholai-web
clerk doctor
npm run build 2>&1 | tail -5
```

Expected: `clerk doctor` passes, build succeeds with no type errors.
