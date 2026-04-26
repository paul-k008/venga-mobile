"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import SettingsListScreen from "@/components/screens/SettingsListScreen";
import ConfirmModal from "@/components/ConfirmModal";
import { Toast, useToast } from "@/components/Toast";
import { LOGIN_SESSIONS } from "@/lib/mocks";

function deviceIcon(device: string) {
  if (/MacBook|Chrome|Mac|Windows/i.test(device)) {
    return <Monitor size={20} strokeWidth={1.75} />;
  }
  return <Smartphone size={20} strokeWidth={1.75} />;
}

export default function LoginHistoryPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionFor, setActionFor] = useState<string | null>(null);
  const { message, showToast } = useToast();

  const rows = LOGIN_SESSIONS.map((s) => ({
    icon: deviceIcon(s.device),
    label: s.device,
    sublabel: `${s.location} · ${s.when}`,
    onClick: () => {
      if (s.unrecognized) setActionFor(s.id);
    },
    badge: s.current ? (
      <span className="inline-flex items-center h-6 px-2 rounded-pill bg-mint text-mint-deep text-[11px] font-semibold uppercase tracking-wide">
        This device
      </span>
    ) : s.unrecognized ? (
      <span className="inline-flex items-center h-6 px-2 rounded-pill bg-red-tint text-red text-[11px] font-semibold uppercase tracking-wide">
        Unrecognized
      </span>
    ) : undefined,
  }));

  return (
    <>
      <SettingsListScreen
        title="Login history"
        sections={[{ rows }]}
        footer={
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="w-full h-12 rounded-pill bg-cream-2 active:bg-cream-3 text-ink-70 font-semibold text-[14px]"
          >
            Sign out from all other devices
          </button>
        }
      />

      <ConfirmModal
        open={confirmOpen}
        title="Sign out from other devices?"
        description="This signs out everywhere except this device. You'll stay signed in here."
        confirmLabel="Sign out"
        destructive
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          showToast("Signed out elsewhere");
        }}
      />

      <ConfirmModal
        open={!!actionFor}
        title="Sign out this device?"
        description="If you don't recognize this session, sign it out and change your password right away."
        confirmLabel="Sign out"
        destructive
        onCancel={() => setActionFor(null)}
        onConfirm={() => {
          setActionFor(null);
          showToast("Session signed out");
        }}
      />

      <Toast message={message} />
    </>
  );
}
