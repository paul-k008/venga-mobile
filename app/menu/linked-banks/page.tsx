"use client";

import { useState } from "react";
import { Landmark, Plus } from "lucide-react";
import SettingsListScreen from "@/components/screens/SettingsListScreen";
import HintSheet from "@/components/HintSheet";
import { Toast, useToast } from "@/components/Toast";
import { LINKED_BANKS } from "@/lib/mocks";

export default function LinkedBanksPage() {
  const [actionsFor, setActionsFor] = useState<{ bank: string; last4: string } | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const { message, showToast } = useToast();

  const rows = LINKED_BANKS.map((b) => ({
    icon: <Landmark size={22} strokeWidth={1.75} />,
    label: b.bank,
    sublabel: `•••• ${b.last4}`,
    onClick: () => setActionsFor({ bank: b.bank, last4: b.last4 }),
    badge: b.primary ? (
      <span className="inline-flex items-center h-6 px-2 rounded-pill bg-mint text-mint-deep text-[11px] font-semibold uppercase tracking-wide">
        Primary
      </span>
    ) : undefined,
  }));

  return (
    <>
      <SettingsListScreen
        title="Linked banks"
        sections={[{ rows }]}
        footer={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="w-full h-14 rounded-pill bg-cream-2 inline-flex items-center justify-center gap-2 text-ink font-semibold text-[14px]"
            style={{ borderStyle: "dashed", borderWidth: 1, borderColor: "var(--hair)" }}
          >
            <Plus size={16} />
            Add another bank
          </button>
        }
      />

      <HintSheet
        open={!!actionsFor}
        onClose={() => setActionsFor(null)}
        title={actionsFor ? `${actionsFor.bank} •••• ${actionsFor.last4}` : ""}
        body={
          <div className="flex flex-col gap-2 mt-1">
            <button
              type="button"
              onClick={() => {
                setActionsFor(null);
                showToast("Set as primary");
              }}
              className="h-11 rounded-pill bg-cream-2 active:bg-cream-3 text-[14px] font-semibold text-ink"
            >
              Set as primary
            </button>
            <button
              type="button"
              onClick={() => {
                setActionsFor(null);
                showToast("Account removed");
              }}
              className="h-11 rounded-pill bg-red-tint text-red text-[14px] font-semibold"
            >
              Remove account
            </button>
          </div>
        }
      />

      <HintSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add a bank"
        body={
          <p>
            Linking new banks via SEPA mandate is coming soon. For now you can deposit from any bank account in the SEPA zone using Venga&rsquo;s IBAN — see Deposit → Bank transfer.
          </p>
        }
      />

      <Toast message={message} />
    </>
  );
}
