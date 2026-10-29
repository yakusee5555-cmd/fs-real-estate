import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BUSINESS, NAV, SERVICES, AREAS } from "../data";
import Logo from "./Logo";

/* ---------- scroll reveal ---------- */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- desktop nav link with sliding gold underline ---------- */
function NavLink({ href, label }: { href: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname === href;
  return (
    <Link
      to={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex min-h-[48px] items-center text-[13px] font-semibold uppercase tracking-wider transition ${
        active ? "text-royal" : "text-charcoal/70 hover:text-royal"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gold"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        />
      )}
    </Link>
  );
}

/* ---------- floating pill header + slide-out drawer ---------- */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/30 bg-cream/90 py-2.5 pl-3 pr-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md md:pl-5">
          <Link to="/" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-2.5">
            <Logo size={38} />
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-wide text-charcoal">
                FS Real Estate
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-royal">
                We complete you
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={BUSINESS.phoneHref}
              className="hidden min-h-[48px] items-center rounded-full bg-royal px-6 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-royal-deep sm:flex"
            >
              {BUSINESS.phone}
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-royal lg:hidden"
            >
              <span className={`h-[2px] w-5 bg-cream transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-cream transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 bg-cream transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* scrim */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* slide-out drawer */}
      <nav
        aria-label="Mobile menu"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-40 flex h-full w-[86%] max-w-sm flex-col bg-cream px-6 pb-10 pt-28 shadow-2xl transition-all duration-300 ease-out lg:hidden ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            to={n.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="flex min-h-[52px] items-center border-b border-charcoal/10 text-base font-bold uppercase tracking-wider text-charcoal"
          >
            {n.label}
          </Link>
        ))}
        <div className="mt-auto space-y-3 pt-8">
          <a
            href={BUSINESS.phoneHref}
            tabIndex={open ? 0 : -1}
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-royal text-sm font-bold uppercase tracking-widest text-royal"
          >
            {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className="flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp text-sm font-bold uppercase tracking-widest text-white"
          >
            WhatsApp Us
          </a>
        </div>
      </nav>
    </>
  );
}

/* ---------- areas served strip ---------- */
export function AreasServed({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 md:mt-14">
      <p
        className={`reveal text-[11px] font-bold uppercase tracking-[0.3em] ${
          dark ? "text-gold" : "text-royal"
        }`}
      >
        Areas we serve
      </p>
      <div className="reveal mt-5 flex flex-wrap gap-2.5">
        {AREAS.map((t) => (
          <span
            key={t}
            className={`inline-flex min-h-[48px] items-center rounded-full border px-5 text-sm font-semibold transition ${
              dark
                ? "border-cream/25 text-cream/85 hover:bg-cream hover:text-royal"
                : "border-royal/25 text-royal hover:bg-royal hover:text-white"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- contact section: info + map + form ---------- */
export function ContactSection() {
  const [sent, setSent] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    BUSINESS.mapQuery
  )}&output=embed`;
  return (
    <section id="contact" className="relative overflow-hidden bg-cream py-12 md:py-32">
      <p className="text-stroke-dark font-display pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap text-[16vw] uppercase leading-none opacity-60">
        Talk to us
      </p>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 md:px-12 md:pt-24 lg:grid-cols-2">
        <div>
          <p className="reveal text-[11px] font-bold uppercase tracking-[0.3em] text-royal">
            Contact
          </p>
          <h2 className="reveal mt-3 font-display text-3xl leading-[1.08] text-charcoal md:text-6xl md:leading-[1.05]">
            Let's find your
            <br />
            next address.
          </h2>
          <p className="reveal mt-5 max-w-md text-charcoal/65">
            Call or WhatsApp — we usually reply within the hour during working hours.
          </p>
          <div className="reveal mt-6 space-y-2">
            {BUSINESS.phones.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className={`block font-display text-2xl underline decoration-gold decoration-4 underline-offset-8 transition hover:text-royal md:text-4xl ${
                  p.primary ? "text-charcoal" : "text-charcoal/70"
                }`}
              >
                {p.label}
              </a>
            ))}
          </div>
          <dl className="reveal mt-8 space-y-4 text-charcoal/75">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/45">
                Visit us
              </dt>
              <dd className="mt-1">{BUSINESS.address}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/45">
                Hours
              </dt>
              <dd className="mt-1">
                {BUSINESS.hours}
                <br />
                <span className="font-semibold text-royal">{BUSINESS.hoursNote}</span>
              </dd>
            </div>
          </dl>
          <div className="reveal mt-8 overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg">
            <iframe
              title="FS Real Estate on the map"
              src={mapSrc}
              className="h-64 w-full md:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="reveal rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:p-9">
          {sent ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-royal text-3xl text-white">
                ✓
              </div>
              <h3 className="mt-5 font-display text-3xl text-charcoal">Thank you!</h3>
              <p className="mt-2 max-w-xs text-charcoal/70">
                We've noted your enquiry. Call or WhatsApp us at {BUSINESS.phone} and we'll take it
                from there.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <h3 className="font-display text-2xl text-charcoal">Request a callback</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/40 focus:border-royal focus:outline-none"
                />
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Phone"
                  className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/40 focus:border-royal focus:outline-none"
                />
              </div>
              <select
                required
                defaultValue=""
                className="min-h-[52px] w-full rounded-xl border border-charcoal/15 bg-cream px-4 text-base text-charcoal/70 focus:border-royal focus:outline-none"
              >
                <option value="" disabled>
                  I'm interested in
                </option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Other">Something else</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us what you're looking for (optional)"
                className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/40 focus:border-royal focus:outline-none"
              />
              <button
                type="submit"
                className="btn-shine min-h-[52px] w-full rounded-full bg-royal py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-royal-deep"
              >
                Send request
              </button>
              <p className="text-center text-xs text-charcoal/50">
                Prefer to talk?{" "}
                <a href={BUSINESS.phoneHref} className="font-bold text-royal">
                  Call {BUSINESS.phone}
                </a>{" "}
                or{" "}
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-whatsapp"
                >
                  WhatsApp us
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  return (
    <footer className="bg-royal-night py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span className="leading-none">
                <span className="block font-display text-xl font-bold text-cream">
                  FS Real Estate
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                  We complete you
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm text-cream/60">
              Residential & commercial property consultancy in Andheri West, Mumbai — serving you
              since {BUSINESS.est}.
            </p>
            <p className="mt-3 text-sm text-cream/60">{BUSINESS.hindiName}</p>
          </div>
          <nav aria-label="Explore">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Explore</p>
            <ul className="mt-4 space-y-1">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="flex min-h-[44px] items-center text-sm text-cream/70 hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/listings"
                  className="flex min-h-[44px] items-center text-sm text-cream/70 hover:text-cream"
                >
                  All listings
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Services">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Services</p>
            <ul className="mt-4 space-y-1">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/contact"
                    className="flex min-h-[44px] items-center text-sm text-cream/70 hover:text-cream"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              {BUSINESS.phones.map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="hover:text-cream">
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="pt-1 leading-relaxed">{BUSINESS.shortAddress}</li>
              <li className="pt-1">
                {BUSINESS.hours}
                <br />
                <span className="font-semibold text-gold">{BUSINESS.hoursNote}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 md:flex-row">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">Est. {BUSINESS.est} · Andheri West, Mumbai</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- mobile sticky CTA bar: Call Now + WhatsApp ---------- */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 md:hidden">
      <a
        href={BUSINESS.phoneHref}
        className="flex min-h-[60px] items-center justify-center gap-2 bg-royal px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-[13px] font-bold uppercase tracking-widest text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Call Now
      </a>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-[60px] items-center justify-center gap-2 bg-whatsapp px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-[13px] font-bold uppercase tracking-widest text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5L9.4 8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.3-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.2c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2z" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
