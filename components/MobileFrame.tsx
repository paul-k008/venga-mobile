export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen-d w-full bg-cream-3 flex justify-center">
      <div className="relative w-full max-w-mobile min-h-screen-d bg-cream shadow-[0_0_40px_rgba(14,17,22,0.06)]">
        {children}
      </div>
    </div>
  );
}
