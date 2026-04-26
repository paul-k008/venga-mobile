import DocumentScreen, { DocSection } from "@/components/screens/DocumentScreen";

export default function TermsPage() {
  return (
    <DocumentScreen title="Terms of Service" lastUpdated="1 March 2026">
      <DocSection heading="Acceptance of terms">
        <p>
          By creating a Venga account or using any Venga service, you agree to these terms.
          If you do not agree, please do not use the app.
        </p>
        <p>
          We may update these terms occasionally. When we do, we will notify you in-app
          and via email at least 30 days before the changes take effect.
        </p>
      </DocSection>

      <DocSection heading="Account requirements">
        <p>
          You must be at least 18 years old and a resident of an eligible country to open a
          Venga account. We may ask you to verify your identity at signup or any time after.
        </p>
        <p>
          You are responsible for keeping your sign-in credentials safe. Please enable
          biometric unlock and two-factor authentication in Menu &rarr; Security.
        </p>
      </DocSection>

      <DocSection heading="Permitted use">
        <p>
          Venga is a personal-use app for buying, selling, holding, and earning yield on
          supported crypto assets. You may not use it to launder funds, finance terrorism,
          or evade sanctions, and you may not access the service from a sanctioned country.
        </p>
      </DocSection>

      <DocSection heading="Fees">
        <p>
          Standard trade fees are 0.5% per transaction. SEPA Instant deposits are free. Card
          deposits incur a separate processor fee shown at checkout. Withdrawal network fees
          are passed through at cost.
        </p>
      </DocSection>

      <DocSection heading="Risks">
        <p>
          Crypto assets are volatile. Past performance is not indicative of future returns.
          Staked funds are locked for the period you choose and are not insured against
          protocol or counterparty risk.
        </p>
      </DocSection>

      <DocSection heading="Limitation of liability">
        <p>
          Except where prohibited by law, Venga&rsquo;s liability under these terms is limited
          to the fees you paid us in the 12 months preceding the event giving rise to the
          claim.
        </p>
      </DocSection>

      <DocSection heading="Termination">
        <p>
          You may close your account at any time from Menu &rarr; Close account. We may
          suspend or close accounts that violate these terms or that we are required to
          close by applicable law.
        </p>
      </DocSection>

      <DocSection heading="Governing law">
        <p>
          These terms are governed by the laws of Spain. Disputes are subject to the
          exclusive jurisdiction of the courts of Madrid, save where an applicable consumer
          protection law provides otherwise.
        </p>
      </DocSection>
    </DocumentScreen>
  );
}
