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
