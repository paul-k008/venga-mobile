"use client";

import { useState } from "react";
import RadioListScreen from "@/components/screens/RadioListScreen";
import HintSheet from "@/components/HintSheet";

const OPTIONS = [
  { value: "light",  label: "Light",  sublabel: "Cream theme" },
  { value: "dark",   label: "Dark",   sublabel: "Coming soon" },
  { value: "system", label: "System", sublabel: "Match device setting" },
];

export default function AppearancePage() {
  const [value, setValue] = useState("system");
  const [darkOpen, setDarkOpen] = useState(false);

  return (
    <>
      <RadioListScreen
        title="Appearance"
        options={OPTIONS}
        value={value}
        onChange={(v) => {
          if (v === "dark") {
            setDarkOpen(true);
            return;
          }
          setValue(v);
        }}
      />
      <HintSheet
        open={darkOpen}
        onClose={() => setDarkOpen(false)}
        title="Dark mode is on its way"
        body={
          <p>
            Dark mode is in design and will land in a future release. Stay on Light or System for now.
          </p>
        }
      />
    </>
  );
}
