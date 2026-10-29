import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BUSINESS } from "../data";

/* ---------- route effects: title, meta, reveal observer, scroll ---------- */
export function RouteFX({ title, description }: { title: string; description?: string }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((n) => io.observe(n));
    if (hash) {
      const t = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
      return () => {
        window.clearTimeout(t);
        io.disconnect();
      };
    }
    window.scrollTo(0, 0);
    return () => io.disconnect();
  }, [pathname, hash, title, description]);
  return null;
}

/* ---------- sub-page hero: compact on mobile ---------- */
export function PageHero({
  eyebrow,
  title,
  sub,
  img,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  img?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-royal-night pb-10 pt-32 md:pb-20 md:pt-44">
      {img && (
        <>
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-night via-royal-night/60 to-royal-night/30" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <p className="reveal text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
        <h1 className="reveal mt-3 max-w-3xl font-display text-3xl leading-[1.08] text-cream md:text-6xl md:leading-[1.05]">
          {title}
        </h1>
        {sub && (
          <p className="reveal mt-4 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
export function CtaBand({
  title = "Talk to us about your next move.",
  sub = "Call or WhatsApp — we usually reply within the hour during working hours.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="bg-cream py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="reveal flex flex-col items-start justify-between gap-6 rounded-3xl bg-royal p-8 md:flex-row md:items-center md:p-12">
          <div>
            <div className="gold-rule w-16" />
            <h2 className="mt-4 font-display text-2xl leading-tight text-cream md:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-base text-cream/70">{sub}</p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-4 inline-block font-display text-2xl text-cream underline decoration-gold decoration-4 underline-offset-8 hover:text-white md:text-3xl"
            >
              {BUSINESS.phone}
            </a>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={BUSINESS.phoneHref}
              className="btn-shine flex min-h-[52px] items-center justify-center rounded-full bg-cream px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-royal transition-colors hover:bg-white"
            >
              Call Now
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-shine flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="reveal divide-y divide-charcoal/10 rounded-3xl border border-charcoal/10 bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex min-h-[64px] w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="font-display text-lg tracking-wide text-charcoal md:text-xl">
                {f.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal text-xl text-cream transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base leading-relaxed text-charcoal/70">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- section heading helper ---------- */
export function SectionHead({
  eyebrow,
  title,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p
        className={`reveal text-[11px] font-bold uppercase tracking-[0.3em] ${
          dark ? "text-gold" : "text-royal"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`reveal mt-3 font-display text-3xl leading-[1.08] md:text-5xl md:leading-[1.05] ${
          dark ? "text-cream" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className={`reveal gold-rule mt-5 w-16 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
