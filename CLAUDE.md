# Venga Mobile — Project Reference

This document is the canonical reference for this codebase. Read it before making any change. Update it whenever you add, rename, or change a component / screen / mock.

## Stack
- Next.js 14.2 (app router), TypeScript strict, Tailwind CSS, Framer Motion, Lucide React, Zustand (Trade + Earn + Toast stores)
- Fonts: Bricolage Grotesque (display, 800) via `next/font/google`; Geist Sans + Geist Mono via the `geist` npm package (CSS vars: `--font-bricolage`, `--font-geist-sans`, `--font-geist-mono`)
- Mobile-first. On ≥ 768px viewport, app is centered at `max-width: 440px` with a cream-3 frame around it (see `components/MobileFrame.tsx`).
- No backend. All state is in-memory React state; data comes from `lib/mocks.ts`.

## Design tokens
Defined as CSS variables in `app/globals.css`, mirrored as Tailwind theme extensions in `tailwind.config.ts`, and exported as a JS constant in `lib/tokens.ts`.

| Token | Value | Usage |
|---|---|---|
| cream / cream-2 / cream-3 | #F7F2E7 / #F1EADB / #EBE2CC | app bg / elevated card / pressed |
| ink / ink-70 / ink-40 / hair | #0E1116 / 70% / 40% / 8% | primary text / secondary / hint / divider |
| orange / orange-deep / orange-soft | #FF5B00 / #E04E00 / #FFE8DC | primary CTA / **press state** for orange CTAs (iter 7) / disabled CTA tint |
| mint / mint-deep | #9FE7C7 / #1E9C6B | success pill bg / mint-on-cream text |
| red / red-tint | #E53935 / 10% | destructive |
| sky | #7DB8FF | info, striped-border companion |
| yellow / lime | #F4C542 / #C8F44B | earn highlight / avatar chip |
| blob-blue / blob-mint / blob-yellow | #AFC6F0 / #8EE3B7 / #F2D24B | Home action tiles |

Radii: `sm` 8, `md` 14, `lg` 20, `pill` 9999.

## Typography classes
- `.font-display` — Bricolage 800, uppercase, -0.02em
- `.font-body` — Geist Sans, -0.01em (also the default body font)
- `.font-nums` — Geist Mono, `font-variant-numeric: tabular-nums`

## Conventions
- Every interactive element MUST navigate or change state visibly. The ONE exception app-wide: the Profile card body on `/menu` is a static block.
- Back button: circular 44×44 cream with soft shadow, Lucide `ChevronLeft`, top-left inset 20px. Uses `router.back()`. Implemented in `components/BackButton.tsx`.
- Shell-group screens (`/`, `/trade`, `/wallet`, `/earn`) share the bottom tab bar via `app/(shell)/layout.tsx`. Non-shell screens (`/asset/*`, `/deposit*`, `/menu/*`, `/rewards/*`) are stack-push routes without the tab bar.
- Page enter animation: stagger-reveal children by 40ms (or 30ms on Wallet rows), `y: 8 → 0` + `opacity: 0 → 1`, 260ms ease-out.
- Numbers: always `font-nums` (tabular). Currency uses period decimal separator. Percent: minus sign U+2212, not hyphen (`formatPct` handles this).
- No purple gradients, no neon, no glassmorphism, no dark surfaces.
- Mobile frame is applied globally in `app/layout.tsx` via `<MobileFrame>` wrapping `{children}`.

## Screen inventory
| Route | Status | File |
|-------|--------|------|
| `/` | done (iter 1) | `app/(shell)/page.tsx` |
| `/trade` | done (iter 4) | `app/(shell)/trade/page.tsx` |
| `/trade/select-asset` | done (iter 4) | `app/trade/select-asset/page.tsx` |
| `/trade/review` | done (iter 4) | `app/trade/review/page.tsx` |
| `/trade/success` | done (iter 4) | `app/trade/success/page.tsx` |
| `/trade/markets` | done (iter 4) | `app/trade/markets/page.tsx` |
| `/trade/markets/[pair]` | done (iter 4) | `app/trade/markets/[pair]/page.tsx` |
| `/wallet` | done (iter 2) | `app/(shell)/wallet/page.tsx` |
| `/earn` | done (iter 5) | `app/(shell)/earn/page.tsx` |
| `/earn/stake/[symbol]` | done (iter 5) | `app/earn/stake/[symbol]/page.tsx` |
| `/earn/stake/[symbol]/review` | done (iter 5) | `app/earn/stake/[symbol]/review/page.tsx` |
| `/earn/stake/[symbol]/success` | done (iter 5) | `app/earn/stake/[symbol]/success/page.tsx` |
| `/earn/staked/[positionId]` | done (iter 5) | `app/earn/staked/[positionId]/page.tsx` |
| `/earn/history` | done (iter 6) | `app/earn/history/page.tsx` |
| `/menu` | done (iter 1) | `app/menu/page.tsx` |
| `/menu/personal-info` | done (iter 6) | `app/menu/personal-info/page.tsx` |
| `/menu/verification` | done (iter 6) | `app/menu/verification/page.tsx` |
| `/menu/linked-banks` | done (iter 6) | `app/menu/linked-banks/page.tsx` |
| `/menu/pin-biometrics` | done (iter 6) | `app/menu/pin-biometrics/page.tsx` |
| `/menu/2fa` | done (iter 6) | `app/menu/2fa/page.tsx` |
| `/menu/login-history` | done (iter 6) | `app/menu/login-history/page.tsx` |
| `/menu/whitelisted` | done (iter 6) | `app/menu/whitelisted/page.tsx` |
| `/menu/security` | stub | `app/menu/security/page.tsx` |
| `/menu/notifications` | done (iter 6) | `app/menu/notifications/page.tsx` |
| `/menu/language` | done (iter 6) | `app/menu/language/page.tsx` |
| `/menu/currency` | done (iter 6) | `app/menu/currency/page.tsx` |
| `/menu/appearance` | done (iter 6) | `app/menu/appearance/page.tsx` |
| `/menu/support` | done (iter 6) | `app/menu/support/page.tsx` |
| `/menu/help-center` | done (iter 6) | `app/menu/help-center/page.tsx` |
| `/menu/report` | done (iter 6) | `app/menu/report/page.tsx` |
| `/menu/whats-new` | done (iter 6) | `app/menu/whats-new/page.tsx` |
| `/menu/terms` | done (iter 6) | `app/menu/terms/page.tsx` |
| `/menu/privacy` | done (iter 6) | `app/menu/privacy/page.tsx` |
| `/menu/licences` | done (iter 6) | `app/menu/licences/page.tsx` |
| `/deposit` | done (iter 3) | `app/deposit/page.tsx` |
| `/deposit/method/sepa` | done (iter 3) | `app/deposit/method/sepa/page.tsx` |
| `/deposit/method/crypto` | done (iter 3) | `app/deposit/method/crypto/page.tsx` |
| `/deposit/method/card` | done (iter 6) | `app/deposit/method/card/page.tsx` |
| `/deposit/method/external` | done (iter 6) | `app/deposit/method/external/page.tsx` |
| `/deposit/asset/[symbol]` | done (iter 3) | `app/deposit/asset/[symbol]/page.tsx` |
| `/deposit/success` | done (iter 3) | `app/deposit/success/page.tsx` |
| `/asset/[symbol]` | done (iter 2) | `app/asset/[symbol]/page.tsx` |
| `/rewards/claim` | stub | `app/rewards/claim/page.tsx` |

(Update this table each iteration.)

## Component library
Location: `components/`. All components default-exported and typed unless noted.

| Component | File | Props (actual) |
|---|---|---|
| `MobileFrame` | MobileFrame.tsx | `{ children }` — centers on desktop at max-w 440 inside cream-3 |
| `BottomTabBar` | BottomTabBar.tsx | no props; reads pathname; 4 tabs (Home/Trade/Wallet/Earn) |
| `TopHeader` | TopHeader.tsx | `{ title?: string }` (default: `"Hi <FIRSTNAME>"`); always shows MG avatar → `/menu` |
| `BackButton` | BackButton.tsx | no props; calls `router.back()` |
| `AppScreen` | AppScreen.tsx | `{ children, title?: string, showBack?: boolean }` |
| `StubScreen` | StubScreen.tsx | `{ title: string, showBack?: boolean }` |
| `StripedBorder` | StripedBorder.tsx | `{ variant?: 'orange-sky' \| 'yellow-orange' \| 'rainbow', radius?: number, children, className?, innerClassName? }` (radius added iter 3, default 20; inner radius = radius − 2) |
| `BalanceCard` | BalanceCard.tsx | no props; reads `BALANCE` from mocks; internal `hidden` state via Eye toggle |
| `ActionTile` | ActionTile.tsx | `{ href, label, color, rotate?, icon: LucideIcon, iconRotate? }` |
| `MarketRow` | MarketRow.tsx | Discriminated union. Asset form: `{ asset: Asset, variant?: 'market' \| 'wallet' \| 'deposit', href? }`. Pair form: `{ market: Market, variant: 'pair', href? }` — pair variant defaults href to `/trade/markets/<base-quote>` (added iter 4) |
| `FilterChip` | FilterChip.tsx | `{ label, active, onClick }` |
| `MenuRow` | MenuRow.tsx | `{ icon?, label, sublabel?, value?, valueTone?, badge?, trailing?, href?, onClick?, tone?, isLast? }` — `sublabel` (line under label) and `trailing` (custom right-side node, replaces auto-chevron) added iter 6. Also exports `StatusDot`. |
| `MenuSection` | MenuSection.tsx | `{ label, children }` |
| `ProfileCard` | ProfileCard.tsx | no props; static block — body is non-clickable; only the "Claim €5 →" pill is a Link |
| `ConfirmModal` | ConfirmModal.tsx | `{ open, title, description?, cancelLabel?, confirmLabel, destructive?, onCancel, onConfirm }` |
| `CoinIcon` | icons/index.tsx | `{ variant: IconVar, size? }` — resolves to one of the 10 coin SVG components |
| `PortfolioCard` | PortfolioCard.tsx | `{ total, deltaUSD? }` (iter 2) |
| `SegmentedControl` | SegmentedControl.tsx | `{ options: string[], value, onChange, layoutId?, style?: 'pill' \| 'underline' }` — `pill` (default, iter 2) is cream-2 track with sliding pill; `underline` (iter 5) is flat tabs with an animated 2px orange bar under the active tab + hairline underneath |
| `Sparkline` | Sparkline.tsx | `{ points: number[], width?, height?, color? }` (iter 2) |
| `StatGrid` | StatGrid.tsx | `{ stats: Array<{ label, value }> }` (iter 2) |
| `AssetActionButton` | AssetActionButton.tsx | `{ icon: ReactNode, label, href }` (iter 2) |
| `DepositMethodCard` | DepositMethodCard.tsx | `{ icon: ReactNode, title, subtitle, speed: { label, tone: 'mint' \| 'yellow' }, href }` (iter 3) |
| `CopyButton` | CopyButton.tsx | `{ value, label?, variant?: 'icon' \| 'pill', size? }` — uses `navigator.clipboard`, flashes "Copied" 1.4s (iter 3) |
| `FauxQR` | FauxQR.tsx | `{ seed, size?, cells? }` — deterministic SVG QR-ish grid via `fauxQR(seed,cells)` (iter 3) |
| `SuccessCheck` | SuccessCheck.tsx | `{ size? }` — mint-deep circle with animated SVG checkmark `pathLength` (iter 3) |
| `ComplianceSheet` | ComplianceSheet.tsx | `{ open, title, children?, requireConfirmLabel, rememberLabel?, confirmLabel?, onConfirm: ({ remember }) => void }` — non-dismissible bottom sheet; Continue disabled until checkbox ticked. Optional secondary "Don't show again" checkbox renders when `rememberLabel` is set; its state is forwarded to `onConfirm` (iter 3) |
| `TradeAssetField` | TradeAssetField.tsx | `{ role: 'from' \| 'to', symbol, amount, valueUSD, onTapAsset, onAmountChange?, readOnly? }` — 72px cream-2 box with asset chip + large right-aligned numeric input + USD echo (iter 4) |
| `SlideToConfirm` | SlideToConfirm.tsx | `{ label, disabled?, disabledLabel?, onConfirm, threshold? }` — drag-thumb confirm UI. Past `threshold` (default 0.85) thumb snaps right, fires `navigator.vibrate(40)`, calls `onConfirm`. Below threshold: spring back. Disabled state recolors track to `bg-orange-soft` and thumb to `bg-ink-40` (iter 4) |
| `FeeSheet` | FeeSheet.tsx | `{ open, onClose, quoteSymbol, feeQuote, feePct }` — bottom sheet showing Network/Spread/Service breakdown + total. Tap-out closes (iter 4) |
| `RateTickerPill` | RateTickerPill.tsx | `{ fromSymbol, toSymbol, rate, pulseTick }` — compact `1 X ≈ Y Z · ● Live` pill. The mint dot pulses; the whole pill flashes cream-3 → cream-2 whenever `pulseTick` increments (iter 4) |
| `Toggle` | Toggle.tsx | `{ checked, onChange, disabled?, ariaLabel? }` — iOS-style 32×20 toggle, mint when on, ink thumb sliding via Framer `layout`. `role="switch"` (iter 5) |
| `RainbowChip` | RainbowChip.tsx | `{ children, className? }` — wraps `StripedBorder(rainbow, radius=999)` around a cream-inner pill. Used for RPY chips throughout Earn (iter 5) |
| `RainbowProgress` | RainbowProgress.tsx | `{ value: 0–1, height? }` — cream-3 track with mint→sky→yellow→orange gradient fill. Animates fill width on mount (600ms ease-out) (iter 5) |
| `HintSheet` | HintSheet.tsx | `{ open, onClose, title, body, confirmLabel? }` — generic info bottom sheet, tap-out closes. Used by Earn for "Processing time" hints (iter 5) |
| `EarnableAssetCard` | EarnableAssetCard.tsx | `{ symbol, rpyPct, lockDays, href? }` — Earn-overview Available row with FIXED pill + rainbow RPY chip. Default href = `/earn/stake/<symbol>` (iter 5) |
| `StakedPositionCard` | StakedPositionCard.tsx | `{ position, href? }` — Earn-overview Staked row with rainbow RPY chip + inline `RainbowProgress`. Default href = `/earn/staked/<positionId>` (iter 5) |
| `Toast` + `useToast` | Toast.tsx | `useToast()` returns `{ message, showToast(msg, ms?) }`; `<Toast message={message} />` renders an ink pill that slides up from the bottom (auto-hide after 1.4s default) (iter 6) |
| `Radio` | Radio.tsx | `{ checked }` — circular 24×24 indicator, mint-filled with check when active; springs in (iter 6) |
| `TextInput` | TextInput.tsx | `{ label?, value, onChange, placeholder?, type?, inputMode?, disabled?, leading?, trailing? }` — 48px cream-2 input with optional caps label, focus ring orange (iter 6) |
| `Textarea` | Textarea.tsx | `{ label?, value, onChange, placeholder?, rows?, disabled? }` — multiline counterpart (iter 6) |
| `PickerRow` | PickerRow.tsx | `{ label, value, options, onChange, placeholder? }` — labeled cream-2 row that opens a single-select bottom-sheet picker (iter 6) |
| `Callout` | Callout.tsx | `{ tone?: 'yellow' \| 'mint' \| 'red' \| 'cream', icon?, children, className? }` — tinted info box for notices/disclaimers (iter 6) |
| `ToastViewport` | ToastViewport.tsx | Mounts ONCE in root layout. Reads the singleton `useToastStore` and renders the visible toast pill above the bottom tab bar. One toast at a time, auto-dismiss with progress bar (iter 7) |
| `Toast` (compat shim) | Toast.tsx | Backwards-compat: `useToast()` now delegates to the global toast store; `<Toast />` is a no-op. New code should `import { toast } from "@/lib/toastStore"` directly (iter 7) |
| `Skeleton` | Skeleton.tsx | `{ width?, height?, radius?, className? }` — cream-3 base + shimmer that respects reduced-motion (iter 7) |
| `EmptyState` | EmptyState.tsx | `{ icon?, title, description?, cta?, className? }` — standardized cream-2 empty card with optional orange CTA (iter 7) |
| `OfflineBanner` | OfflineBanner.tsx | Mounts ONCE in root layout. Listens to `online`/`offline` events; coral persistent banner offline / brief mint banner on reconnect (iter 7) |

### Settings sub-screen scaffolds (iter 6)
Location: `components/screens/`. Four scaffolds cover ~80% of the settings sub-screens. **Reuse these — do not roll your own row/toggle/radio shells in new screens.**

| Scaffold | File | Use for |
|---|---|---|
| `SettingsListScreen` | `screens/SettingsListScreen.tsx` | List of `MenuRow`s grouped into optional sections. Props: `{ title, intro?, sections: Array<{ label?, rows: MenuRowProps[] }>, footer? }`. Used by linked-banks, login-history, whitelisted. |
| `TogglesScreen` | `screens/TogglesScreen.tsx` | Toggle group(s). Props: `{ title, sections: Array<{ label?, items: Array<{ key, label, description?, defaultChecked?, fixedOn? }> }>, onChange?, footer? }`. State held internally keyed by `key`; `fixedOn` renders a disabled always-on toggle. Used by pin-biometrics, notifications. |
| `RadioListScreen` | `screens/RadioListScreen.tsx` | Single-select. Controlled — parent owns state. Props: `{ title, options: Array<{ value, label, sublabel? }>, value, onChange }`. Used by language, currency, appearance. |
| `DocumentScreen` | `screens/DocumentScreen.tsx` | Long-form prose for legal docs. Always shows a yellow "Prototype copy" callout at the top. Props: `{ title, lastUpdated, children }`. Re-export `DocSection` (`{ heading, children }`) for use inside `children`. Used by terms, privacy, licences. |

The pattern lets each settings page stay under ~60 lines — see `app/menu/notifications/page.tsx` for the canonical example.

### Coin icons
`components/icons/` contains 10 hand-built SVG components (one per asset): `CoinEUR`, `CoinBTC`, `CoinETH`, `CoinAAVE`, `CoinLINK`, `CoinCOMP`, `CoinUSDC`, `CoinSAND`, `CoinGRT`, `CoinTRX`. The `CoinIcon` resolver in `components/icons/index.tsx` picks one by `IconVar` (lowercase symbol).

## Mock data
Location: `lib/mocks.ts`.

```ts
export const USER         // Maria Venga · maria@venga.com · MV initials · Level 2 KYC. Read by ProfileCard + TopHeader (greeting + avatar).
export const BALANCE      // { totalUSD, hasRewardsChallenge }
export type IconVar       // 'eur' | 'btc' | 'eth' | 'aave' | 'link' | 'comp' | 'usdc' | 'sand' | 'grt' | 'trx'
export type Asset         // { symbol, name, iconVar, balance, valueUSD, price24hPct, priceUSD }
export const ASSETS       // Asset[] — 7 entries (EUR, BTC, ETH, AAVE, LINK, COMP, SAND)
export const MARKET_FILTER_TABS  // ['All','Favourites','Popular','Gainers','Losers'] (iter 1)
export type MarketFilter
// Added in iter 2:
export const PORTFOLIO_DELTA_USD_24H   // number, hard-coded +0.67
export const ASSETS_EARNABLE           // Set<string> — 'BTC','ETH','LINK','AAVE'
export type AssetDetail
export const ASSET_DETAILS             // Record<symbol, AssetDetail>
export function generateSparkline(symbol): number[]   // 24 deterministic mock points
// Added in iter 3:
export type AddressFormat                              // 'evm' | 'bitcoin' | 'tron'
export const ASSET_NETWORKS                            // Record<symbol, { network, addressFormat }>
export function generateMockAddress(symbol): string    // returns one of 3 hardcoded addresses by format
export const VENGA_IBAN                                // { iban, bic, holder, ref }
// Added in iter 4:
export const TRADE_FEE_PCT                             // 0.005 (0.5% blended trade fee)
export type Market                                     // { base, quote, price, change24hPct, isPopular }
export const MARKETS                                   // Market[] — 11 entries
export const FAVOURITE_PAIR_SLUGS                      // hardcoded ['AAVE-EUR','BTC-EUR','ETH-EUR']
export function pairToSlug(m): string                  // "BTC-EUR"
export function pairFromSlug(slug): { base, quote }
export function findMarket(slug): Market | undefined
export function getPopularMarkets(): Market[]
export function getGainers(n=10): Market[]
export function getLosers(n=10): Market[]
export function computeRate(from, to): number          // priceUSD-based
export function generatePairSparkline(slug): number[]  // 24-pt deterministic, anchored on pair price
export function iconVarFor(symbol): IconVar            // safe symbol → IconVar mapper for non-asset symbols
// Added in iter 5:
export type EarnableAsset                              // { symbol, rpyPct, lockDays, processingDays }
export const EARNABLE_ASSETS                           // 4 entries: BTC, ETH, LINK, AAVE
export function findEarnable(symbol): EarnableAsset | undefined
export type StakedPosition                             // { positionId, symbol, amount, rpyPct, lockDays, processingDays, startedAt, autoRenew, earnedRewards }
export const STAKED_POSITIONS                          // 2 mock positions (ETH, BTC)
export const STAKED_POSITIONS_LOCAL                    // mutable in-memory append target for newly-confirmed stakes
export function allStakedPositions(): StakedPosition[]
export function findStakedPosition(positionId): StakedPosition | undefined
export function daysElapsed(p, now?): number           // [0..lockDays]
export function endOfLockup(p): Date
export function assetsAvailableDate(p): Date           // = startedAt + lockDays + processingDays
export const EARN_BALANCE_USD                          // hardcoded $0.67 (matches source state)
export const EARN_BALANCE_DELTA_USD_TODAY              // hardcoded +$0.00006266
// Added in iter 6:
export type LinkedBank, const LINKED_BANKS             // 2 mock SEPA accounts (BBVA primary, CaixaBank)
export type LoginSession, const LOGIN_SESSIONS         // 5 sessions; 1 current, 1 unrecognized
export type WhitelistedAddress, const WHITELISTED_ADDRESSES   // 3 addresses (BTC, ETH, USDC)
export type FaqEntry, FaqCategory, const FAQS          // 12 entries across 4 categories
export type ChangelogTag, ChangelogEntry, const CHANGELOG    // 8 entries (feature/fix/security/improvement)
export type EarnHistoryKind, EarnHistoryEvent, const EARN_HISTORY   // 12 events (April + March + Jan 2026)
```

### `lib/earnStore.ts` (Zustand, iter 5)
Mirrors the Trade store pattern. Survives `/earn/stake/<symbol>` → `/review` → `/success` without prop-drilling.

```ts
type LastStake = { positionId, symbol, amount, rpyPct, lockDays, createdAt };
type EarnState = {
  symbol: string;                  // currently-being-staked asset
  amount: string;                  // raw user input
  autoRenew: boolean;              // defaults true
  stakeRevision: number;           // bumped on recordStake → forces /earn list re-renders
  lastStake: LastStake | null;     // read by /success
  setSymbol, setAmount, setAutoRenew,
  recordStake({ ...snapshot, position }),  // appends position to STAKED_POSITIONS_LOCAL
  reset(),
};
export const useEarnStore = create<EarnState>(...);
```
On `recordStake`, the new `StakedPosition` is `.push()`ed to the prototype-only mutable `STAKED_POSITIONS_LOCAL` array; `stakeRevision` bumps so the `/earn` overview, which subscribes to it, recomputes its merged list (`STAKED_POSITIONS` + `STAKED_POSITIONS_LOCAL`).

### `lib/tradeStore.ts` (Zustand, iter 4)
Single client store powering `/trade*`. Survives across the trade subtree without prop-drilling.

```ts
type TradeSide = { symbol: string; amount: string };
type LastTrade = { from, to, rate, feePct, feeQuote, quoteSymbol, executedAt };
type TradeState = {
  from: TradeSide;                // { symbol, amount: '' default }
  to: { symbol: string };
  feePct: number;                 // initial = TRADE_FEE_PCT
  ratePulseTick: number;          // bumped every 10s while /trade is mounted
  lastTrade: LastTrade | null;
  setFrom(symbol), setTo(symbol), setAmount(amount),
  swapDirection(), bumpPulseTick(), commitTrade(snapshot), reset(),
};
export const useTradeStore = create<TradeState>(...);
export function jitterRate(baseRate, tick): number;     // deterministic ±0.3% by tick
```
The 10s pulse interval is set in a `useEffect` inside `app/(shell)/trade/page.tsx` (not in the store itself, so it cleans up when the user leaves the trade tab).

## Utilities
Location: `lib/utils.ts`.

- `formatMoney(value, currency='USD')` — `Intl.NumberFormat` with min/max 2 decimals
- `formatPct(value)` — `+1.15%` / `−0.37%` (uses U+2212)
- `formatCrypto(value, symbol)` — trims trailing zeros, `"0.00067428 BTC"`
- `maskAmount(s)` — replaces digits and separators with `•` for hidden balances
- `fauxQR(seed, cells=21)` — returns `boolean[][]` deterministic grid with 3 finder patterns carved at corners (iter 3)
- `formatNumber(n, decimals=2)` — localized fixed-decimal number (iter 4)
- `formatCompact(n, currency?)` — `1.54T` / `$280B` / `16M` style notation (iter 4)
- `formatPrice(value, currency='EUR')` — magnitude-aware decimals (≥100 → 2dp, ≥1 → 2dp, ≥0.01 → 4dp, else 6dp). Use for market prices (iter 4)
- `trimAmount(s)` — drops trailing zero decimals from a numeric string (iter 4)
- `formatShortDate(d)` — `DD/MM/YY` for staking dates (iter 5)

### `lib/motion.ts` (iter 7)
- `useReveal()` — returns Framer Motion props for the standard fade-in-up reveal. Honors `prefers-reduced-motion` (no-op when reduced).
- `useStagger(index, stepMs=40)` — returns the `delay` (in seconds) for the n-th child in a stagger. Returns 0 under reduced-motion.

### `lib/haptics.ts` (iter 7)
Centralized vibration API. All calls fall through silently when unsupported.
```ts
haptics.light()    // 8ms — toggle, chip, segmented switch
haptics.medium()   // 16ms
haptics.heavy()    // 32ms
haptics.success()  // [8, 30, 8] — slide-to-confirm threshold reached
haptics.warning()  // [12, 50, 12] — insufficient balance, etc.
```
Replace any new `navigator.vibrate?.()` with these named calls.

### `lib/useBodyScrollLock.ts` (iter 7)
`useBodyScrollLock(locked: boolean)` — locks `document.body.overflow` while `locked` is true. Call inside any bottom-sheet component to prevent iOS Safari scroll-through. Already wired in `HintSheet`, `ComplianceSheet`, `FeeSheet`, `PickerRow`, and the SEPA QR sheet.

### `lib/toastStore.ts` (iter 7)
Zustand singleton + convenience `toast()` API. **No provider needed** — works from any component, server or client.
```ts
import { toast } from "@/lib/toastStore";
toast("Done");
toast.success("IBAN copied");
toast.warning("Rate moved during review");
toast.error("Couldn't share");
toast.dismiss();
```
The visible UI is rendered by `<ToastViewport />` (mounted once in root layout). One toast at a time; newer toasts replace older with a 220ms exit. Default duration 1800ms.

## Demo / reset

Local prototype state lives in:
- **Zustand stores**: `useTradeStore` (trade form + last executed trade), `useEarnStore` (stake form + last stake), `useToastStore` (current toast)
- **In-memory mutable arrays**: `STAKED_POSITIONS_LOCAL` in `lib/mocks.ts`
- **localStorage**: per-asset compliance acks under keys `venga.compliance.<SYMBOL>` (set by `/deposit/asset/[symbol]`)

**Menu → Reset prototype data** (iter 7) clears all of the above and routes to `/`. When adding a new piece of local state in future iterations, wire its cleanup into `onResetPrototype` in `app/menu/page.tsx` — otherwise demos drift over time.

## How to request an edit without a full rebuild

**Pattern for one-off edits:**
1. In your prompt, say "Read `CLAUDE.md`" as the first instruction.
2. Describe only the specific change, referencing the screen/component by name (e.g. "Change BalanceCard so the eye-icon is on the left, not bottom-right").
3. Claude Code opens the mentioned file, makes the edit, and updates `CLAUDE.md` if the component API changed.

**Do not** ask Claude to rebuild the whole app for a single-component change. The codebase is modular: each screen and component lives in its own file with clear boundaries.

**Pattern for adding a new screen:**
1. Read `CLAUDE.md`.
2. Describe the new screen referencing existing primitives (MenuRow, BalanceCard, etc.) — reuse, don't duplicate.
3. If new mocks are needed, add to `lib/mocks.ts`.
4. Register the route in the screen inventory table above.

**Pattern for feature iterations:**
Sequential iteration prompts (`code-prompt-02-*.md`, `-03-*.md`, etc.) each open with "Read `CLAUDE.md`" and scope the work to their listed screens.

## Iteration log
- **Iteration 1** — scaffold, design tokens, Home (`/`), Menu (`/menu`), bottom tab bar, 22 stubs, mocks, all shared primitives.
- **Iteration 2** — Wallet (`/wallet`), Asset Detail (`/asset/[symbol]`); added `PortfolioCard`, `SegmentedControl`, `Sparkline`, `StatGrid`, `AssetActionButton`; extended `MarketRow` with `variant` prop; extended `TopHeader` with optional `title`; added `ASSETS_EARNABLE`, `ASSET_DETAILS`, `generateSparkline`, `PORTFOLIO_DELTA_USD_24H` to mocks.
- **Iteration 3** — Full Deposit flow. Replaced the iter-1 `/deposit` stub with a method picker; added SEPA IBAN screen, crypto asset picker, QR-and-address screen with gating compliance sheet, and a shared success screen. Stubbed card and external-wallet methods. New components: `DepositMethodCard`, `CopyButton`, `FauxQR`, `SuccessCheck`, `ComplianceSheet`. Extended `StripedBorder` with `radius` prop and `MarketRow` with `'deposit'` variant + optional `href`. New mocks: `ASSET_NETWORKS`, `generateMockAddress`, `VENGA_IBAN`, plus `fauxQR()` utility.
- **Iteration 7 (FINAL)** — Polish pass. **No new screens, no new features.** Added the global toast system (`lib/toastStore.ts` + `<ToastViewport>`) replacing scattered `alert()`s and inline copy chips; added `Skeleton`, `EmptyState`, `OfflineBanner`; added `app/error.tsx` (route-level error boundary) and `app/not-found.tsx` (custom 404). Foundation libraries: `lib/motion.ts` (`useReveal`/`useStagger` reduced-motion-aware), `lib/haptics.ts` (centralized vibration calls), `lib/useBodyScrollLock.ts`. Token: `--orange-deep` for press states. CSS polish: focus-visible ring, tap-highlight off, `100dvh` utilities, 16px input minimum (Safari zoom prevention), reduced-motion guard, skeleton shimmer keyframe, skip-to-content link. Layout polish: `viewport-fit=cover`, theme-color matches cream, `<main id="main">` skip target, `<ToastViewport>` + `<OfflineBanner>` mounted globally. Body-scroll-lock applied to all four sheet components. CopyButton refactored to call `toast.success` instead of internal "Copied" state. Wallet shows skeleton rows on first 400ms mount + the new `EmptyState` for filtered-empty. Menu adds **Reset prototype data** row below the destructive zone (clears Trade + Earn stores + `STAKED_POSITIONS_LOCAL` + per-asset compliance acks in localStorage). New README with deploy button, demo flows, gotchas + 4 placeholder SVG screenshots in `public/screenshots/`.

### Polish-pattern conventions (iter 7)
**Toasts vs dialogs** — toasts (`toast.success(...)`) are for **acknowledgement** (one-shot "done, continue"); dialogs (`<ConfirmModal>`, `<HintSheet>`) are for **decisions** (irreversible, requires Yes/No). Don't confuse them. Never use `alert()` or `confirm()`.

**Loading states** — use `<Skeleton>` for any list/card that simulates a fetch. Use `<EmptyState>` whenever a filter/search yields zero results. Don't roll new ad-hoc empty-state divs.

**Network state** — `<OfflineBanner>` is global. New code that displays prices or rates is automatically covered.

**Reset helper** — when adding new local state (Zustand stores, localStorage keys, mutable mocks), wire the cleanup into `app/menu/page.tsx` `onResetPrototype`. Demo presenters depend on it.

**Sheets** — every new bottom-sheet component must call `useBodyScrollLock(open)` to prevent iOS Safari scroll-through.

**Inputs** — minimum `text-[16px]` font-size on `<input>`/`<textarea>` to prevent iOS focus-zoom. Globals.css enforces 16px on bare element selectors, but Tailwind class overrides (`text-[14px]`, `text-[15px]`) win on specificity — keep classes at 16px+.

**Animation hooks** — new screens should use `useReveal()` and `useStagger(i)` from `lib/motion.ts` instead of hardcoded `initial/animate/transition` objects, so `prefers-reduced-motion` is honoured automatically.

**Haptics** — call `haptics.light/medium/heavy/success/warning()` instead of `navigator.vibrate?.()` directly.

- **Iteration 6** — Settings sub-screens (15 menu pages) + the two remaining deposit method screens (Card, External wallet) + the Earn history screen. Total: 19 screens, all non-shell. Introduced four reusable screen scaffolds (`SettingsListScreen`, `TogglesScreen`, `RadioListScreen`, `DocumentScreen`) so individual pages stay under ~60 lines. New components: `Toast` + `useToast`, `Radio`, `TextInput`, `Textarea`, `PickerRow`, `Callout`. Extended `MenuRow` with `sublabel` + `trailing` (backwards-compatible). New mocks: `LINKED_BANKS`, `LOGIN_SESSIONS`, `WHITELISTED_ADDRESSES`, `FAQS`, `CHANGELOG`, `EARN_HISTORY`.

### Apple Pay deposit pattern (iter 6 → updated)
`/deposit/method/card` is the **Apple Pay** flow (the URL kept its iter-3 path for stability). It displays an amount input, a saved-cards picker (2 mock cards in Apple Wallet), a fee summary, and a black "Pay with Apple Pay" CTA. Tapping the CTA opens a custom Apple-Pay-styled bottom sheet (black header bar, large amount, card row, Face ID glyph, Cancel + Confirm buttons). Confirm runs an 800ms processing simulation, then routes to `/deposit/success?method=card&asset=EUR&amount=…`.

**Why the old card-fields safety pattern no longer applies:** Apple Pay never asks the user to type card numbers into the app — cards live in the OS's Wallet, and the in-app UI only collects the *amount*. So we don't have non-functional placeholders to defend; the only thing simulated is the OS-mediated confirmation, which is clearly labelled. The disclaimer at the bottom of the confirmation sheet reads: "Apple Pay confirmation is simulated — no real payment is processed."

The deposit method picker (`/deposit`) shows this option as **"Apple Pay · 1.5% fee · Use cards in your Wallet"** with the Lucide `Apple` icon.

### External wallet pattern (iter 6)
`/deposit/method/external` lists 6 wallet brands (MetaMask, Trust, Ledger, Coinbase, WalletConnect, Phantom) using colored monogram tiles. Tapping any wallet opens a `HintSheet` whose primary CTA routes to `/deposit/method/crypto` (the address-based fallback). No actual WalletConnect or wallet-SDK integration is wired in this iteration — that's iter 7+ scope.

- **Iteration 5** — Full Earn flow. Replaced the iter-1 `/earn` stub with an overview screen (yellow-orange striped Earn-balance hero + Available/Staked underline-tab segmented). Added `/earn/stake/[symbol]` (form), `/earn/stake/[symbol]/review`, `/earn/stake/[symbol]/success`, `/earn/staked/[positionId]` (rainbow-progress detail), and an `/earn/history` stub for iter 6. New components: `Toggle`, `RainbowChip`, `RainbowProgress`, `HintSheet`, `EarnableAssetCard`, `StakedPositionCard`. Extended `SegmentedControl` with `style: 'pill' | 'underline'`. New `lib/earnStore.ts` (Zustand) holds the stake form state across the subtree and appends confirmed stakes to `STAKED_POSITIONS_LOCAL`. New mocks: `EARNABLE_ASSETS`, `STAKED_POSITIONS`, `STAKED_POSITIONS_LOCAL`, `findEarnable`, `findStakedPosition`, `daysElapsed`, `endOfLockup`, `assetsAvailableDate`, `EARN_BALANCE_USD`, `EARN_BALANCE_DELTA_USD_TODAY`. New util: `formatShortDate`.

### Earn flow
- **Deeplinks**: `/earn?asset=<SYMBOL>` is read in `/earn/page.tsx` via `useSearchParams` (Suspense-wrapped) — if the symbol is in `EARNABLE_ASSETS`, `router.replace('/earn/stake/<SYMBOL>')`. Asset Detail's "Earn" button (added in iter 2) sends `?asset=<symbol>` and lands users straight on the form. Non-earnable symbols stay on the overview.
- **State store** mirrors the Trade pattern: `useEarnStore()` is the single source of truth for the stake form (symbol, amount, autoRenew). The amount is sanitized in the store (digits + one decimal point). Form → review → success all subscribe to the same store; success reads `lastStake` for the View-position CTA.
- **STAKED_POSITIONS_LOCAL append**: on slide-to-confirm in `/review`, a new `StakedPosition` is pushed to the in-memory mutable array AND `stakeRevision` is bumped on the store. The `/earn` overview subscribes to `stakeRevision`, so its merged-list `useMemo` recomputes and the new card appears in the Staked segment immediately.
- **Position detail mutability**: `/earn/staked/[positionId]` mirrors the position's `autoRenew` into a local `useState` for the toggle UI, and also mutates the underlying object on toggle change so the prototype's truth survives across navigations within the same session. (In production this would be a server mutation.)
- **Tab-bar visibility**: only `/earn` shows the bottom tab bar — sub-routes live under `app/earn/...` (outside the `(shell)` route group) so they don't get the tab bar.
- **Edge cases** the form handles: non-earnable symbol → `<StubScreen>`; zero balance → yellow info card prompting `/deposit/asset/<symbol>` (links back to iter-3 deposit flow); insufficient amount → red ring on the input + "Insufficient balance" text + Continue button stays in disabled state.

- **Iteration 4** — Full Trade flow. Replaced the iter-1 `/trade` stub with a unified market-order form (intent-aware deeplinks for Buy/Sell/Trade); added `/trade/select-asset` (sheet-styled full route), `/trade/review` (rate countdown + slide-to-confirm), `/trade/success`, `/trade/markets` (filterable pair list), `/trade/markets/[pair]` (chart + Buy/Sell). New components: `TradeAssetField`, `SlideToConfirm`, `FeeSheet`, `RateTickerPill`. Extended `MarketRow` with `'pair'` discriminated variant. New `lib/tradeStore.ts` (Zustand) holds the single source of truth across the subtree. New mocks: `MARKETS`, `pairToSlug`/`findMarket`/`getGainers`/`getLosers`/`getPopularMarkets`, `computeRate`, `generatePairSparkline`, `iconVarFor`. New utils: `formatNumber`, `formatCompact`, `formatPrice`, `trimAmount`. Added `zustand` to dependencies.

### Trade flow
- **State store** `lib/tradeStore.ts` (Zustand): single `useTradeStore()` hook. The form, the picker, review, and success all read/write the same store, so deeplinks → form → review → success works without prop-drilling or URL-stuffing intermediate state.
- **Deeplinks** into `/trade?from=<symbol>&intent=<buy|sell>` — handled by an `initialised` ref guard in the form so query params are only applied once on mount. Mapping: `intent=buy` ⇒ `from=EUR, to=<symbol>`; `intent=sell` ⇒ `from=<symbol>, to=EUR`; bare `from=<symbol>` ⇒ `from=<symbol>, to=EUR` (or BTC if symbol is EUR). An optional `to=<symbol>` overrides whatever default was picked — used by Pair Detail's Buy/Sell links to set both sides.
- **Picker as route, not modal**: `/trade/select-asset?role=from|to` is a real page (so the URL bar is honest), styled to look like a bottom-sheet. Selecting an asset writes to the store and `router.back()`s. Same-asset selection is prevented by filtering out the current opposite side.
- **Rate pulse**: `bumpPulseTick()` is called every 10s by an interval inside the form's `useEffect`. The interval is cleaned up on unmount (so leaving the Trade tab stops the tick). Review uses `jitterRate(baseRate, tick)` to apply a deterministic ±0.3% wiggle per tick; if the difference between mount-time rate and current rate exceeds 0.5%, a yellow banner appears and the slider is briefly disabled (1.5s).
- **Slide-to-confirm**: shared between `/trade` (→ review) and `/trade/review` (→ success). Triggers `navigator.vibrate?.(40)` on success.
- **Markets**: only reachable from `/trade` via the "Browse →" link in the form header. There is no tab pointing to `/trade/markets`. `MARKETS` mocks are independent of `ASSETS` (they're trade pairs, not balance entries) but are linked through `iconVarFor(base)` so the same coin SVGs render.
- **Tab-bar visibility**: only `/trade` (and other shell routes) show the bottom tab bar — sub-routes live under `app/trade/...` (outside the `(shell)` route group), so they get the root layout without the tab bar.

### Deposit flow
- **Entry points**: `/deposit` (method picker) and the deeplink form `/deposit?asset=<SYMBOL>`. The picker uses `useSearchParams` (wrapped in `<Suspense>`) and `router.replace()`s on mount: `asset=EUR` → `/deposit/method/sepa`; any other symbol → `/deposit/asset/<UPPER>`.
- **Methods**: SEPA (built), Crypto (asset picker built), Card (stub), External wallet (stub).
- **Asset deposit page** (`/deposit/asset/[symbol]`): renders `<ComplianceSheet open={hydrated && !confirmed}>` over a dimmed body until the user ticks the network-confirmation checkbox; sheet is non-dismissible (no backdrop tap close). The sheet also offers an optional "Don't show this again for `<SYMBOL>`" checkbox; when ticked and confirmed, the page persists `localStorage["venga.compliance.<SYMBOL>"] = "1"` and skips the sheet on future visits to that asset. The `hydrated` flag is set in a mount `useEffect` after the localStorage read, so previously-acked users don't see a flash of the sheet. Address comes from `generateMockAddress(symbol)`; network/format from `ASSET_NETWORKS[symbol]`. Unsupported symbols render a friendly "unknown asset" fallback with a link back to the crypto picker.
- **Success screen** (`/deposit/success`): reads `?method=`, `?asset=` via `useSearchParams` (also wrapped in `<Suspense>`); renders `SuccessCheck` plus method-contextual headline + subhead, primary "Go to wallet" CTA and secondary "Back to home".
