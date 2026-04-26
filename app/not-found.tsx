import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen-d w-full bg-cream flex flex-col items-center justify-center px-8 text-center">
      <div className="w-14 h-14 rounded-full bg-cream-2 inline-flex items-center justify-center">
        <Compass size={28} className="text-ink" />
      </div>
      <h1 className="font-display text-[24px] uppercase text-ink mt-5">
        Page not found
      </h1>
      <p
        className="text-[15px] text-ink-70 mt-2 max-w-[320px]"
        style={{ lineHeight: 1.5 }}
      >
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 h-12 px-6 rounded-pill bg-orange active:bg-orange-deep text-white font-semibold text-[15px] inline-flex items-center justify-center"
      >
        Go home
      </Link>
    </div>
  );
}
