import { Nav } from '@/components/ui/Nav'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#d6eaf8]">
      <Nav />
      {children}
    </div>
  )
}
