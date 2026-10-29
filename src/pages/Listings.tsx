import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ListingCard from "../components/ListingCard";
import { CtaBand, PageHero, RouteFX, SectionHead } from "../components/PageBits";
import { Reveal } from "../components/Fx";
import { LISTINGS, PRICE_BANDS, type Listing, type ListingType } from "../data";

type TypeFilter = "all" | ListingType;
type BhkFilter = "any" | "1" | "2" | "3" | "4";

/* numeric price for the slider: rupees (sale) or rupees/month (rent) */
function priceValue(l: Listing): number {
  const m = l.price.replace(/,/g, "");
  const cr = m.match(/₹([\d.]+)\s*Cr/);
  if (cr) return parseFloat(cr[1]) * 1e7;
  const lk = m.match(/₹([\d.]+)\s*L/);
  if (lk) return parseFloat(lk[1]) * 1e5;
  const mo = m.match(/₹([\d.]+)\/mo/);
  if (mo) return parseFloat(mo[1]);
  return 0;
}

function fmtMax(v: number, isRent: boolean): string {
  if (isRent)
    return v >= 100000 ? `₹${parseFloat((v / 100000).toFixed(1))} L/mo` : `₹${Math.round(v / 1000)}k/mo`;
  if (v >= 1e7) return `₹${parseFloat((v / 1e7).toFixed(2))} Cr`;
  return `₹${Math.round(v / 1e5)} L`;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(16,28,82,0.10)]">
      <div className="skeleton-shimmer aspect-[4/3]" />
      <div className="space-y-3 p-6">
        <div className="skeleton-shimmer h-7 w-2/3 rounded-lg" />
        <div className="skeleton-shimmer h-5 w-full rounded-lg" />
        <div className="skeleton-shimmer h-4 w-1/2 rounded-lg" />
      </div>
    </div>
  );
}

const SLIDER_MAX: Record<TypeFilter, { max: number; step: number }> = {
  all: { max: 1e8, step: 5e5 },
  buy: { max: 1e8, step: 5e5 },
  rent: { max: 200000, step: 5000 },
  commercial: { max: 1e8, step: 5e5 },
};

export default function Listings() {
  const [params] = useSearchParams();
  const [type, setType] = useState<TypeFilter>((params.get("type") as TypeFilter) || "all");
  const [band, setBand] = useState(params.get("band") || "all");
  const [q, setQ] = useState(params.get("q") || "");
  const [bhk, setBhk] = useState<BhkFilter>("any");
  const [maxPrice, setMaxPrice] = useState<number>(SLIDER_MAX[(params.get("type") as TypeFilter) || "all"].max);
  const [filtering, setFiltering] = useState(false);

  const slider = SLIDER_MAX[type];
  const isRent = type === "rent";

  const results = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (type !== "all" && l.type !== type) return false;
      if (band !== "all" && l.priceBand !== band) return false;
      if (bhk !== "any") {
        if (bhk === "4" ? l.beds !== "4" : l.beds !== bhk) return false;
      }
      if (priceValue(l) > maxPrice) return false;
      if (q.trim()) {
        const needle = q.trim().toLowerCase();
        const hay = `${l.title} ${l.locality} ${l.address}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [type, band, q, bhk, maxPrice]);

  /* skeleton shimmer while filters settle */
  useEffect(() => {
    setFiltering(true);
    const t = window.setTimeout(() => setFiltering(false), 380);
    return () => window.clearTimeout(t);
  }, [type, band, q, bhk, maxPrice]);

  const setAll = (t: TypeFilter) => {
    setType(t);
    setMaxPrice(SLIDER_MAX[t].max);
    if (t === "rent") setBand("rent");
    else if (band === "rent") setBand("all");
    if (t === "commercial") setBhk("any");
  };

  return (
    <>
      <RouteFX
        title="Property Listings in Andheri West, Mumbai | FS Real Estate"
        description="Browse sample property listings — homes for sale, rentals, and commercial spaces across Andheri West and Mumbai's western suburbs. FS Real Estate."
      />
      <PageHero
        eyebrow="Listings"
        title="Find your next address."
        sub="Sample listings for illustration — call or WhatsApp us for today's live inventory."
        img="/img/locality2.jpg"
      />

      <section className="bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* filters */}
          <Reveal className="rounded-3xl bg-white p-5 shadow-[0_10px_40px_rgba(16,28,82,0.08)] md:p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
              <label className="flex min-h-[52px] items-center rounded-2xl border border-charcoal/12 bg-cream px-4">
                <span className="sr-only">Search locality</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search locality or address…"
                  className="w-full bg-transparent text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none"
                />
              </label>
              <div className="flex gap-2">
                {(["all", "buy", "rent", "commercial"] as TypeFilter[]).map((t) => (
                  <motion.button
                    key={t}
                    onClick={() => setAll(t)}
                    whileTap={{ scale: 0.94 }}
                    className={`flex min-h-[52px] flex-1 items-center justify-center rounded-2xl px-3 text-xs font-bold uppercase tracking-widest transition ${
                      type === t
                        ? "bg-royal text-white"
                        : "border border-charcoal/12 bg-cream text-charcoal/60 hover:border-royal hover:text-royal"
                    }`}
                  >
                    {t === "all" ? "All" : t === "buy" ? "Buy" : t === "rent" ? "Rent" : "Comm."}
                  </motion.button>
                ))}
              </div>
              <label className="flex min-h-[52px] items-center rounded-2xl border border-charcoal/12 bg-cream px-4">
                <span className="sr-only">Price band</span>
                <select
                  value={band}
                  onChange={(e) => setBand(e.target.value)}
                  className="w-full bg-transparent text-base text-charcoal focus:outline-none"
                >
                  {PRICE_BANDS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 grid gap-4 border-t border-charcoal/10 pt-4 md:grid-cols-2">
              {/* max price slider */}
              <div className="rounded-2xl bg-cream px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
                    Max {isRent ? "monthly rent" : "price"}
                  </span>
                  <span className="font-display text-xl font-bold text-royal">
                    {fmtMax(maxPrice, isRent)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={slider.max}
                  step={slider.step}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label={isRent ? "Maximum monthly rent" : "Maximum price"}
                  className="price-slider mt-2 w-full"
                  style={{ "--fill": `${(maxPrice / slider.max) * 100}%` } as React.CSSProperties}
                />
              </div>
              {/* BHK pills */}
              {type !== "commercial" && (
                <div className="flex items-center gap-2 overflow-x-auto rounded-2xl bg-cream px-5 py-4">
                  <span className="mr-1 shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
                    BHK
                  </span>
                  {(["any", "1", "2", "3", "4"] as BhkFilter[]).map((b) => (
                    <motion.button
                      key={b}
                      onClick={() => setBhk(b)}
                      whileTap={{ scale: 0.9 }}
                      className={`flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-5 text-xs font-bold uppercase tracking-widest transition ${
                        bhk === b
                          ? "bg-royal text-white"
                          : "border border-charcoal/15 bg-white text-charcoal/60 hover:border-royal hover:text-royal"
                      }`}
                    >
                      {b === "any" ? "Any" : b === "4" ? "4+" : b}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <p className="mt-6 text-sm text-charcoal/55">
            Showing <strong className="text-charcoal">{filtering ? "…" : results.length}</strong> of{" "}
            {LISTINGS.length} sample listings.
          </p>

          {filtering ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((l, i) => (
                  <ListingCard key={l.slug} listing={l} index={i} layout />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-3xl bg-white p-12 text-center"
            >
              <h3 className="font-display text-2xl text-charcoal">No matches in the samples.</h3>
              <p className="mt-2 text-charcoal/60">
                Our live inventory changes daily — call or WhatsApp us and we'll find it for you.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="bg-royal-night py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <SectionHead
            dark
            center
            eyebrow="Can't find it?"
            title={<>Tell us what you need.<br />We'll hunt it down.</>}
          />
          <p className="reveal mx-auto mt-5 max-w-xl text-cream/65">
            These are samples. Our actual inventory moves fast — share your budget and locality on
            WhatsApp and we'll send today's matching options.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
