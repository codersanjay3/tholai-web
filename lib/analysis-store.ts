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
