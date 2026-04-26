"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Mail, MessageSquare, Phone } from "lucide-react";
import BackButton from "@/components/BackButton";
import MenuRow from "@/components/MenuRow";
import HintSheet from "@/components/HintSheet";
import { Toast, useToast } from "@/components/Toast";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function SupportPage() {
  const [ticketOpen, setTicketOpen] = useState(false);
  const { message, showToast } = useToast();

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-12">
      <div className="px-5 pt-5">
        <BackButton />
      </div>
      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] uppercase text-ink px-5 pt-6 pb-4 leading-none"
      >
        Contact support
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-mint inline-flex items-center justify-center shrink-0">
            <Headphones size={24} className="text-mint-deep" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-semibold text-ink leading-tight">
              We&rsquo;re here to help
            </div>
            <p className="text-[13px] text-ink-70 mt-0.5">
              Average response time: 4 minutes
            </p>
          </div>
        </div>
      </motion.section>

      {/* Open tickets */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-6"
      >
        <h2
          className="text-[11px] font-semibold text-ink-40 uppercase pb-2"
          style={{ letterSpacing: "0.08em" }}
        >
          Open tickets
        </h2>
        <button
          type="button"
          onClick={() => setTicketOpen(true)}
          className="w-full bg-cream-2 active:bg-cream-3 rounded-[14px] flex items-center gap-3 px-4 py-3.5 text-left"
        >
          <span className="w-2 h-2 rounded-full bg-orange shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-ink leading-tight">
              Ticket #2024-1185 · Verification
            </div>
            <div className="text-[12px] text-ink-70 mt-0.5">Updated 2h ago</div>
          </div>
          <span className="text-[18px] text-ink-40">›</span>
        </button>
      </motion.section>

      {/* Contact methods */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.12 }}
        className="px-5 pt-6"
      >
        <h2
          className="text-[11px] font-semibold text-ink-40 uppercase pb-2"
          style={{ letterSpacing: "0.08em" }}
        >
          Contact methods
        </h2>
        <div className="bg-cream-2 rounded-[14px] overflow-hidden">
          <MenuRow
            icon={<MessageSquare size={22} strokeWidth={1.75} />}
            label="Live chat"
            sublabel="Available 9:00–22:00 CET"
            onClick={() => showToast("Live chat opens — prototype")}
          />
          <MenuRow
            icon={<Mail size={22} strokeWidth={1.75} />}
            label="Email us"
            sublabel="support@venga.com"
            href="mailto:support@venga.com"
          />
          <MenuRow
            icon={<Phone size={22} strokeWidth={1.75} />}
            label="Call us"
            sublabel="+34 900 ••• ••• (Mon–Fri)"
            href="tel:+34900000000"
            isLast
          />
        </div>
      </motion.section>

      <HintSheet
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title="Ticket #2024-1185"
        body={
          <p>
            Ticket detail and chat thread will open here in a future release. For now you can email <strong>support@venga.com</strong> referencing the ticket number.
          </p>
        }
      />

      <Toast message={message} />
    </div>
  );
}
