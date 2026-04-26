"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // surface the error to the dev console; no analytics in this prototype
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  const truncated =
    error.message.length > 80 ? `${error.message.slice(0, 77)}…` : error.message;

  return (
    <div className="min-h-screen-d w-full bg-cream flex flex-col items-center justify-center px-8 text-center">
      <div className="w-14 h-14 rounded-full bg-red-tint inline-flex items-center justify-center">
        <AlertCircle size={28} className="text-red" />
      </div>
      <h1 className="font-display text-[24px] uppercase text-ink mt-5">
        Something broke
      </h1>
      <p
        className="text-[15px] text-ink-70 mt-2 max-w-[320px]"
        style={{ lineHeight: 1.5 }}
      >
        We hit an unexpected error. Try again or go back home.
      </p>
      {truncated && (
        <p className="mt-3 text-[12px] text-ink-40 font-nums max-w-[320px] break-words">
          {truncated}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 w-full max-w-[320px]">
        <button
          type="button"
          onClick={reset}
          className="h-12 rounded-pill bg-orange active:bg-orange-deep text-white font-semibold text-[15px]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="h-12 rounded-pill bg-cream-2 active:bg-cream-3 text-ink font-semibold text-[15px] inline-flex items-center justify-center"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
