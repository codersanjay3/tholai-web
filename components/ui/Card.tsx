export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-[20px] p-6 ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(30,100,180,0.07)' }}
    >
      {children}
    </div>
  )
}
