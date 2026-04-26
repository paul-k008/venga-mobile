"use client";

import { useState } from "react";
import {
  User,
  BadgeCheck,
  Landmark,
  Fingerprint,
  ShieldCheck,
  History,
  ListChecks,
  Bell,
  Languages,
  CircleDollarSign,
  SunMoon,
  LifeBuoy,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  FileText,
  Lock,
  Scale,
  LogOut,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import ProfileCard from "@/components/ProfileCard";
import MenuSection from "@/components/MenuSection";
import MenuRow, { StatusDot } from "@/components/MenuRow";
import ConfirmModal from "@/components/ConfirmModal";
import { toast } from "@/lib/toastStore";
import { useTradeStore } from "@/lib/tradeStore";
import { useEarnStore } from "@/lib/earnStore";
import { STAKED_POSITIONS_LOCAL } from "@/lib/mocks";

export default function MenuPage() {
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const onResetPrototype = () => {
    setResetOpen(false);
    // clear trade + earn stores
    useTradeStore.getState().reset();
    useEarnStore.getState().reset();
    // clear in-memory created stake positions
    STAKED_POSITIONS_LOCAL.length = 0;
    // wipe per-asset compliance acks (used by /deposit/asset/[symbol])
    try {
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith("venga.compliance.")) keys.push(k);
      }
      keys.forEach((k) => window.localStorage.removeItem(k));
    } catch {
      // ignore
    }
    toast.success("Prototype reset");
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <div className="px-5 pt-5">
        <BackButton />
      </div>

      <h1 className="font-display text-[44px] text-ink px-5 pt-6 pb-4 leading-none">
        Menu
      </h1>
      <div className="h-px bg-hair mx-5" />

      <ProfileCard />

      <MenuSection label="Account">
        <MenuRow icon={<User size={22} strokeWidth={1.75} />} label="Personal info" href="/menu/personal-info" />
        <MenuRow
          icon={<BadgeCheck size={22} strokeWidth={1.75} />}
          label="Verification"
          value="Level 2"
          valueTone="mint"
          href="/menu/verification"
        />
        <MenuRow
          icon={<Landmark size={22} strokeWidth={1.75} />}
          label="Linked bank accounts"
          href="/menu/linked-banks"
          isLast
        />
      </MenuSection>

      <MenuSection label="Security">
        <MenuRow icon={<Fingerprint size={22} strokeWidth={1.75} />} label="PIN & biometrics" href="/menu/pin-biometrics" />
        <MenuRow
          icon={<ShieldCheck size={22} strokeWidth={1.75} />}
          label="Two-factor authentication"
          badge={<span className="inline-flex items-center gap-1.5 text-[13px] text-mint-deep font-semibold"><StatusDot color="mint" />On</span>}
          href="/menu/2fa"
        />
        <MenuRow icon={<History size={22} strokeWidth={1.75} />} label="Login history" href="/menu/login-history" />
        <MenuRow icon={<ListChecks size={22} strokeWidth={1.75} />} label="Whitelisted addresses" href="/menu/whitelisted" isLast />
      </MenuSection>

      <MenuSection label="Preferences">
        <MenuRow icon={<Bell size={22} strokeWidth={1.75} />} label="Notifications" href="/menu/notifications" />
        <MenuRow icon={<Languages size={22} strokeWidth={1.75} />} label="Language" value="English" href="/menu/language" />
        <MenuRow icon={<CircleDollarSign size={22} strokeWidth={1.75} />} label="Display currency" value="EUR" href="/menu/currency" />
        <MenuRow icon={<SunMoon size={22} strokeWidth={1.75} />} label="Appearance" value="System" href="/menu/appearance" isLast />
      </MenuSection>

      <MenuSection label="Support">
        <MenuRow
          icon={<LifeBuoy size={22} strokeWidth={1.75} />}
          label="Contact support"
          badge={<span className="inline-flex items-center gap-1.5 text-[13px] text-orange font-semibold"><StatusDot color="orange" />1 open</span>}
          href="/menu/support"
        />
        <MenuRow icon={<HelpCircle size={22} strokeWidth={1.75} />} label="Help Center" href="/menu/help-center" />
        <MenuRow icon={<AlertTriangle size={22} strokeWidth={1.75} />} label="Report a problem" href="/menu/report" />
        <MenuRow icon={<Sparkles size={22} strokeWidth={1.75} />} label="What's new" href="/menu/whats-new" isLast />
      </MenuSection>

      <MenuSection label="Legal">
        <MenuRow icon={<FileText size={22} strokeWidth={1.75} />} label="Terms of Service" href="/menu/terms" />
        <MenuRow icon={<Lock size={22} strokeWidth={1.75} />} label="Privacy Policy" href="/menu/privacy" />
        <MenuRow icon={<Scale size={22} strokeWidth={1.75} />} label="Licences & regulation" href="/menu/licences" isLast />
      </MenuSection>

      <div className="mt-8 px-5">
        <div className="bg-cream-2 rounded-md overflow-hidden">
          <MenuRow
            icon={<LogOut size={22} strokeWidth={1.75} />}
            label="Log out"
            onClick={() => setLogoutOpen(true)}
          />
          <MenuRow
            icon={<XCircle size={22} strokeWidth={1.75} />}
            label="Close account"
            onClick={() => setCloseOpen(true)}
            tone="destructive"
            isLast
          />
        </div>
      </div>

      {/* Demo helper — sits below destructive zone, separated visually */}
      <div className="mt-6 px-5">
        <div className="h-px bg-hair mb-6" />
        <div className="bg-cream-2 rounded-md overflow-hidden">
          <MenuRow
            icon={<RotateCcw size={22} strokeWidth={1.75} />}
            label="Reset prototype data"
            onClick={() => setResetOpen(true)}
            isLast
          />
        </div>
        <p className="mt-2 text-[12px] text-ink-40 px-1">
          Clears local stakes, trades, and preferences. Use before demoing.
        </p>
      </div>

      <p className="text-center text-ink-40 text-[12px] py-6">
        App Version 2.16.0 · Build 4821
      </p>

      <ConfirmModal
        open={logoutOpen}
        title="Log out of Venga?"
        description="You'll need to sign in again next time."
        confirmLabel="Log out"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          toast("Logged out (prototype)");
        }}
      />
      <ConfirmModal
        open={closeOpen}
        title="Close your account?"
        description="This is permanent. All balances and history will be lost."
        confirmLabel="Close account"
        destructive
        onCancel={() => setCloseOpen(false)}
        onConfirm={() => {
          setCloseOpen(false);
          toast.warning("Account closed (prototype)");
        }}
      />
      <ConfirmModal
        open={resetOpen}
        title="Reset prototype data?"
        description="Clears all local stakes, trades, and saved preferences. The mock starting state is restored."
        confirmLabel="Reset"
        onCancel={() => setResetOpen(false)}
        onConfirm={onResetPrototype}
      />
    </div>
  );
}
