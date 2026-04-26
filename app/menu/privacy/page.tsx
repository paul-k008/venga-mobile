import DocumentScreen, { DocSection } from "@/components/screens/DocumentScreen";

export default function PrivacyPage() {
  return (
    <DocumentScreen title="Privacy Policy" lastUpdated="1 March 2026">
      <DocSection heading="What we collect">
        <p>
          To open and operate your account we collect: identifying information (name, date
          of birth, address, ID document), contact details (email, phone), device and
          session metadata, and on-chain transaction data linked to your account.
        </p>
      </DocSection>

      <DocSection heading="How we use data">
        <p>
          We use this data to provide the service, satisfy regulatory obligations
          (KYC/AML), prevent fraud, and improve the product. We do not sell your data.
        </p>
        <p>
          Marketing communications are opt-in. You can manage them in Menu &rarr;
          Notifications.
        </p>
      </DocSection>

      <DocSection heading="Cookies">
        <p>
          The Venga web app uses essential cookies for authentication and a small set of
          analytics cookies to measure feature use. You can disable analytics cookies from
          the cookie banner shown at first visit.
        </p>
      </DocSection>

      <DocSection heading="Data sharing">
        <p>
          We share data with regulated counterparties (banks, payment processors, KYC
          providers) where necessary to deliver the service, and with public authorities
          when required by law. Each counterparty operates under contracts that protect
          your data.
        </p>
      </DocSection>

      <DocSection heading="Your rights">
        <p>
          Under GDPR you have the right to access, correct, delete, and port your personal
          data, and to object to certain processing. Email{" "}
          <strong>privacy@venga.com</strong> to exercise these rights.
        </p>
      </DocSection>

      <DocSection heading="Retention">
        <p>
          We keep account data for as long as your account is open, plus the retention
          periods required by applicable financial regulation (typically 5–10 years after
          account closure).
        </p>
      </DocSection>

      <DocSection heading="Contact">
        <p>
          Questions about privacy? Email <strong>privacy@venga.com</strong> or reach our DPO
          at <strong>dpo@venga.com</strong>.
        </p>
      </DocSection>
    </DocumentScreen>
  );
}
