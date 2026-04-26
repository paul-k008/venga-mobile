export default function MenuSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <h2
        className="text-[11px] text-ink-40 font-semibold pt-6 pb-3 uppercase"
        style={{ letterSpacing: "0.08em" }}
      >
        {label}
      </h2>
      <div className="bg-cream-2 rounded-md overflow-hidden">{children}</div>
    </section>
  );
}
