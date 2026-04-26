import BackButton from "./BackButton";

export default function AppScreen({
  title,
  children,
  showBack = true,
}: {
  title?: string;
  children: React.ReactNode;
  showBack?: boolean;
}) {
  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      {showBack && (
        <div className="px-5 pt-5">
          <BackButton />
        </div>
      )}
      {title && (
        <h1 className="font-display text-[44px] text-ink px-5 pt-6 pb-4 leading-none">
          {title}
        </h1>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
