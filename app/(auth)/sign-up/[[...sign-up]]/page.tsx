import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      forceRedirectUrl="/scan/photo"
      appearance={{
        variables: {
          colorPrimary:         '#1a3a5c',
          colorBackground:      '#ffffff',
          colorForeground:      '#1a3a5c',
          colorNeutral:         '#7aabcf',
          colorInput:           '#ffffff',
          colorInputForeground: '#1a3a5c',
          borderRadius:         '12px',
          fontFamily:           "'DM Sans', sans-serif",
        },
        elements: {
          card:              'shadow-none border border-[#c3dff2] rounded-[20px]',
          headerTitle:       "font-['Cormorant_Garamond'] text-3xl font-bold",
          formButtonPrimary: 'bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white',
        },
      }}
    />
  )
}
