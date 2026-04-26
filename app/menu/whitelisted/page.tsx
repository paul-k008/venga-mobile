"use client";

import { useState } from "react";
import SettingsListScreen from "@/components/screens/SettingsListScreen";
import HintSheet from "@/components/HintSheet";
import { Toast, useToast } from "@/components/Toast";
import { CoinIcon } from "@/components/icons";
import { iconVarFor, WHITELISTED_ADDRESSES, type WhitelistedAddress } from "@/lib/mocks";

function shorten(addr: string): string {
  if (addr.length <= 14) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-6)}`;
}

export default function WhitelistedPage() {
  const [active, setActive] = useState<WhitelistedAddress | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const { message, showToast } = useToast();

  const rows = WHITELISTED_ADDRESSES.map((w) => ({
    icon: <CoinIcon variant={iconVarFor(w.symbol)} size={28} />,
    label: w.label,
    sublabel: shorten(w.address),
    onClick: () => setActive(w),
  }));

  return (
    <>
      <SettingsListScreen
        title="Whitelisted"
        intro="Whitelisted addresses can receive withdrawals immediately. Non-whitelisted addresses require a 24-hour security delay."
        sections={[{ rows }]}
        footer={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="w-full h-14 rounded-pill bg-orange text-white font-semibold text-[15px]"
          >
            Add new address
          </button>
        }
      />

      <HintSheet
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.label ?? ""}
        body={
          <div>
            <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
              {active?.symbol} address
            </div>
            <div className="mt-1.5 text-[13px] font-nums break-all text-ink leading-snug">
              {active?.address}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="button"
                onClick={async () => {
                  if (active) {
                    try {
                      await navigator.clipboard?.writeText(active.address);
                    } catch {
                      // ignore
                    }
                  }
                  setActive(null);
                  showToast("Address copied");
                }}
                className="h-11 rounded-pill bg-cream-2 active:bg-cream-3 text-[14px] font-semibold text-ink"
              >
                Copy address
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(null);
                  showToast("Address removed");
                }}
                className="h-11 rounded-pill bg-red-tint text-red text-[14px] font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        }
      />

      <HintSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add new address"
        body={
          <p>
            Address whitelisting requires email confirmation. The full add-address flow is coming in a future release.
          </p>
        }
      />

      <Toast message={message} />
    </>
  );
}
