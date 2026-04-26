import DocumentScreen, { DocSection } from "@/components/screens/DocumentScreen";

const OSS = [
  { name: "Next.js",        version: "14.2.5", author: "Vercel"             },
  { name: "React",          version: "18.3.1", author: "Meta"               },
  { name: "Tailwind CSS",   version: "3.4.4",  author: "Tailwind Labs"      },
  { name: "Framer Motion",  version: "11.0.0", author: "Framer"             },
  { name: "Lucide Icons",   version: "0.378",  author: "Lucide contributors" },
  { name: "Zustand",        version: "4.5.4",  author: "pmndrs"             },
];

export default function LicencesPage() {
  return (
    <DocumentScreen title="Licences" lastUpdated="1 March 2026">
      <DocSection heading="Banco de España">
        <p>
          Venga Europe S.L. is registered with the Bank of Spain as a virtual currency
          exchange and custody provider (registry no. <strong>VBC-0042</strong>) under Law
          10/2010 on the prevention of money laundering and the financing of terrorism.
        </p>
      </DocSection>

      <DocSection heading="Polish FIU">
        <p>
          Venga Polska sp. z o.o. is registered with the Polish Financial Information Unit
          as a virtual currency activity provider (registry no.{" "}
          <strong>RDWW-118</strong>).
        </p>
      </DocSection>

      <DocSection heading="MiCA compliance">
        <p>
          Venga is preparing CASP authorisation under the EU Markets in Crypto-Assets
          regulation (MiCA). Until our application is granted, we operate under the
          national registrations listed above, with the same EU consumer-protection
          standards.
        </p>
      </DocSection>

      <DocSection heading="Open-source licences">
        <p>
          Venga is built on excellent open-source software. The libraries below are bundled
          in this app under their respective licences:
        </p>
        <ul className="mt-2 bg-cream-2 rounded-[14px] overflow-hidden">
          {OSS.map((o, i) => (
            <li
              key={o.name}
              className={`flex items-center justify-between px-4 py-3 ${
                i < OSS.length - 1 ? "border-b border-hair" : ""
              }`}
            >
              <span className="text-[14px] font-semibold text-ink">{o.name}</span>
              <span className="text-[12px] text-ink-70 font-nums">
                {o.version} · {o.author}
              </span>
            </li>
          ))}
        </ul>
      </DocSection>
    </DocumentScreen>
  );
}
