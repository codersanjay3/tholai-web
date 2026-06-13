'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Pricing, type PricingPlan } from '@/components/blocks/pricing'

const THOLAI_PLANS: PricingPlan[] = [
  {
    name: 'Free',
    price: '0',
    yearlyPrice: '0',
    period: 'month',
    features: [
      '1 AI skin scan',
      'Basic skin type report',
      'Starter AM/PM routine',
      'Top 3 product picks',
    ],
    description: 'No credit card required',
    buttonText: 'Start for free',
    href: '/onboarding/goals',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '9',
    yearlyPrice: '7',
    period: 'month',
    features: [
      'Unlimited AI scans',
      'Full concern analysis',
      'Complete personalised routines',
      'Unlimited product matching',
      'Glow Score + photo timeline',
      'Ingredient deep-dives',
      'Routine auto-updates',
    ],
    description: '14-day free trial, cancel anytime',
    buttonText: 'Start free trial',
    href: '/onboarding/goals',
    isPopular: true,
  },
  {
    name: 'Family',
    price: '19',
    yearlyPrice: '15',
    period: 'month',
    features: [
      'Everything in Pro',
      'Up to 5 skin profiles',
      'Shared product lists',
      'Family routine dashboard',
      'Priority support',
    ],
    description: 'Up to 5 members per account',
    buttonText: 'Get Family plan',
    href: '/onboarding/goals',
    isPopular: false,
  },
]


const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    dark: false,
    features: [
      '1 AI skin scan',
      'Basic skin type report',
      'Starter AM/PM routine',
      'Top 3 product picks',
    ],
    cta: 'Start for free',
    href: '/onboarding/goals',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    dark: true,
    features: [
      'Unlimited AI scans',
      'Full concern analysis',
      'Complete personalised routines',
      'Unlimited product matching',
      'Glow Score + photo timeline',
      'Ingredient deep-dives',
      'Routine auto-updates',
    ],
    cta: 'Start free trial',
    href: '/onboarding/goals',
  },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="w-full overflow-x-hidden" style={{ position: 'relative', zIndex: 1 }}>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center">

        {/* Colorful abstract bg — right side blob like Stripe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute -right-32 top-0 w-[900px] h-[900px] opacity-80"
            viewBox="0 0 900 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="g1" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#a8d8f0" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#7ec8e3" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d6eaf8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="g2" cx="70%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#b8e0f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#90cde8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d6eaf8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="g3" cx="30%" cy="70%" r="40%">
                <stop offset="0%" stopColor="#c8eaf8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d6eaf8" stopOpacity="0" />
              </radialGradient>
              <filter id="blur1">
                <feGaussianBlur stdDeviation="40" />
              </filter>
            </defs>
            <ellipse cx="600" cy="300" rx="380" ry="340" fill="url(#g1)" filter="url(#blur1)" />
            <ellipse cx="700" cy="550" rx="300" ry="280" fill="url(#g2)" filter="url(#blur1)" />
            <ellipse cx="450" cy="650" rx="260" ry="200" fill="url(#g3)" filter="url(#blur1)" />
          </svg>
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 w-full py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(26,58,92,0.08)', color: '#1a3a5c' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a5c] inline-block" />
              Now in beta
            </div>

            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-black leading-[1.05] tracking-tight text-[#1a3a5c] mb-6">
              Skin analysis<br />
              <span className="text-[#5a85aa]">that actually knows</span><br />
              your skin.
            </h1>

            <p className="text-[1.1rem] leading-relaxed text-[#5a85aa] max-w-[480px] mb-10">
              One photo. Your skin type, concerns, and a full AM/PM routine with products matched to your
              budget — powered by Claude AI.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => router.push('/onboarding/goals')}
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-xl bg-[#1a3a5c] text-white hover:bg-[#243f6a] transition-colors cursor-pointer"
              >
                Get your free skin analysis
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-xl bg-white text-[#1a3a5c] border border-[#c3dff2] hover:border-[#1a3a5c] transition-colors"
              >
                View pricing
              </Link>
            </div>

            <p className="text-xs text-[#5a85aa]">
              Free forever · No credit card · Results in 30 seconds
            </p>
          </div>

          {/* Right: mockup card */}
          <div className="hidden lg:flex justify-center">
            <div
              className="w-[340px] rounded-3xl p-8 flex flex-col gap-5"
              style={{ background: 'white', boxShadow: '0 24px 64px rgba(30,100,180,0.12)' }}
            >
              {/* Logo mark */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#d6eaf8] flex items-center justify-center">
                  <Image src="/logo.svg" alt="tholai" width={24} height={24} className="text-[#1a3a5c]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Tholai</p>
                  <p className="text-[10px] text-[#5a85aa]">Skin analysis complete</p>
                </div>
              </div>

              {/* Skin type badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#eef7fd]">
                <div>
                  <p className="text-[10px] font-semibold text-[#5a85aa] uppercase tracking-wider mb-0.5">Skin type</p>
                  <p className="text-lg font-black text-[#1a3a5c]">Combination</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-[#5a85aa] uppercase tracking-wider mb-0.5">Glow score</p>
                  <p className="text-lg font-black text-[#1a3a5c]">72</p>
                </div>
              </div>

              {/* Concerns */}
              <div>
                <p className="text-[10px] font-semibold text-[#5a85aa] uppercase tracking-wider mb-2">Active concerns</p>
                <div className="flex flex-col gap-2">
                  {[['Mild dehydration', 6], ['T-zone oiliness', 4], ['Early sun damage', 3]].map(([label, sev]) => (
                    <div key={label as string} className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[#eef7fd] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#5a85aa]"
                          style={{ width: `${(sev as number) * 10}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#5a85aa] w-32 text-right">{label as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routine preview */}
              <div>
                <p className="text-[10px] font-semibold text-[#5a85aa] uppercase tracking-wider mb-2">AM routine</p>
                <div className="flex flex-col gap-1.5">
                  {['Gentle cleanser', 'Niacinamide serum', 'SPF 30+ moisturiser'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#1a3a5c] text-white text-[9px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-xs text-[#1a3a5c]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <div className="border-y border-[#c3dff2] bg-white/50">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {['Dermatologist-informed', 'Powered by Claude AI', 'No data sold', 'GDPR compliant', 'Free to start'].map(t => (
            <div key={t} className="flex items-center gap-2 text-sm text-[#5a85aa]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#d6eaf8"/><path d="M4 7l2 2 4-4" stroke="#1a3a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black leading-tight tracking-tight text-[#1a3a5c] mb-4">
              From photo to full<br />routine in 30 seconds
            </h2>
            <p className="text-base text-[#5a85aa]">
              No forms, no guesswork, no generic advice. Your skin, read directly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Take or upload a photo', body: 'A clear selfie in natural light. Camera or file — your choice. Nothing is stored longer than needed.' },
              { n: '02', title: 'AI reads your skin', body: 'Claude analyses texture, tone, hydration, and visible concerns. Your goals and budget shape what comes next.' },
              { n: '03', title: 'Get your routine', body: 'A personalised AM and PM routine with product picks that fit your budget — ready in under 30 seconds.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(30,100,180,0.06)' }}>
                <p className="text-5xl font-black text-[#c3dff2] mb-4">{n}</p>
                <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-[#5a85aa]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES BENTO ─── */}
      <section id="features" className="py-28 px-6 bg-white/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black leading-tight tracking-tight text-[#1a3a5c] mb-4">
              Everything your skin<br />actually needs
            </h2>
            <p className="text-base text-[#5a85aa]">
              Built for people who want real results, not a second job reading ingredient labels.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

            {/* Large: AI scan — spans 2 cols */}
            <div
              className="md:col-span-2 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
              style={{ background: '#1a3a5c' }}
            >
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
              <div>
                <p className="text-xs font-semibold text-[rgba(255,255,255,0.45)] uppercase tracking-widest mb-4">AI skin scan</p>
                <h3 className="text-2xl font-black text-white leading-tight max-w-sm">
                  One photo. A full read of everything happening on your skin.
                </h3>
              </div>
              <div className="flex gap-3 mt-6">
                {['Skin type', 'Hydration', 'Concerns', 'Fitzpatrick tone'].map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Glow Score */}
            <div
              className="rounded-3xl p-8 flex flex-col justify-between min-h-[280px]"
              style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 4px 24px rgba(30,100,180,0.06)' }}
            >
              <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest">Glow Score</p>
              <div>
                <p className="text-7xl font-black text-[#1a3a5c] leading-none">72</p>
                <div className="mt-3 h-2 bg-[#eef7fd] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: '72%' }} />
                </div>
                <p className="text-xs text-[#5a85aa] mt-2">Weekly check-ins track real progress</p>
              </div>
            </div>

            {/* Routine preview */}
            <div
              className="rounded-3xl p-8 flex flex-col gap-5"
              style={{ background: '#eef7fd', border: '1px solid #d6eaf8' }}
            >
              <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest">AM routine</p>
              <div className="flex flex-col gap-3">
                {['Gentle cleanser', 'Niacinamide serum', 'Broad-spectrum SPF'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1a3a5c] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-[#1a3a5c]">{s}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5a85aa]">+ matching PM routine built for you</p>
            </div>

            {/* Budget matching */}
            <div
              className="rounded-3xl p-8 flex flex-col justify-between"
              style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 4px 24px rgba(30,100,180,0.06)' }}
            >
              <div>
                <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-4">Product matching</p>
                <h3 className="text-lg font-black text-[#1a3a5c] leading-tight">
                  Picks that fit your budget. Filtered by what your skin actually needs.
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {['Under $30', '$30–75', '$75–150', '$150+'].map(b => (
                  <span key={b} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#eef7fd] text-[#1a3a5c]">{b}</span>
                ))}
              </div>
            </div>

            {/* Ingredient breakdown — spans remaining */}
            <div
              className="rounded-3xl p-8 flex flex-col justify-between"
              style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 4px 24px rgba(30,100,180,0.06)' }}
            >
              <div>
                <p className="text-xs font-semibold text-[#5a85aa] uppercase tracking-widest mb-4">Ingredient breakdown</p>
                <h3 className="text-lg font-black text-[#1a3a5c] leading-tight">
                  Know exactly what each product does — and why it is in your routine.
                </h3>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {[['Niacinamide', 'Brightening + pore-tightening'], ['Hyaluronic acid', 'Deep hydration barrier']].map(([ing, why]) => (
                  <div key={ing} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5a85aa] mt-1.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-[#1a3a5c]">{ing} </span>
                      <span className="text-xs text-[#5a85aa]">{why}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-28">
        <Pricing
          plans={THOLAI_PLANS}
          title="Simple pricing"
          description="Start free. Upgrade when you are ready for the full picture."
        />
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="py-24 px-6" style={{ background: '#1a3a5c' }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
              Your skin deserves a<br />real answer.
            </h2>
            <p className="text-[#7aabcf] text-base">Takes 2 minutes. Free forever. No card needed.</p>
          </div>
          <button
            onClick={() => router.push('/onboarding/goals')}
            className="shrink-0 text-sm font-semibold px-7 py-4 rounded-xl bg-white text-[#1a3a5c] hover:bg-[#eef7fd] transition-colors cursor-pointer whitespace-nowrap"
          >
            Analyse my skin — it&apos;s free →
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-[#e8f0f8] py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="tholai" width={24} height={24} className="text-[#1a3a5c]" />
            <span className="text-sm font-black text-[#1a3a5c] uppercase tracking-tight">Tholai</span>
          </div>
          <p className="text-xs text-[#5a85aa]">© {new Date().getFullYear()} Tholai. Your skin, understood.</p>
          <div className="flex gap-5 text-xs text-[#5a85aa]">
            <Link href="#" className="hover:text-[#1a3a5c] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#1a3a5c] transition-colors">Terms</Link>
            <Link href="#pricing" className="hover:text-[#1a3a5c] transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
