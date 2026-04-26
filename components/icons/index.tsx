import CoinEUR from "./CoinEUR";
import CoinBTC from "./CoinBTC";
import CoinETH from "./CoinETH";
import CoinAAVE from "./CoinAAVE";
import CoinLINK from "./CoinLINK";
import CoinCOMP from "./CoinCOMP";
import CoinUSDC from "./CoinUSDC";
import CoinSAND from "./CoinSAND";
import CoinGRT from "./CoinGRT";
import CoinTRX from "./CoinTRX";
import type { IconVar } from "@/lib/mocks";

export {
  CoinEUR,
  CoinBTC,
  CoinETH,
  CoinAAVE,
  CoinLINK,
  CoinCOMP,
  CoinUSDC,
  CoinSAND,
  CoinGRT,
  CoinTRX,
};

export function CoinIcon({ variant, size = 40 }: { variant: IconVar; size?: number }) {
  switch (variant) {
    case "eur":
      return <CoinEUR size={size} />;
    case "btc":
      return <CoinBTC size={size} />;
    case "eth":
      return <CoinETH size={size} />;
    case "aave":
      return <CoinAAVE size={size} />;
    case "link":
      return <CoinLINK size={size} />;
    case "comp":
      return <CoinCOMP size={size} />;
    case "usdc":
      return <CoinUSDC size={size} />;
    case "sand":
      return <CoinSAND size={size} />;
    case "grt":
      return <CoinGRT size={size} />;
    case "trx":
      return <CoinTRX size={size} />;
  }
}
