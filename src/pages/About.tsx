import { Link } from "react-router-dom";
import { CtaBand, PageHero, RouteFX, SectionHead } from "../components/PageBits";
import { AreasServed, ContactSection } from "../components/Sections";
import { BUSINESS, SERVICES } from "../data";

const TIMELINE = [
  {
    year: "2008",
    title: "FS Real Estate opens its doors",
    desc: "We start as a local consultancy in Andheri West, built on one belief — a property deal should feel like it's completed, not endured.",
  },
  {
    year: "2010s",
    title: "Western suburbs, covered",
    desc: "Juhu, Versova, Bandra West, Goregaon, Malad — our clients follow us across the western suburbs, and so do we.",
  },
  {
    year: "2017",
    title: "RERA era",
    desc: "MahaRERA changes how Mumbai buys property. We rebuild our process around verification and paperwork — clients stop worrying about title.",
  },
  {
    year: "Today",
    title: "One team, every transaction",
    desc: "Buying, selling, renting, leasing, commercial, advisory — residential and commercial under one roof, from one office on Millat Nagar Rd.",
  },
];

export default function About() {
  return (
    <>
      <RouteFX
        title="About FS Real Estate | Property Consultancy in Andheri West since 2008"
        description="FS Real Estate — a residential & commercial property consultancy in Andheri West, Mumbai since 2008. We complete you."
      />
      <PageHero
        eyebrow="About us"
        title="We complete you."
        sub="That's been the whole business since 2008 — complete the deal, complete the paperwork, complete the client's peace of mind."
        img="/img/office.jpg"
      />

      <section className="bg-cream py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Who we are" title={<>A consultancy,<br />not a portal.</>} />
              <div className="reveal mt-5 space-y-4 leading-relaxed text-charcoal/70">
                <p>
                  FS Real Estate is a residential and commercial property consultancy based in
                  Andheri West, Mumbai. We don't list thousands of anonymous properties — we advise
                  people through the biggest financial decision of their lives, one client at a
                  time.
                </p>
                <p>
                  That means honest pricing guidance, title and RERA verification before you sign
                  anything, and someone who picks up the phone when it matters. Eighteen years on
                  the same streets means we know which buildings hold value and which ones just
                  look good in photos.
                </p>
                <p>
                  {BUSINESS.hindiName} — the name says what we do.{" "}
                  <strong className="text-charcoal">{BUSINESS.tagline}.</strong>
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2" data-stagger>
              {[
                { k: `Est. ${BUSINESS.est}`, v: "Andheri West office" },
                { k: "Residential + Commercial", v: "One team, every deal" },
                { k: "10 suburbs", v: "Across the western line" },
                { k: "RERA-verified process", v: "Paperwork done right" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="reveal rounded-3xl bg-royal p-7 text-cream shadow-lg"
                >
                  <div className="gold-rule w-10" />
                  <p className="mt-4 font-display text-xl leading-snug">{c.k}</p>
                  <p className="mt-1 text-sm text-cream/60">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-white py-12 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <SectionHead center eyebrow="Our story" title={<>Since 2008.</>} />
          <div className="mt-10 space-y-0">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="reveal relative flex gap-6 pb-10 last:pb-0">
                {i < TIMELINE.length - 1 && (
                  <span className="absolute left-[39px] top-16 h-[calc(100%-4rem)] w-0.5 bg-gold/50" />
                )}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-royal font-display text-lg font-bold text-cream">
                  {t.year}
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl text-charcoal md:text-2xl">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal/65">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services recap + areas */}
      <section className="bg-royal-night py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHead dark eyebrow="What we handle" title={<>Six ways we<br />complete you.</>} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="reveal rounded-2xl border border-cream/12 bg-white/[0.04] p-6"
              >
                <h3 className="font-display text-xl text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.desc}</p>
              </div>
            ))}
          </div>
          <AreasServed dark />
          <div className="reveal mt-10">
            <Link
              to="/listings"
              className="btn-shine inline-flex min-h-[52px] items-center justify-center rounded-full bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-royal-deep"
            >
              Browse sample listings
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
      <ContactSection />
    </>
  );
}
