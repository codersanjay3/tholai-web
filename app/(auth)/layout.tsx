import { Nav } from '@/components/ui/Nav'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Nav />
      <div className="flex justify-center mt-8">{children}</div>
    </PageWrapper>
  )
}
