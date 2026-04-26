export const USER = {
  firstName: "Maria",
  lastName: "Venga",
  fullName: "Maria Venga",
  email: "maria@venga.com",
  initials: "MV",
  kycLevel: 2,
  verified: true,
};

export const BALANCE = {
  totalUSD: 169.11,
  hasRewardsChallenge: true,
};

export type IconVar =
  | "eur"
  | "btc"
  | "eth"
  | "aave"
  | "link"
  | "comp"
  | "usdc"
  | "sand"
  | "grt"
  | "trx";

export type Asset = {
  symbol: string;
  name: string;
  iconVar: IconVar;
  balance: number;
  valueUSD: number;
  price24hPct: number;
  priceUSD: number;
};

export const ASSETS: Asset[] = [
  { symbol: "EUR",  name: "Euro",      iconVar: "eur",  balance: 35.98,      valueUSD: 42.14, price24hPct:  0.00, priceUSD: 1.17 },
  { symbol: "BTC",  name: "Bitcoin",   iconVar: "btc",  balance: 0.00067428, valueUSD: 52.37, price24hPct: -0.37, priceUSD: 77696.49 },
  { symbol: "ETH",  name: "Ethereum",  iconVar: "eth",  balance: 0.00837396, valueUSD: 19.42, price24hPct:  0.32, priceUSD: 2319.10 },
  { symbol: "AAVE", name: "Aave",      iconVar: "aave", balance: 0,          valueUSD:  0.00, price24hPct:  1.15, priceUSD: 80.24 },
  { symbol: "LINK", name: "Chainlink", iconVar: "link", balance: 0.24343629, valueUSD:  2.28, price24hPct:  1.95, priceUSD:  9.36 },
  { symbol: "COMP", name: "Compound",  iconVar: "comp", balance: 0,          valueUSD:  0.00, price24hPct:  0.00, priceUSD: 42.10 },
  { symbol: "SAND", name: "Sandbox",   iconVar: "sand", balance: 0.50,       valueUSD:  0.07, price24hPct:  3.03, priceUSD:  0.14 },
];

export const MARKET_FILTER_TABS = ["All", "Favourites", "Popular", "Gainers", "Losers"] as const;

export type MarketFilter = (typeof MARKET_FILTER_TABS)[number];

/* ---------- iteration 2: portfolio + asset detail ---------- */

export const PORTFOLIO_DELTA_USD_24H = 0.67;

export const ASSETS_EARNABLE = new Set<string>(["BTC", "ETH", "LINK", "AAVE"]);

export type AssetDetail = {
  marketCapUSD: number;
  totalSupply: number;
  ath: number;
  atl: number;
  description: string;
};

export const ASSET_DETAILS: Record<string, AssetDetail> = {
  BTC: {
    marketCapUSD: 1_540_000_000_000,
    totalSupply: 19_700_000,
    ath: 108_000,
    atl: 65,
    description:
      "Bitcoin is the original decentralized digital currency. Created in 2009, it operates on a peer-to-peer network secured by proof-of-work mining and remains the most widely held crypto asset.",
  },
  ETH: {
    marketCapUSD: 280_000_000_000,
    totalSupply: 120_000_000,
    ath: 4_800,
    atl: 0.43,
    description:
      "Ethereum is a smart-contract platform that powers thousands of decentralized applications, stablecoins, and on-chain financial services. ETH is its native fee and staking asset.",
  },
  AAVE: {
    marketCapUSD: 2_787_000_000,
    totalSupply: 16_000_000,
    ath: 660,
    atl: 26,
    description:
      "Aave is a decentralized lending protocol that lets users earn yield on deposits and borrow against collateral. The AAVE token is used for governance and protocol safety.",
  },
  LINK: {
    marketCapUSD: 5_900_000_000,
    totalSupply: 1_000_000_000,
    ath: 53,
    atl: 0.15,
    description:
      "Chainlink is a decentralized oracle network that connects smart contracts with off-chain data, payments, and computation. LINK is used to pay node operators for data delivery.",
  },
  EUR: {
    marketCapUSD: 0,
    totalSupply: 0,
    ath: 0,
    atl: 0,
    description:
      "Euro — your fiat balance. Use SEPA to add funds, or sell crypto to convert. Euros held in Venga can be sent back to a linked bank account at any time.",
  },
  COMP: {
    marketCapUSD: 350_000_000,
    totalSupply: 10_000_000,
    ath: 910,
    atl: 24,
    description:
      "Compound is an algorithmic lending market on Ethereum. Suppliers earn interest from borrowers, with rates determined by real-time supply and demand. COMP is its governance token.",
  },
  SAND: {
    marketCapUSD: 420_000_000,
    totalSupply: 3_000_000_000,
    ath: 8.4,
    atl: 0.03,
    description:
      "The Sandbox is a virtual world where players build, own, and monetize gaming experiences. SAND is the in-game currency used for transactions, governance, and staking.",
  },
};

/* ---------- iteration 3: deposit flow ---------- */

export type AddressFormat = "evm" | "bitcoin" | "tron";

export const ASSET_NETWORKS: Record<
  string,
  { network: string; addressFormat: AddressFormat }
> = {
  BTC:  { network: "Bitcoin",  addressFormat: "bitcoin" },
  ETH:  { network: "Ethereum", addressFormat: "evm" },
  AAVE: { network: "Ethereum", addressFormat: "evm" },
  LINK: { network: "Ethereum", addressFormat: "evm" },
  COMP: { network: "Ethereum", addressFormat: "evm" },
  USDC: { network: "Ethereum", addressFormat: "evm" },
  SAND: { network: "Ethereum", addressFormat: "evm" },
  GRT:  { network: "Ethereum", addressFormat: "evm" },
  TRX:  { network: "Tron",     addressFormat: "tron" },
};

export function generateMockAddress(symbol: string): string {
  const fmt = ASSET_NETWORKS[symbol]?.addressFormat ?? "evm";
  if (fmt === "evm")     return "0xD111fefd68f9f290dc589f4b17171ed7ca0fff3";
  if (fmt === "bitcoin") return "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
  if (fmt === "tron")    return "TXYZopBVpHVgUqg4dkf8kCfsiKMU8nYFRk";
  return "";
}

export const VENGA_IBAN = {
  iban: "ES76 1234 5678 9012 3456 7890",
  bic: "VENGES2X",
  holder: "Venga Europe SL",
  ref: "U-7193",
};

/** Returns 24 mock price points, simulating a 1D sparkline around the current price. */
export function generateSparkline(symbol: string): number[] {
  const asset = ASSETS.find((a) => a.symbol === symbol);
  if (!asset) return Array(24).fill(0);
  const center = asset.priceUSD;
  const vol = 0.02;
  let seed = [...symbol].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 24 }, () => center * (1 + (rand() - 0.5) * vol * 2));
}

/* ---------- iteration 4: trade flow ---------- */

export const TRADE_FEE_PCT = 0.005; // 0.5% blended trade fee

export type Market = {
  base: string;
  quote: string;
  /** Price quoted in `quote`. */
  price: number;
  change24hPct: number;
  isPopular: boolean;
};

export const MARKETS: Market[] = [
  { base: "AAVE", quote: "EUR",  price: 80.24,    change24hPct:  1.15, isPopular: true  },
  { base: "BTC",  quote: "EUR",  price: 66325.20, change24hPct: -0.37, isPopular: true  },
  { base: "BTC",  quote: "USDC", price: 77696.49, change24hPct: -0.16, isPopular: true  },
  { base: "ETH",  quote: "EUR",  price: 1981.04,  change24hPct:  0.32, isPopular: true  },
  { base: "ETH",  quote: "USDC", price: 2319.10,  change24hPct:  0.41, isPopular: false },
  { base: "LINK", quote: "EUR",  price: 9.36,     change24hPct:  1.95, isPopular: false },
  { base: "LINK", quote: "USDC", price: 10.97,    change24hPct:  2.10, isPopular: false },
  { base: "SAND", quote: "EUR",  price: 0.14,     change24hPct:  3.03, isPopular: false },
  { base: "COMP", quote: "EUR",  price: 42.10,    change24hPct: -1.40, isPopular: false },
  { base: "GRT",  quote: "EUR",  price: 0.16,     change24hPct: -2.11, isPopular: false },
  { base: "TRX",  quote: "USDC", price: 0.13,     change24hPct:  0.74, isPopular: false },
];

export const FAVOURITE_PAIR_SLUGS = ["AAVE-EUR", "BTC-EUR", "ETH-EUR"];

export function pairToSlug(m: Pick<Market, "base" | "quote">): string {
  return `${m.base}-${m.quote}`;
}
export function pairFromSlug(slug: string): { base: string; quote: string } {
  const [base, quote] = slug.split("-");
  return { base: base ?? "", quote: quote ?? "" };
}
export function findMarket(slug: string): Market | undefined {
  return MARKETS.find((m) => pairToSlug(m) === slug);
}
export function getPopularMarkets(): Market[] {
  return MARKETS.filter((m) => m.isPopular);
}
export function getGainers(n = 10): Market[] {
  return [...MARKETS].sort((a, b) => b.change24hPct - a.change24hPct).slice(0, n);
}
export function getLosers(n = 10): Market[] {
  return [...MARKETS].sort((a, b) => a.change24hPct - b.change24hPct).slice(0, n);
}

/** USD-denominated rate: how many `to` per 1 `from`. 0 if either price is missing. */
export function computeRate(from: Asset, to: Asset): number {
  if (!from?.priceUSD || !to?.priceUSD) return 0;
  return from.priceUSD / to.priceUSD;
}

/** Generate a deterministic 24-point sparkline keyed by pair slug, anchored on the pair price. */
export function generatePairSparkline(pairSlug: string): number[] {
  let seed = [...pairSlug].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const market = findMarket(pairSlug);
  const center = market?.price ?? 100;
  const vol = 0.025;
  return Array.from({ length: 24 }, () => center * (1 + (rand() - 0.5) * vol * 2));
}

/** Symbol → IconVar fallback (so MARKETS quote/base symbols can map to the 10 hand-built coin SVGs). */
export function iconVarFor(symbol: string): IconVar {
  const lower = symbol.toLowerCase();
  const known: IconVar[] = [
    "eur","btc","eth","aave","link","comp","usdc","sand","grt","trx",
  ];
  return (known.includes(lower as IconVar) ? lower : "eur") as IconVar;
}

/* ---------- iteration 5: earn flow ---------- */

export type EarnableAsset = {
  symbol: string;
  rpyPct: number;        // e.g. 5 for 5%
  lockDays: number;      // e.g. 60
  processingDays: number; // post-lockup release window
};

export const EARNABLE_ASSETS: EarnableAsset[] = [
  { symbol: "BTC",  rpyPct: 5.0, lockDays: 60, processingDays: 1  },
  { symbol: "ETH",  rpyPct: 7.0, lockDays: 60, processingDays: 10 },
  { symbol: "LINK", rpyPct: 6.0, lockDays: 60, processingDays: 1  },
  { symbol: "AAVE", rpyPct: 4.5, lockDays: 60, processingDays: 1  },
];

export function findEarnable(symbol: string): EarnableAsset | undefined {
  return EARNABLE_ASSETS.find((e) => e.symbol === symbol);
}

export type StakedPosition = {
  positionId: string;
  symbol: string;
  amount: number;        // native units
  rpyPct: number;
  lockDays: number;
  processingDays: number;
  /** Pin to a fixed date for deterministic prototype rendering. */
  startedAt: Date;
  autoRenew: boolean;
  /** Accrued rewards so far, native units. */
  earnedRewards: number;
};

export const STAKED_POSITIONS: StakedPosition[] = [
  {
    positionId: "pos_eth_001",
    symbol: "ETH",
    amount: 0.00000001,
    rpyPct: 3.3,
    lockDays: 60,
    processingDays: 10,
    startedAt: new Date("2026-04-16"),
    autoRenew: true,
    earnedRewards: 0.00000001,
  },
  {
    positionId: "pos_btc_001",
    symbol: "BTC",
    amount: 0.00000001,
    rpyPct: 0.5,
    lockDays: 60,
    processingDays: 1,
    startedAt: new Date("2026-04-25"),
    autoRenew: true,
    earnedRewards: 0,
  },
];

/** Mutable in-memory store for newly-created positions (prototype-only). */
export const STAKED_POSITIONS_LOCAL: StakedPosition[] = [];

export function allStakedPositions(): StakedPosition[] {
  return [...STAKED_POSITIONS, ...STAKED_POSITIONS_LOCAL];
}

export function findStakedPosition(positionId: string): StakedPosition | undefined {
  return (
    STAKED_POSITIONS.find((p) => p.positionId === positionId) ??
    STAKED_POSITIONS_LOCAL.find((p) => p.positionId === positionId)
  );
}

const DAY_MS = 86_400_000;

export function daysElapsed(p: StakedPosition, now: Date = new Date()): number {
  const ms = now.getTime() - p.startedAt.getTime();
  return Math.max(0, Math.min(p.lockDays, Math.floor(ms / DAY_MS)));
}

export function endOfLockup(p: StakedPosition): Date {
  return new Date(p.startedAt.getTime() + p.lockDays * DAY_MS);
}

export function assetsAvailableDate(p: StakedPosition): Date {
  return new Date(
    p.startedAt.getTime() + (p.lockDays + p.processingDays) * DAY_MS,
  );
}

/** Hardcoded total Earn balance for the prototype (matches source state). */
export const EARN_BALANCE_USD = 0.67;
export const EARN_BALANCE_DELTA_USD_TODAY = 0.00006266;

/* ---------- iteration 6: settings sub-screens ---------- */

export type LinkedBank = { id: string; bank: string; last4: string; primary: boolean };
export const LINKED_BANKS: LinkedBank[] = [
  { id: "b1", bank: "BBVA",       last4: "4421", primary: true  },
  { id: "b2", bank: "CaixaBank",  last4: "7812", primary: false },
];

export type LoginSession = {
  id: string;
  device: string;
  location: string;
  when: string;
  current: boolean;
  unrecognized: boolean;
};
export const LOGIN_SESSIONS: LoginSession[] = [
  { id: "s1", device: "iPhone 14 Pro · Safari",      location: "Madrid, ES",    when: "Today at 14:11", current: true,  unrecognized: false },
  { id: "s2", device: "iPhone 14 Pro · Venga app",   location: "Madrid, ES",    when: "Yesterday",      current: false, unrecognized: false },
  { id: "s3", device: "MacBook · Chrome",            location: "Madrid, ES",    when: "22 Apr",         current: false, unrecognized: false },
  { id: "s4", device: "iPhone 14 Pro · Safari",      location: "Barcelona, ES", when: "18 Apr",         current: false, unrecognized: false },
  { id: "s5", device: "Unknown Android",             location: "Lisbon, PT",    when: "02 Apr",         current: false, unrecognized: true  },
];

export type WhitelistedAddress = {
  id: string;
  label: string;
  symbol: string;
  address: string;
};
export const WHITELISTED_ADDRESSES: WhitelistedAddress[] = [
  { id: "w1", label: "My Ledger BTC",  symbol: "BTC",  address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { id: "w2", label: "Hardware ETH",   symbol: "ETH",  address: "0xD111fefd68f9f290dc589f4b17171ed7ca0fff3" },
  { id: "w3", label: "Coinbase USDC",  symbol: "USDC", address: "0x3a8f2e1f8c9bda0e5c711a7634d9ad97c4b21ef5" },
];

export type FaqCategory = "Account" | "Deposits & withdrawals" | "Trading" | "Earn";
export type FaqEntry = { id: string; q: string; a: string; category: FaqCategory };
export const FAQS: FaqEntry[] = [
  { id: "f1",  category: "Account",                  q: "How do I verify my identity?",            a: "Open Menu → Verification, then follow the steps to upload your ID and a quick selfie. Most submissions are reviewed within minutes; complex cases may take up to 24 hours." },
  { id: "f2",  category: "Deposits & withdrawals",   q: "How long do SEPA deposits take?",         a: "SEPA Instant transfers usually arrive in under 10 seconds. Outside instant windows, a regular SEPA can take up to 1 business day." },
  { id: "f3",  category: "Earn",                     q: "What's the difference between RPY and APY?", a: "RPY (Reward Per Year) is the simple annualized rate paid on your stake. APY would compound interest — Venga pays linear rewards over the lockup, no compounding mid-period." },
  { id: "f4",  category: "Deposits & withdrawals",   q: "Why is my withdrawal pending?",            a: "Withdrawals to non-whitelisted addresses are held for 24 hours as a security delay. Whitelisted addresses ship immediately after confirmation." },
  { id: "f5",  category: "Trading",                  q: "How are trade fees calculated?",            a: "Each trade has a 0.5% blended fee — a 0.3% spread vs the indicative mid-market price plus a 0.2% service fee. There is no separate network fee for in-app exchanges." },
  { id: "f6",  category: "Account",                  q: "Is Venga regulated?",                       a: "Venga Europe SL operates under registrations with the Bank of Spain and the Polish FIU, and is preparing for MiCA compliance. See Menu → Licences for details." },
  { id: "f7",  category: "Earn",                     q: "Can I cancel a stake early?",               a: "No. Once funds are staked they are locked until the period ends, plus a short processing window. Reward rates are fixed for the active period." },
  { id: "f8",  category: "Account",                  q: "How do I add a whitelisted address?",       a: "Menu → Whitelisted addresses → Add new address. You'll receive an email confirmation link before the address becomes active." },
  { id: "f9",  category: "Trading",                  q: "What happens if the rate moves during review?", a: "If the executed rate diverges by more than 0.5% from your quote, you'll see a yellow banner and the slider is briefly disabled so you can review the new amounts." },
  { id: "f10", category: "Deposits & withdrawals",   q: "Can I deposit with a credit card?",         a: "Card deposits are coming soon. For now, please use SEPA Instant — it is free and arrives in seconds." },
  { id: "f11", category: "Account",                  q: "How do I change my email?",                 a: "Email changes need a quick review for security. Tap Menu → Personal info → Email and follow the flow, or contact support." },
  { id: "f12", category: "Earn",                     q: "When does the first reward accrue?",        a: "Your first reward starts accruing 24 hours after the stake confirms, and is paid at the end of the lockup unless you've enabled auto-renew." },
];

export type ChangelogTag = "feature" | "fix" | "security" | "improvement";
export type ChangelogEntry = {
  id: string;
  date: string;        // pretty display
  iso: string;         // sortable
  tag: ChangelogTag;
  title: string;
  summary: string;
  body: string;        // long form for HintSheet
};
export const CHANGELOG: ChangelogEntry[] = [
  { id: "c1", iso: "2026-04-24", date: "24 Apr 2026", tag: "feature",     title: "Unified Trade flow",         summary: "Swap and Exchange merged into a single screen with a clearer review step.",         body: "We rebuilt the Trade tab around a single market-order form. Asset Detail's Buy/Sell/Trade and the Markets list all funnel into the same review step, and a slide-to-confirm replaces the old confirm modal." },
  { id: "c2", iso: "2026-04-18", date: "18 Apr 2026", tag: "improvement", title: "Faster SEPA deposits",       summary: "Instant SEPA now arrives in ~10 seconds.",                                            body: "We rolled SEPA Instant out as the default for Eurozone members. Outside instant windows you'll still see the usual ~1 business-day fallback." },
  { id: "c3", iso: "2026-04-12", date: "12 Apr 2026", tag: "feature",     title: "Earn detail page",            summary: "Track lockup progress with a visual timeline.",                                       body: "The Staked detail page now shows a rainbow progress bar, projected end-of-lockup rewards, and a persistent auto-renew toggle." },
  { id: "c4", iso: "2026-04-04", date: "04 Apr 2026", tag: "security",    title: "Login alerts",               summary: "Get notified when a new device signs in.",                                            body: "Push and email notifications are now sent on new device sign-ins. You can manage these alerts from Menu → Notifications." },
  { id: "c5", iso: "2026-03-28", date: "28 Mar 2026", tag: "fix",         title: "Wallet zero-balance order",  summary: "Zero-balance assets now sit consistently below your holdings.",                       body: "We fixed a sort regression that caused some zero-balance assets to appear above active holdings on the Wallet screen." },
  { id: "c6", iso: "2026-03-20", date: "20 Mar 2026", tag: "improvement", title: "Compliance sheet remember", summary: "Tap 'Don't show again' on a known network to dismiss the warning sheet.",            body: "Per-asset compliance acknowledgement is now persisted to local storage. New networks always show the sheet — your safety net stays intact for first-time deposits." },
  { id: "c7", iso: "2026-03-12", date: "12 Mar 2026", tag: "feature",     title: "Pair detail charts",          summary: "View 1D / 1W / 1M / 1Y charts per market pair.",                                      body: "Each Markets pair now has its own detail page with a sparkline, stat grid (market cap, supply, ATH/ATL), and a Buy/Sell action bar." },
  { id: "c8", iso: "2026-03-04", date: "04 Mar 2026", tag: "improvement", title: "Mobile frame on desktop",     summary: "App centers at 440px on wide screens for clearer layout previews.",                  body: "On screens 768px and wider, Venga renders inside a centered 440px-wide mobile frame so the app feels native to its target form factor." },
];

export type EarnHistoryKind = "reward" | "stake" | "unstake";
export type EarnHistoryEvent = {
  id: string;
  kind: EarnHistoryKind;
  symbol: string;
  amount: number;       // native, signed for rewards (always positive here for simplicity)
  valueUSD: number;
  iso: string;          // sortable
  when: string;         // pretty time
  monthLabel: string;   // pretty group label
};
export const EARN_HISTORY: EarnHistoryEvent[] = [
  { id: "e1",  kind: "reward",   symbol: "ETH",  amount: 0.00000001, valueUSD: 0.00000002, iso: "2026-04-24T14:11", when: "24 Apr · 14:11", monthLabel: "April 2026" },
  { id: "e2",  kind: "reward",   symbol: "ETH",  amount: 0.00000001, valueUSD: 0.00000002, iso: "2026-04-23T14:11", when: "23 Apr · 14:11", monthLabel: "April 2026" },
  { id: "e3",  kind: "stake",    symbol: "BTC",  amount: 0.00000001, valueUSD: 0.0008,     iso: "2026-04-25T08:02", when: "25 Apr · 08:02", monthLabel: "April 2026" },
  { id: "e4",  kind: "reward",   symbol: "ETH",  amount: 0.00000001, valueUSD: 0.00000002, iso: "2026-04-22T14:11", when: "22 Apr · 14:11", monthLabel: "April 2026" },
  { id: "e5",  kind: "reward",   symbol: "ETH",  amount: 0.00000001, valueUSD: 0.00000002, iso: "2026-04-21T14:11", when: "21 Apr · 14:11", monthLabel: "April 2026" },
  { id: "e6",  kind: "stake",    symbol: "ETH",  amount: 0.00000001, valueUSD: 0.0000232,  iso: "2026-04-16T09:30", when: "16 Apr · 09:30", monthLabel: "April 2026" },
  { id: "e7",  kind: "unstake",  symbol: "LINK", amount: 0.05,       valueUSD: 0.47,       iso: "2026-03-30T16:48", when: "30 Mar · 16:48", monthLabel: "March 2026" },
  { id: "e8",  kind: "reward",   symbol: "LINK", amount: 0.0001,     valueUSD: 0.001,      iso: "2026-03-28T16:48", when: "28 Mar · 16:48", monthLabel: "March 2026" },
  { id: "e9",  kind: "reward",   symbol: "LINK", amount: 0.0001,     valueUSD: 0.001,      iso: "2026-03-27T16:48", when: "27 Mar · 16:48", monthLabel: "March 2026" },
  { id: "e10", kind: "reward",   symbol: "LINK", amount: 0.0001,     valueUSD: 0.001,      iso: "2026-03-26T16:48", when: "26 Mar · 16:48", monthLabel: "March 2026" },
  { id: "e11", kind: "stake",    symbol: "LINK", amount: 0.05,       valueUSD: 0.47,       iso: "2026-01-29T11:02", when: "29 Jan · 11:02", monthLabel: "January 2026" },
  { id: "e12", kind: "reward",   symbol: "BTC",  amount: 0.00000001, valueUSD: 0.0008,     iso: "2026-01-15T08:02", when: "15 Jan · 08:02", monthLabel: "January 2026" },
];
