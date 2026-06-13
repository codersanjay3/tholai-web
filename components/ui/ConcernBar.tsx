export function ConcernBar({ label, severity }: { label: string; severity: number }) {
  const pct = Math.round((severity / 10) * 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#1a3a5c] font-medium">{label}</span>
        <span className="text-[#7aabcf]">{severity}/10</span>
      </div>
      <div className="h-2 bg-[#eef7fd] rounded-full overflow-hidden">
        <div className="h-2 bg-[#1a3a5c] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
