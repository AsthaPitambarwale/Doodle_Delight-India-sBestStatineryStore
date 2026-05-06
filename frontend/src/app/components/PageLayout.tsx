export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise overlay (gives premium feel) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}