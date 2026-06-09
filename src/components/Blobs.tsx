type BlobsProps = {
  tone?: 'light' | 'dark'
  className?: string
}

// Halos verts très diffus qui dérivent lentement — lumière douce, discrète.
export default function Blobs({ tone = 'light', className = '' }: BlobsProps) {
  const op = tone === 'dark' ? 'opacity-40' : 'opacity-[0.16]'
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute -top-[12%] -left-[6%] h-[44vw] w-[44vw] max-h-[600px] max-w-[600px] rounded-full blur-[100px] animate-blob-a ${op}`}
        style={{ background: 'radial-gradient(circle at 35% 35%, #16745A, transparent 70%)' }}
      />
      <div
        className={`absolute top-[24%] right-[-8%] h-[40vw] w-[40vw] max-h-[540px] max-w-[540px] rounded-full blur-[110px] animate-blob-b ${op}`}
        style={{ background: 'radial-gradient(circle at 50% 50%, #11998E, transparent 70%)' }}
      />
      <div
        className={`absolute bottom-[-14%] left-[28%] h-[36vw] w-[36vw] max-h-[480px] max-w-[480px] rounded-full blur-[110px] animate-blob-a ${tone === 'dark' ? 'opacity-30' : 'opacity-[0.10]'}`}
        style={{ background: 'radial-gradient(circle at 50% 50%, #4FA288, transparent 70%)' }}
      />
    </div>
  )
}
