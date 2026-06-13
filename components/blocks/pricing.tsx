'use client'

import { buttonVariants } from '@/components/ui/Button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import NumberFlow from '@number-flow/react'

export interface PricingPlan {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
}

interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
}

export function Pricing({
  plans,
  title = 'Simple, Transparent Pricing',
  description = 'Start free. Upgrade when your skin needs more.',
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const switchRef = useRef<HTMLButtonElement>(null)

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#1a3a5c', '#5a85aa', '#c3dff2', '#d6eaf8'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      })
    }
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-[#1a3a5c] mb-4">
          {title}
        </h2>
        <p className="text-[#5a85aa] text-base max-w-md mx-auto">{description}</p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <span className="text-sm font-medium text-[#1a3a5c]">Monthly</span>
        <Label className="cursor-pointer">
          <Switch
            ref={switchRef as React.RefObject<HTMLButtonElement>}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
          />
        </Label>
        <span className="text-sm font-medium text-[#1a3a5c]">
          Annual{' '}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#d6eaf8] text-[#1a3a5c] ml-1">
            Save 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -20 : index === 0 ? 20 : 0,
                    scale: index === 0 || index === 2 ? 0.95 : 1.0,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: 0.2 + index * 0.1,
            }}
            className={cn(
              'relative rounded-2xl p-8 flex flex-col',
              plan.isPopular
                ? 'border-2 border-[#1a3a5c]'
                : 'border border-[#e8f0f8]',
              !plan.isPopular && 'mt-5',
              index === 0 && 'origin-right',
              index === 2 && 'origin-left'
            )}
            style={{
              background: plan.isPopular ? '#1a3a5c' : 'white',
              boxShadow: plan.isPopular
                ? '0 24px 56px rgba(26,58,92,0.22)'
                : '0 4px 24px rgba(30,100,180,0.06)',
            }}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 right-6 flex items-center gap-1 bg-white text-[#1a3a5c] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </div>
            )}

            <div className="flex-1 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: plan.isPopular ? 'rgba(255,255,255,0.5)' : '#5a85aa' }}>
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black tabular-nums"
                  style={{ color: plan.isPopular ? 'white' : '#1a3a5c' }}>
                  <NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                    transformTiming={{ duration: 500, easing: 'ease-out' }}
                    willChange
                  />
                </span>
                {plan.period && (
                  <span className="text-sm"
                    style={{ color: plan.isPopular ? 'rgba(255,255,255,0.45)' : '#5a85aa' }}>
                    /{plan.period}
                  </span>
                )}
              </div>
              <p className="text-xs mb-6"
                style={{ color: plan.isPopular ? 'rgba(255,255,255,0.35)' : '#5a85aa' }}>
                {isMonthly ? 'billed monthly' : 'billed annually'}
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: plan.isPopular ? 'rgba(255,255,255,0.7)' : '#5a85aa' }} />
                    <span style={{ color: plan.isPopular ? 'rgba(255,255,255,0.85)' : '#1a3a5c' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full justify-center text-sm font-semibold py-3 rounded-xl transition-all',
                    plan.isPopular
                      ? 'bg-white text-[#1a3a5c] border-transparent hover:bg-[#eef7fd]'
                      : 'bg-transparent text-[#1a3a5c] border-[#c3dff2] hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c]'
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="text-xs text-center mt-3"
                  style={{ color: plan.isPopular ? 'rgba(255,255,255,0.35)' : '#5a85aa' }}>
                  {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
