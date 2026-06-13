'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HOW_IT_WORKS = [
  {
    step: 'Take a photo',
    desc: 'A single clear selfie is all it takes. No dermatologist appointment, no waiting room.',
  },
  {
    step: 'Get your skin profile',
    desc: 'Our AI identifies your skin type, active concerns, and what your routine is missing.',
  },
  {
    step: 'Follow your routine',
    desc: 'Receive a personalised AM/PM routine with product picks matched to your budget.',
  },
]

const FEATURES = [
  { label: 'AI skin analysis', desc: 'Detects type, concerns, and texture from a single photo.' },
  { label: 'Personalised routines', desc: 'AM and PM steps built around your goals, budget, and lifestyle.' },
  { label: 'Product matching', desc: 'Curated picks filtered by ingredients, price, and what actually works for you.' },
  { label: 'Glow Score', desc: 'Weekly photo check-ins track measurable progress over time.' },
  { label: 'Ingredient breakdown', desc: 'Know exactly what each product does and why it is in your routine.' },
  { label: 'Routine updates', desc: 'Your skin changes with seasons and age. Your routine updates automatically.' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: [
      '1 AI skin scan',
      'Basic skin type report',
      'Starter AM/PM routine',
      'Product recommendations (top 3)',
    ],
    cta: 'Start for free',
    href: '/onboarding/goals',
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    highlight: true,
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
    <main className="w-full">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center pt-20 pb-24 px-6 gap-8 max-w-3xl mx-auto">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full"
          style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          Now in beta
        </div>

        <h1
          className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          Skincare advice<br />
          <span style={{ color: 'var(--muted)' }}>that knows your skin.</span>
        </h1>

        <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--muted)' }}>
          One photo. Your skin type, concerns, and a full AM/PM routine with products matched to your budget —
          built by AI, backed by dermatology research.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => router.push('/onboarding/goals')}
            className="text-sm font-semibold px-7 py-3.5 rounded-xl transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: 'var(--text)', color: '#fff' }}
          >
            Analyse my skin — it&apos;s free
          </button>
          <Link
            href="#how-it-works"
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            See how it works →
          </Link>
        </div>

        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          Free scan · No credit card required · Results in under 30 seconds
        </p>
      </section>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Three steps to better skin
          </h2>
        </div>

        <ol className="grid sm:grid-cols-3 gap-10">
          {HOW_IT_WORKS.map(({ step, desc }, i) => (
            <li key={step} className="flex flex-col gap-3">
              <span
                className="text-4xl font-black tabular-nums"
                style={{ color: 'var(--border)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{step}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* ── Features ── */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Everything your skin needs
          </h2>
          <p className="mt-4 text-base" style={{ color: 'var(--muted)' }}>
            Built for people who want results, not a second job reading ingredient labels.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ label, desc }) => (
            <li
              key={label}
              className="flex flex-col gap-2 p-6 rounded-2xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Simple pricing
          </h2>
          <p className="mt-4 text-base" style={{ color: 'var(--muted)' }}>
            Start free. Upgrade when you are ready.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PRICING.map(({ name, price, period, highlight, features, cta, href }) => (
            <div
              key={name}
              className="flex flex-col gap-6 p-8 rounded-2xl"
              style={{
                background: highlight ? 'var(--text)' : 'var(--surface)',
                border: highlight ? 'none' : '1px solid var(--border)',
              }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}
                >
                  {name}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-4xl font-black"
                    style={{ color: highlight ? '#fff' : 'var(--text)' }}
                  >
                    {price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}
                  >
                    {period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      width="16" height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0"
                    >
                      <circle cx="8" cy="8" r="8" fill={highlight ? 'rgba(255,255,255,0.12)' : 'var(--hover)'} />
                      <path d="M5 8l2 2 4-4" stroke={highlight ? '#fff' : 'var(--muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: highlight ? 'rgba(255,255,255,0.85)' : 'var(--text)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className="mt-auto text-center text-sm font-semibold py-3 px-6 rounded-xl transition-opacity hover:opacity-90"
                style={{
                  background: highlight ? '#fff' : 'var(--text)',
                  color: highlight ? 'var(--text)' : '#fff',
                }}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* ── Footer CTA ── */}
      <section className="py-24 px-6 text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text)' }}
        >
          Your skin deserves a real answer.
        </h2>
        <button
          onClick={() => router.push('/onboarding/goals')}
          className="text-sm font-semibold px-8 py-3.5 rounded-xl transition-opacity hover:opacity-90 cursor-pointer"
          style={{ background: 'var(--text)', color: '#fff' }}
        >
          Get your free skin analysis
        </button>
        <p className="mt-4 text-xs" style={{ color: 'var(--muted)' }}>
          Takes 2 minutes · Free forever · No card needed
        </p>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <p>© {new Date().getFullYear()} tholai. Your skin, understood.</p>
      </footer>

    </main>
  )
}
