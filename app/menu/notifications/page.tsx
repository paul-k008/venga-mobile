"use client";

import TogglesScreen from "@/components/screens/TogglesScreen";

export default function NotificationsPage() {
  return (
    <TogglesScreen
      title="Notifications"
      sections={[
        {
          label: "Transactions",
          items: [
            { key: "deposit",   label: "Deposit confirmations",    defaultChecked: true },
            { key: "trade",     label: "Trade executions",         defaultChecked: true },
            { key: "withdraw",  label: "Withdrawal confirmations", defaultChecked: true },
          ],
        },
        {
          label: "Markets",
          items: [
            {
              key: "alerts",
              label: "Price alerts",
              description: "Get notified when assets reach your target price",
              defaultChecked: false,
            },
            { key: "digest", label: "Daily market digest", defaultChecked: false },
          ],
        },
        {
          label: "Account",
          items: [
            {
              key: "login",
              label: "Login alerts",
              description: "Get notified about new device sign-ins",
              defaultChecked: true,
            },
            { key: "security", label: "Security updates", defaultChecked: true },
          ],
        },
        {
          label: "Marketing",
          items: [
            {
              key: "news",
              label: "Product news",
              description: "New features, occasional updates",
              defaultChecked: false,
            },
            { key: "tips", label: "Tips & education", defaultChecked: false },
          ],
        },
      ]}
    />
  );
}
