import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { CtaBand, PageHero, RouteFX } from "../components/PageBits";
import { BUSINESS, LISTINGS } from "../data";

export default function ListingDetail() {
  const { slug } = useParams();
  const listing = LISTINGS.find((l) => l.slug === slug);
  const [sent, setSent] = useState(false);

  if (!listing) {
    return (
      <>
        <RouteFX title="Listing not found | FS Real Estate" />
        <PageHero eyebrow="Listings" title="Not found." sub="That listing doesn't exist." />
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Link
              to="/listings"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-royal px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              All listings
            </Link>
          </div>
        </section>
      </>
    );
  }

  const others = LISTINGS.filter((l) => l.slug !== listing.slug).slice(0, 3);

  return (
    <>
      <RouteFX
        title={`${listing.title} — ${listing.price} | FS Real Estate`}
        description={`${listing.title}, ${listing.locality} Mumbai — ${listing.price}. Contact FS Real Estate at ${BUSINESS.phone}.`}
      />
      <PageHero
        eyebrow={`${listing.typeLabel} · ${listing.locality}`}
        title={listing.title}
        sub={listing.address}
        img={listing.img}
      />

      <section className="bg-cream py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="reveal overflow-hidden rounded-3xl shadow-xl">
              <img
                src={listing.img}
                alt={listing.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <p className="reveal mt-4 text-xs text-charcoal/50">
              Sample listing for illustration — photos and details are indicative.
            </p>

            <div className="reveal mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: "Price", v: listing.price },
                { k: "Configuration", v: listing.beds === "—" ? "Commercial" : `${listing.beds} BHK` },
                { k: "Bathrooms", v: listing.baths === "—" ? "—" : listing.baths },
                { k: "Area", v: listing.area },
              ].map((f) => (
                <div key={f.k} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-royal">{f.k}</p>
                  <p className="mt-1 font-display text-xl text-charcoal">{f.v}</p>
                </div>
              ))}
            </div>

            <h2 className="reveal mt-10 font-display text-2xl text-charcoal md:text-3xl">
              About this property
            </h2>
            <p className="reveal mt-3 leading-relaxed text-charcoal/70">{listing.desc}</p>

            <h2 className="reveal mt-8 font-display text-2xl text-charcoal md:text-3xl">Features</h2>
            <ul className="reveal mt-4 grid gap-2.5 sm:grid-cols-2">
              {listing.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-medium text-charcoal/75 shadow-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-royal text-xs text-white">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* enquiry card */}
          <aside>
            <div className="reveal rounded-3xl bg-royal p-7 shadow-xl md:p-8 lg:sticky lg:top-28">
              <div className="gold-rule w-12" />
              <h3 className="mt-4 font-display text-2xl text-cream">Enquire about this property</h3>
              <p className="mt-2 text-sm text-cream/65">
                Reference: <span className="font-semibold text-cream">{listing.title}</span>
              </p>
              {sent ? (
                <div className="mt-6 rounded-2xl bg-white/10 p-6 text-center">
                  <p className="font-display text-xl text-cream">Thank you!</p>
                  <p className="mt-2 text-sm text-cream/70">
                    Call or WhatsApp us at {BUSINESS.phone} and mention this property — we'll take
                    it from there.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-6 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    placeholder="Phone"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-shine min-h-[52px] w-full rounded-full bg-cream py-4 text-sm font-bold uppercase tracking-[0.2em] text-royal transition hover:bg-white"
                  >
                    Request callback
                  </button>
                  <a
                    href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(
                      `Hi FS Real Estate, I'm interested in: ${listing.title} (${listing.price}).`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110"
                  >
                    WhatsApp about this
                  </a>
                </form>
              )}
              <a
                href={BUSINESS.phoneHref}
                className="mt-5 block text-center font-display text-xl text-cream underline decoration-gold decoration-2 underline-offset-4"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="reveal font-display text-2xl text-charcoal md:text-4xl">
              More sample listings.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {others.map((l, i) => (
                <ListingCard key={l.slug} listing={l} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
