import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroV2 from "../components/HeroV2";
import ListingCard from "../components/ListingCard";
import EmiCalculator from "../components/EmiCalculator";
import PropertyQuiz from "../components/PropertyQuiz";
import ProcessStepper from "../components/ProcessStepper";
import AreaExplorer from "../components/AreaExplorer";
import { ContactSection } from "../components/Sections";
import { CtaBand, Faq, RouteFX, SectionHead } from "../components/PageBits";
import { Counter, Reveal, Stagger, StaggerItem } from "../components/Fx";
import { BUSINESS, FAQS, LISTINGS, SERVICES } from "../data";
import { POSTS } from "../data/posts";

const MARQUEE_ITEMS = [
  "Buy",
  "Sell",
  "Rent",
  "Lease",
  "Commercial",
  "Advisory",
  "Andheri West",
  "Juhu",
  "Versova",
  "Bandra West",
  "Since 2008",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-royal py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-cream">{it}</span>
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const WHY = [
  {
    title: "Serving Andheri West since 2008",
    desc: "Eighteen years on the same streets. We've seen every market cycle this suburb has had — and guided clients through all of them.",
  },
  {
    title: "Residential + commercial, one roof",
    desc: "Homes, offices, retail, and leased assets — you don't need three different agents. One team knows your whole portfolio.",
  },
  {
    title: "Paperwork done right",
    desc: "Title checks, RERA verification, registered agreements. The boring parts are where deals die — we don't let them.",
  },
  {
    title: "Local, reachable, accountable",
    desc: "Walk into our Millat Nagar office any working day, or call and talk to a person who knows your file — not a call centre.",
  },
];

const STATS = [
  { value: 18, suffix: "", label: "Years in Andheri West" },
  { value: 10, suffix: "", label: "Localities served" },
  { value: 6, suffix: "", label: "Service verticals" },
  { value: 12, suffix: "", label: "Sample listings live" },
];

export default function Home() {
  const featured = LISTINGS.slice(0, 6);
  const [emiAmount, setEmiAmount] = useState(8000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);

  return (
    <>
      <RouteFX
        title="FS Real Estate | Buy, Sell, Rent & Lease Property in Andheri West, Mumbai"
        description="FS Real Estate — residential & commercial property consultancy in Andheri West, Mumbai since 2008. Buying, selling, renting, leasing & advisory. Call +91 91529 47571."
      />
      <HeroV2 />
      <Marquee />

      {/* featured listings */}
      <section className="bg-cream py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Featured listings" title={<>Homes & spaces,<br />handpicked.</>} />
            <Reveal delay={0.1}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/listings"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-royal px-8 text-sm font-bold uppercase tracking-[0.2em] text-royal transition hover:bg-royal hover:text-white"
                >
                  All 12 listings
                </Link>
              </motion.div>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-2xl text-sm text-charcoal/55">
              Sample listings for illustration — the business will replace these with live inventory.
            </p>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l, i) => (
              <StaggerItem key={l.slug}>
                <ListingCard listing={l} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* EMI calculator */}
      <EmiCalculator
        amount={emiAmount}
        setAmount={setEmiAmount}
        rate={emiRate}
        setRate={setEmiRate}
        years={emiYears}
        setYears={setEmiYears}
      />

      {/* property match quiz */}
      <PropertyQuiz />

      {/* services */}
      <section className="bg-royal-night py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHead
            dark
            eyebrow="What we do"
            title={<>Every kind of property<br />transaction, covered.</>}
          />
          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <StaggerItem key={s.slug}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="h-full rounded-3xl border border-cream/12 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.08]"
                >
                  <div className="gold-rule w-10" />
                  <h3 className="mt-4 font-display text-2xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-cream/65">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-cream/55">
                        <span className="text-gold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
          <AreaExplorer dark />
        </div>
      </section>

      {/* how it works stepper */}
      <ProcessStepper />

      {/* why choose us + animated counters */}
      <section className="bg-cream py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHead eyebrow="Why FS Real Estate" title={<>The local advantage,<br />since 2008.</>} />
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-md leading-relaxed text-charcoal/65">
                  FS Real Estate is a consultancy, not a listings portal. When you work with us, you
                  get people who know which building has water issues, which lane floods in July, and
                  which society is about to go into redevelopment — because we've been here since
                  2008.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-6 inline-block">
                  <Link
                    to="/about"
                    className="btn-shine inline-flex min-h-[52px] items-center justify-center rounded-full bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-royal-deep"
                  >
                    About us
                  </Link>
                </motion.div>
              </Reveal>
              <Stagger className="mt-8 grid grid-cols-2 gap-4" gap={0.07}>
                {STATS.map((s) => (
                  <StaggerItem key={s.label}>
                    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_40px_rgba(16,28,82,0.08)]">
                      <p className="font-display text-4xl font-bold text-royal">
                        <Counter to={s.value} />
                        {s.suffix}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-charcoal/50">
                        {s.label}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Stagger className="grid gap-5 sm:grid-cols-2" gap={0.08}>
              {WHY.map((w) => (
                <StaggerItem key={w.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="h-full rounded-3xl bg-white p-7 shadow-[0_10px_40px_rgba(16,28,82,0.08)]"
                  >
                    <div className="gold-rule w-10" />
                    <h3 className="mt-4 font-display text-xl leading-snug text-charcoal">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{w.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* about strip with office image */}
      <section className="bg-white py-12 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-12 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl shadow-xl">
            <motion.img
              src="/img/meet.jpg"
              alt="Residential towers in Mumbai's western suburbs"
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHead eyebrow="Our office" title={<>Walk in. We're<br />right here.</>} />
            <Reveal delay={0.08}>
              <p className="mt-5 leading-relaxed text-charcoal/65">
                A-31, Okaz Shopping Centre, Millat Nagar Rd, Andheri West — our doors (and phone
                lines) are open Monday to Thursday and Saturday to Sunday, 10:30 AM to 8:30 PM.
                Fridays we rest.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={BUSINESS.phoneHref}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine inline-flex min-h-[52px] items-center justify-center rounded-full bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-royal-deep"
                >
                  Call Now
                </motion.a>
                <motion.a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp px-10 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110"
                >
                  WhatsApp
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* blog teasers */}
      <section className="bg-cream py-12 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="From the blog" title={<>Mumbai property,<br />explained plainly.</>} />
            <Reveal delay={0.1}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/blog"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-royal px-8 text-sm font-bold uppercase tracking-[0.2em] text-royal transition hover:bg-royal hover:text-white"
                >
                  All articles
                </Link>
              </motion.div>
            </Reveal>
          </div>
          <Stagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <StaggerItem key={p.slug}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group block overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(16,28,82,0.08)]"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-royal">
                        {p.date} · {p.readTime}
                      </p>
                      <h3 className="mt-2 font-display text-xl leading-snug text-charcoal transition group-hover:text-royal">
                        {p.title}
                      </h3>
                      <span className="mt-3 inline-block text-sm font-bold uppercase tracking-[0.2em] text-royal">
                        Read →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <SectionHead center eyebrow="Good to know" title={<>Questions, answered.</>} />
          <div className="mt-8">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>

      <CtaBand />
      <ContactSection />
    </>
  );
}
