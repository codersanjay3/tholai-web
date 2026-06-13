import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      {children}
    </PageWrapper>
  )
}
