export interface OnboardingData {
  goals:       string[]
  budget:      string
  age:         number
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
