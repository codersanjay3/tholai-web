import { Nav } from '@/components/ui/Nav'
import { BackgroundPaths } from '@/components/ui/background-paths'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#d6eaf8]" style={{ position: 'relative' }}>
      {/* Full-page animated line background */}
      <BackgroundPaths />
      {/* Content sits above the paths */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        {children}
      </div>
    </div>
  )
}
