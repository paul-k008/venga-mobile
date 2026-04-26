import BottomTabBar from "@/components/BottomTabBar";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-cream">
      <main className="flex-1 pb-2">{children}</main>
      <BottomTabBar />
    </div>
  );
}
