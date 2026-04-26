"use client";

import { useState } from "react";
import RadioListScreen from "@/components/screens/RadioListScreen";
import { Toast, useToast } from "@/components/Toast";

const OPTIONS = [
  { value: "EUR", label: "Euro",            sublabel: "€ EUR" },
  { value: "USD", label: "US Dollar",       sublabel: "$ USD" },
  { value: "GBP", label: "British Pound",   sublabel: "£ GBP" },
  { value: "CHF", label: "Swiss Franc",     sublabel: "CHF"   },
  { value: "PLN", label: "Polish Złoty",    sublabel: "zł PLN" },
];

export default function CurrencyPage() {
  const [value, setValue] = useState("EUR");
  const { message, showToast } = useToast();

  return (
    <>
      <RadioListScreen
        title="Currency"
        options={OPTIONS}
        value={value}
        onChange={(v) => {
          setValue(v);
          const opt = OPTIONS.find((o) => o.value === v);
          showToast(`Display currency: ${opt?.label ?? v}`);
        }}
      />
      <Toast message={message} />
    </>
  );
}
