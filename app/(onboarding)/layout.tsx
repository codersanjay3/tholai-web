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
