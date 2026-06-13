export function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`min-h-screen bg-[#d6eaf8] ${className}`}>
      <div className="max-w-[1100px] mx-auto px-4 py-6">
        {children}
      </div>
    </main>
  )
}
