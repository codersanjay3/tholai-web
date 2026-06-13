'use client'

import { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PhotoPage() {
  const router    = useRouter()
  const videoRef  = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef   = useRef<HTMLInputElement>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoRef.current) { videoRef.current.srcObject = stream; setStreaming(true) }
    } catch {
      alert('Camera access denied. Please upload a photo instead.')
    }
  }, [])

  const capture = useCallback(() => {
    const v = videoRef.current; const c = canvasRef.current
    if (!v || !c) return
    c.width = v.videoWidth; c.height = v.videoHeight
    c.getContext('2d')!.drawImage(v, 0, 0)
    setPreview(c.toDataURL('image/jpeg', 0.9))
    ;(v.srcObject as MediaStream)?.getTracks().forEach(t => t.stop())
    setStreaming(false)
  }, [])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const proceed = useCallback(() => {
    if (!preview) return
    sessionStorage.setItem('tholai_photo', preview)
    router.push('/scan/analyzing')
  }, [preview, router])

  return (
    <Card className="max-w-[560px] mx-auto text-center">
      <h2 className="font-['Cormorant_Garamond'] text-[36px] font-bold text-[#1a3a5c] mb-2">
        Scan your skin
      </h2>
      <p className="text-sm text-[#7aabcf] mb-8">
        Take a photo or upload one. Good lighting gives the best results.
      </p>

      <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-6 rounded-2xl overflow-hidden bg-[#eef7fd]">
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
        {!preview && !streaming && (
          <div className="absolute inset-0 flex items-center justify-center text-[#7aabcf] text-sm">
            Camera preview
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col gap-3">
        {!preview && !streaming && (
          <>
            <Button size="lg" onClick={startCamera}>Use camera</Button>
            <Button size="lg" variant="outline" onClick={() => fileRef.current?.click()}>Upload photo</Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </>
        )}
        {streaming && <Button size="lg" onClick={capture}>Take photo</Button>}
        {preview && (
          <>
            <Button size="lg" onClick={proceed}>Use this photo →</Button>
            <Button size="lg" variant="outline" onClick={() => setPreview(null)}>Retake</Button>
          </>
        )}
      </div>
    </Card>
  )
}
