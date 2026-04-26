"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Back"
      onClick={() => router.back()}
      className="w-11 h-11 rounded-full bg-cream flex items-center justify-center"
      style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
    >
      <ChevronLeft size={22} strokeWidth={2} className="text-ink" />
    </button>
  );
}
