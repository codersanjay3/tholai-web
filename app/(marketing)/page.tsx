'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FEATURES = [
  { label: 'AI skin scan', desc: 'One photo. Full breakdown of skin type, texture, hydration, and active concerns — in under 30 seconds.' },
  { label: 'Personalised routines', desc: 'AM and PM steps built around your actual skin, goals, and the budget you told us about.' },
  { label: 'Product matching', desc: 'Ingredient-aware recommendations filtered by price. No padding. No affiliate noise.' },
  { label: 'Glow Score', desc: 'Weekly photo check-ins track measurable progress over time so you know what is actually working.' },
  { label: 'Concern tracking', desc: 'Hyperpigmentation, acne, dryness, sensitivity — each concern scored and monitored over time.' },
  { label: 'Routine updates', desc: 'Skin changes with age and season. Your routine syncs automatically.' },
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
    <div className="w-full overflow-x-hidden">

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

      {/* ─── FEATURES ─── */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ label, desc }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-7"
                style={{ boxShadow: '0 4px 24px rgba(30,100,180,0.06)', border: '1px solid #eef7fd' }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#d6eaf8] flex items-center justify-center mb-4">
                  <Image src="/logo.svg" alt="" width={16} height={16} />
                </div>
                <h3 className="font-bold text-[#1a3a5c] mb-2">{label}</h3>
                <p className="text-sm leading-relaxed text-[#5a85aa]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black leading-tight tracking-tight text-[#1a3a5c] mb-4">
              Simple pricing
            </h2>
            <p className="text-base text-[#5a85aa]">Start free. Upgrade when you are ready for the full picture.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {PRICING.map(({ name, price, period, dark, features, cta, href }) => (
              <div
                key={name}
                className="rounded-2xl p-8 flex flex-col gap-7"
                style={{
                  background: dark ? '#1a3a5c' : 'white',
                  boxShadow: dark ? '0 24px 48px rgba(26,58,92,0.25)' : '0 4px 24px rgba(30,100,180,0.06)',
                  border: dark ? 'none' : '1px solid #eef7fd',
                }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: dark ? 'rgba(255,255,255,0.45)' : '#5a85aa' }}>{name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black" style={{ color: dark ? '#fff' : '#1a3a5c' }}>{price}</span>
                    <span className="text-sm" style={{ color: dark ? 'rgba(255,255,255,0.45)' : '#5a85aa' }}>{period}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <circle cx="8" cy="8" r="8" fill={dark ? 'rgba(255,255,255,0.1)' : '#eef7fd'} />
                        <path d="M5 8l2 2 4-4" stroke={dark ? '#fff' : '#5a85aa'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ color: dark ? 'rgba(255,255,255,0.85)' : '#1a3a5c' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className="mt-auto text-center text-sm font-semibold py-3.5 rounded-xl transition-all"
                  style={{
                    background: dark ? 'white' : '#1a3a5c',
                    color: dark ? '#1a3a5c' : 'white',
                  }}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
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
