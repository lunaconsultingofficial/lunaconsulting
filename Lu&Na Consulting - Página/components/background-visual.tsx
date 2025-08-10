// Static CSS-only background to prevent build hanging during SSR
export default function BackgroundVisual() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0b1411]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),transparent_60%)]" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px'
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-32 -translate-y-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 translate-x-16 translate-y-8 w-80 h-80 bg-emerald-600/8 rounded-full blur-3xl" />
    </div>
  )
}
