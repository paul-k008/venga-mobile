"use client";

import { useState } from "react";
import RadioListScreen from "@/components/screens/RadioListScreen";
import { Toast, useToast } from "@/components/Toast";

const OPTIONS = [
  { value: "en", label: "English",    sublabel: "English"     },
  { value: "es", label: "Spanish",    sublabel: "Español"     },
  { value: "ca", label: "Catalan",    sublabel: "Català"      },
  { value: "pl", label: "Polish",     sublabel: "Polski"      },
  { value: "fr", label: "French",     sublabel: "Français"    },
  { value: "it", label: "Italian",    sublabel: "Italiano"    },
  { value: "de", label: "German",     sublabel: "Deutsch"     },
  { value: "pt", label: "Portuguese", sublabel: "Português"   },
];

export default function LanguagePage() {
  const [value, setValue] = useState("en");
  const { message, showToast } = useToast();

  return (
    <>
      <RadioListScreen
        title="Language"
        options={OPTIONS}
        value={value}
        onChange={(v) => {
          setValue(v);
          const opt = OPTIONS.find((o) => o.value === v);
          showToast(`Language updated to ${opt?.label ?? v}`);
        }}
      />
      <Toast message={message} />
    </>
  );
}
