import AppScreen from "./AppScreen";

export default function StubScreen({
  title,
  showBack = true,
}: {
  title: string;
  showBack?: boolean;
}) {
  return (
    <AppScreen title={title} showBack={showBack}>
      <div className="flex items-center justify-center px-8 py-20">
        <p className="text-ink-70 text-[15px] text-center">
          This screen ships in the next iteration.
        </p>
      </div>
    </AppScreen>
  );
}
