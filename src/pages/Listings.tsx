import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { CtaBand, PageHero, RouteFX, SectionHead } from "../components/PageBits";
import { LISTINGS, PRICE_BANDS, type ListingType } from "../data";

type TypeFilter = "all" | ListingType;

export default function Listings() {
  const [params] = useSearchParams();
  const [type, setType] = useState<TypeFilter>(
    (params.get("type") as TypeFilter) || "all"
  );
  const [band, setBand] = useState(params.get("band") || "all");
  const [q, setQ] = useState(params.get("q") || "");

  const results = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (type !== "all" && l.type !== type) return false;
      if (band !== "all" && l.priceBand !== band) return false;
      if (q.trim()) {
        const needle = q.trim().toLowerCase();
        const hay = `${l.title} ${l.locality} ${l.address}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [type, band, q]);

  const setAll = (t: TypeFilter) => {
    setType(t);
    if (t === "rent") setBand("rent");
    else if (band === "rent") setBand("all");
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
          <div className="reveal rounded-3xl bg-white p-5 shadow-[0_10px_40px_rgba(16,28,82,0.08)] md:p-6">
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
                  <button
                    key={t}
                    onClick={() => setAll(t)}
                    className={`flex min-h-[52px] flex-1 items-center justify-center rounded-2xl px-3 text-xs font-bold uppercase tracking-widest transition ${
                      type === t
                        ? "bg-royal text-white"
                        : "border border-charcoal/12 bg-cream text-charcoal/60 hover:border-royal hover:text-royal"
                    }`}
                  >
                    {t === "all" ? "All" : t === "buy" ? "Buy" : t === "rent" ? "Rent" : "Comm."}
                  </button>
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
          </div>

          <p className="reveal mt-6 text-sm text-charcoal/55">
            Showing <strong className="text-charcoal">{results.length}</strong> of {LISTINGS.length}{" "}
            sample listings.
          </p>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {results.map((l, i) => (
                <ListingCard key={l.slug} listing={l} index={i} />
              ))}
            </div>
          ) : (
            <div className="reveal mt-6 rounded-3xl bg-white p-12 text-center">
              <h3 className="font-display text-2xl text-charcoal">No matches in the samples.</h3>
              <p className="mt-2 text-charcoal/60">
                Our live inventory changes daily — call or WhatsApp us and we'll find it for you.
              </p>
            </div>
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
