export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="w-full h-1 bg-[#c3dff2] rounded-full mb-8">
      <div
        className="h-1 bg-[#1a3a5c] rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
