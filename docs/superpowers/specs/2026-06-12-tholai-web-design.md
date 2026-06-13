# tholai Web App — Design Spec

## Overview

tholai is an AI-powered skincare web app. Users complete a short questionnaire, create a free account (Clerk), scan their face via webcam or file upload, receive an AI-generated skin profile, and get a personalised AM/PM routine + product recommendations. Progress is tracked via weekly photo check-ins and a Glow Score.

This spec covers the full v1 web app — a complete port from the Expo mobile app to a Next.js 16 web app.

---

## Architecture

**Framework:** Next.js 16 App Router (Next.js 16.2.9)  
**Auth:** Clerk (`app_3F3htG8zFfK06fTCEKKNuV7XVY2`)  
**Database:** Supabase (existing project — `skin_profiles`, `users` tables, `analyze-face` edge function)  
**Hosting:** Vercel  
**Language:** TypeScript (strict)  
**Styling:** Tailwind CSS + custom CSS variables  

**Route groups:**
```
app/
  (marketing)/          → / (landing page)
  (onboarding)/         → /onboarding/goals, /onboarding/budget, /onboarding/basics
  (auth)/               → /sign-in/[[...sign-in]], /sign-up/[[...sign-up]]
  (scan)/               → /scan/photo, /scan/analyzing, /scan/results
  (dashboard)/          → /dashboard, /dashboard/routine, /dashboard/products, /dashboard/progress
  api/
    onboarding/         → POST — save questionnaire answers to Supabase after signup
    analyze/            → POST — proxy to Supabase analyze-face edge function
```

**Onboarding data flow:**
1. User answers Goals → Budget → Basics questionnaire (localStorage)
2. Clerk SignUp completes → webhook or redirect triggers `/api/onboarding` POST
3. `/api/onboarding` writes user row + preferences to Supabase `users` table using Clerk user ID as foreign key
4. User is sent to `/scan/photo`

**Auth protection:**
- `proxy.ts` (Next.js 16) protects `/scan/*` and `/dashboard/*` — redirect to `/sign-in` if unauthenticated
- `/` and `/onboarding/*` are public (value before auth)

---

## Design System

**Colors (baby blue + white, no other hues):**
```css
--bg:        #d6eaf8   /* baby blue page background */
--surface:   #ffffff   /* white cards, nav, panels */
--text:      #1a3a5c   /* deep navy — primary text */
--muted:     #7aabcf   /* muted blue — secondary text, labels */
--border:    #c3dff2   /* soft blue border */
--hover:     #eef7fd   /* ultra-light blue hover state */
```

**Typography:**
- Display / headings: Cormorant Garamond (Google Fonts, weights 400/600/700)
- Body / UI: DM Sans (Google Fonts, weights 300/400/500/600)

**Component conventions:**
- All pages use `<PageWrapper>` — centers content, applies bg, max-width 1100px
- Cards: white surface, `border-radius: 20px`, `box-shadow: 0 4px 24px rgba(30,100,180,0.07)`
- Buttons: `--text` background, white text, `border-radius: 12px`, 14px/600 DM Sans
- Inputs: white bg, `--border` border 1.5px, `--text` text, 14px DM Sans

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing — logo mark, tagline "Your skin, understood.", feature pills, CTA → `/onboarding/goals` |
| `/onboarding/goals` | Multi-select: Acne, Hydration, Anti-aging, Brightening, Sensitivity, Pores. Next → `/onboarding/budget` |
| `/onboarding/budget` | Monthly budget range picker: Under $30 / $30–$75 / $75–$150 / $150+. Next → `/onboarding/basics` |
| `/onboarding/basics` | Age range (teens/20s/30s/40s/50s+) + skin sensitivity (5-point scale). Next → `/sign-up` |
| `/sign-up/[[...sign-up]]` | Clerk `<SignUp>` component styled to match palette |
| `/sign-in/[[...sign-in]]` | Clerk `<SignIn>` component styled to match palette |
| `/scan/photo` | Webcam capture (MediaDevices API) OR file upload. Preview + "Use this photo" button |
| `/scan/analyzing` | Spinning ring animation + status text while `/api/analyze` runs |
| `/scan/results` | Skin type badge, concern severity bars, hydration %, analysis summary, "Go to dashboard" CTA |
| `/dashboard` | Glow Score ring, last scan date, quick-action cards (Routine, Products, Progress, Re-scan) |
| `/dashboard/routine` | AM + PM step cards generated from last skin analysis |
| `/dashboard/products` | Recommended product cards with affiliate link placeholders |
| `/dashboard/progress` | Weekly check-in photo upload, Glow Score history chart (Chart.js) |

---

## API Routes

**POST `/api/onboarding`**
- Auth: Clerk `auth()` (server-side)
- Body: `{ goals: string[], budget: string, ageRange: string, sensitivity: number }`
- Action: upsert into Supabase `users` table with Clerk userId as pk

**POST `/api/analyze`**  
- Auth: Clerk `auth()`
- Body: `{ imageBase64: string, mimeType: string }`
- Action: forward to Supabase `analyze-face` edge function, return analysis JSON, insert into `skin_profiles`

---

## Supabase Schema (existing, no changes)

```sql
users (id text PK, email text, subscription_tier text, goals jsonb, budget text, age_range text, sensitivity int)
skin_profiles (id uuid PK, user_id text FK→users.id, skin_type text, concerns jsonb, hydration_estimate int, analysis_summary text, created_at timestamptz)
```

---

## Clerk Setup

- App ID: `app_3F3htG8zFfK06fTCEKKNuV7XVY2`
- After signup redirect: `/scan/photo`
- After signin redirect: `/dashboard`
- Appearance: custom CSS variables to match baby blue palette
- `proxy.ts` matcher includes `'/__clerk/:path*'`
