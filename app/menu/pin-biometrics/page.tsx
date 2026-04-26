"use client";

import TogglesScreen from "@/components/screens/TogglesScreen";
import { Toast, useToast } from "@/components/Toast";

export default function PinBiometricsPage() {
  const { message, showToast } = useToast();

  return (
    <>
      <TogglesScreen
        title="PIN & biometrics"
        sections={[
          {
            label: "Authentication",
            items: [
              {
                key: "pin",
                label: "App PIN",
                description: "Required to open Venga (always on)",
                fixedOn: true,
              },
              {
                key: "faceid",
                label: "Face ID",
                description: "Unlock with your face",
                defaultChecked: true,
              },
              {
                key: "autolock",
                label: "Auto-lock after 1 min",
                description: "Lock the app when idle",
                defaultChecked: true,
              },
            ],
          },
        ]}
        footer={
          <div className="bg-cream-2 rounded-[14px] overflow-hidden">
            <button
              type="button"
              onClick={() => showToast("Open Change PIN flow — prototype")}
              className="w-full px-4 py-3.5 text-left flex items-center justify-between"
            >
              <span className="text-[15px] font-semibold text-ink">Change PIN</span>
              <span className="text-[18px] text-ink-40">›</span>
            </button>
          </div>
        }
      />
      <Toast message={message} />
    </>
  );
}
