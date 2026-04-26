import Link from "next/link";
import { CoinIcon } from "./icons";
import type { Asset, Market } from "@/lib/mocks";
import { iconVarFor, pairToSlug } from "@/lib/mocks";
import {
  formatMoney,
  formatPct,
  formatCrypto,
  formatPrice,
} from "@/lib/utils";

type AssetVariant = "market" | "wallet" | "deposit";

type AssetProps = {
  asset: Asset;
  variant?: AssetVariant;
  href?: string;
  market?: never;
};

type PairProps = {
  market: Market;
  variant: "pair";
  href?: string;
  asset?: never;
};

type Props = AssetProps | PairProps;

export default function MarketRow(props: Props) {
  if (props.variant === "pair") return <PairRow {...props} />;
  return <AssetRow {...(props as AssetProps)} />;
}

/* -------- pair variant -------- */

function PairRow({ market, href }: PairProps) {
  const positive = market.change24hPct >= 0;
  const slug = pairToSlug(market);
  const finalHref = href ?? `/trade/markets/${slug}`;

  return (
    <Link
      href={finalHref}
      className="flex items-center gap-4 py-4 border-b border-hair"
    >
      <div className="shrink-0">
        <CoinIcon variant={iconVarFor(market.base)} size={44} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-semibold text-ink leading-tight">
          {market.base}
          <span className="text-ink-70 font-normal">/{market.quote}</span>
        </div>
        <div className="mt-1 text-[12px] text-ink-40">{market.quote} pair</div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[16px] font-semibold text-ink font-nums leading-tight">
          {formatPrice(market.price, market.quote === "EUR" ? "EUR" : "USD")}
        </span>
        <span
          className={`mt-1 inline-block text-[12px] font-semibold px-2 py-0.5 rounded-pill font-nums ${
            positive ? "bg-mint text-mint-deep" : "bg-red-tint text-red"
          }`}
        >
          {formatPct(market.change24hPct)}
        </span>
      </div>
    </Link>
  );
}

/* -------- asset variants (market / wallet / deposit) -------- */

function AssetRow({ asset, variant = "market", href }: AssetProps) {
  const positive = asset.price24hPct >= 0;
  const isZero = asset.balance === 0;
  const dim = variant === "wallet" && isZero;

  const finalHref =
    href ??
    (variant === "deposit"
      ? `/deposit/asset/${asset.symbol}`
      : `/asset/${asset.symbol}`);

  return (
    <Link
      href={finalHref}
      className={`flex items-center gap-4 py-4 border-b border-hair ${
        dim ? "opacity-70" : ""
      }`}
    >
      <div className="shrink-0">
        <CoinIcon variant={asset.iconVar} size={44} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-[16px] font-semibold text-ink leading-tight">
            {asset.name}
          </div>
          {variant === "deposit" && (
            <span className="text-[11px] font-semibold text-ink-70 bg-cream-3 px-2 py-0.5 rounded-pill">
              {asset.symbol}
            </span>
          )}
        </div>
        {variant !== "deposit" && (
          <div className="mt-1">
            <span
              className={`inline-block text-[12px] font-semibold px-2 py-0.5 rounded-pill font-nums ${
                positive ? "bg-mint text-mint-deep" : "bg-red-tint text-red"
              }`}
            >
              {formatPct(asset.price24hPct)}
            </span>
          </div>
        )}
      </div>

      {variant === "market" && (
        <div className="text-[16px] font-semibold text-ink font-nums">
          {formatMoney(asset.priceUSD, "USD")}
        </div>
      )}

      {variant === "wallet" && (
        <div className="flex flex-col items-end">
          {isZero ? (
            <span className="inline-flex items-center h-7 px-3 rounded-pill border border-hair text-[12px] font-semibold text-ink">
              Deposit
            </span>
          ) : (
            <>
              <span className="text-[16px] font-semibold text-ink font-nums leading-tight">
                {formatCrypto(asset.balance, asset.symbol)}
              </span>
              <span className="text-[13px] text-ink-70 font-nums mt-0.5">
                {formatMoney(asset.valueUSD, "USD")}
              </span>
            </>
          )}
        </div>
      )}

      {variant === "deposit" && (
        <span className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-orange text-orange text-[12px] font-semibold">
          Deposit →
        </span>
      )}
    </Link>
  );
}
