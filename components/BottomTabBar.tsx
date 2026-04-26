"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeftRight, Wallet, Coins, LucideIcon } from "lucide-react";

type Tab = { href: string; label: string; icon: LucideIcon };

const TABS: Tab[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trade", label: "Trade", icon: ArrowLeftRight },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/earn", label: "Earn", icon: Coins },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 bg-cream pb-5 pt-2 px-3"
      style={{ boxShadow: "0 -4px 20px rgba(14,17,22,0.06)" }}
    >
      <ul className="flex items-stretch justify-between gap-1">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-pill transition-colors ${
                  active ? "bg-cream-3" : ""
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  className={active ? "text-orange" : "text-ink"}
                />
                <span
                  className={`text-[12px] text-ink ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
