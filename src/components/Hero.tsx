import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BUSINESS, LISTINGS } from "../data";

/* Static hero — Mumbai towers at dusk. No zoom, no video, no parallax. */
export default function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (type !== "all") params.set("type", type);
    navigate(`/listings?${params.toString()}`);
  };

  const localities = Array.from(new Set(LISTINGS.map((l) => l.locality)));

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-royal-night">
      {/* STATIC background image */}
      <img
        src="/img/hero.jpg"
        alt="Mumbai residential towers at dusk"
        draggable={false}
        className="hero-in-img absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-royal-night/95 via-royal-night/35 to-royal-night/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-12 md:pb-20">
        <p
          className="hero-fade text-center text-[11px] font-bold uppercase tracking-[0.4em] text-gold md:text-left md:text-xs"
          style={{ animationDelay: "0.2s" }}
        >
          Since 2008 · Andheri West, Mumbai
        </p>
        <h1
          className="hero-fade mt-4 text-center font-display text-4xl font-bold leading-[1.06] text-white md:text-left md:text-7xl md:leading-[1.02]"
          style={{ animationDelay: "0.35s" }}
        >
          We complete you.
          <span className="mt-2 block text-xl font-semibold text-cream/85 md:text-3xl">
            Buy, sell, rent & lease across Mumbai's western suburbs.
          </span>
        </h1>

        {/* search bar */}
        <form
          onSubmit={submit}
          className="hero-fade mt-8 rounded-3xl bg-cream/95 p-3 shadow-2xl backdrop-blur md:rounded-full md:p-2 md:pl-6"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="flex min-h-[52px] items-center rounded-2xl bg-white px-4 md:rounded-full">
              <span className="sr-only">Locality</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                list="fs-localities"
                placeholder="Locality — e.g. Andheri West"
                className="w-full bg-transparent text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none"
              />
              <datalist id="fs-localities">
                {localities.map((l) => (
                  <option key={l} value={l} />
                ))}
              </datalist>
            </label>
            <label className="flex min-h-[52px] items-center rounded-2xl bg-white px-4 md:rounded-full">
              <span className="sr-only">Looking to</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent text-base text-charcoal focus:outline-none"
              >
                <option value="all">Buy, rent or commercial</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>
            <div className="hidden min-h-[52px] items-center rounded-full bg-white px-4 md:flex">
              <span className="text-base text-charcoal/60">12 sample listings</span>
            </div>
            <button
              type="submit"
              className="btn-shine flex min-h-[52px] items-center justify-center rounded-2xl bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-royal-deep md:rounded-full"
            >
              Search
            </button>
          </div>
        </form>

        <div
          className="hero-fade mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start"
          style={{ animationDelay: "0.65s" }}
        >
          <a
            href={BUSINESS.phoneHref}
            className="btn-shine flex min-h-[52px] w-full items-center justify-center rounded-full bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-royal-deep sm:w-auto"
          >
            Call {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-shine flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-white/70 px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 sm:w-auto"
          >
            WhatsApp Us
          </a>
        </div>
        <p
          className="hero-fade mt-4 text-center text-xs text-cream/60 md:text-left"
          style={{ animationDelay: "0.75s" }}
        >
          {BUSINESS.hours} · {BUSINESS.hoursNote}
        </p>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 flex justify-center pb-6" aria-hidden="true">
        <div className="flex h-12 w-7 items-start justify-center overflow-hidden rounded-full border-2 border-white/40 p-1.5">
          <div className="cue-line h-3 w-1 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
