import { AreasServed, ContactSection } from "../components/Sections";
import { PageHero, RouteFX } from "../components/PageBits";
import { BUSINESS } from "../data";

export default function ContactPage() {
  return (
    <>
      <RouteFX
        title="Contact FS Real Estate | Andheri West, Mumbai"
        description="Reach FS Real Estate at A-31, Okaz Shopping Centre, Millat Nagar Rd, Andheri West, Mumbai. Call +91 91529 47571. Open Mon–Thu & Sat–Sun, 10:30 AM – 8:30 PM. Closed Fridays."
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        sub="Call, WhatsApp, or walk into our Andheri West office. The coffee's on us."
        img="/img/locality1.jpg"
      />

      <section className="bg-cream pb-4 pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-5 sm:grid-cols-3" data-stagger>
            {[
              {
                title: "Call us",
                body: BUSINESS.phones.map((p) => p.label).join(" · "),
                href: BUSINESS.phoneHref,
                cta: "Call Now",
              },
              {
                title: "WhatsApp",
                body: "Fastest reply — share your budget and locality.",
                href: BUSINESS.whatsapp,
                cta: "Chat",
              },
              {
                title: "Visit us",
                body: BUSINESS.shortAddress,
                href: `https://www.google.com/maps/search/${encodeURIComponent(
                  BUSINESS.mapQuery
                )}`,
                cta: "Directions",
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="reveal group rounded-3xl bg-white p-7 shadow-[0_10px_40px_rgba(16,28,82,0.08)] transition hover:-translate-y-1"
              >
                <div className="gold-rule w-10" />
                <h3 className="mt-4 font-display text-xl text-charcoal">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{c.body}</p>
                <span className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-royal">
                  {c.cta} →
                </span>
              </a>
            ))}
          </div>
          <div className="reveal mt-6 rounded-3xl bg-royal p-7 text-center md:p-9">
            <p className="font-display text-xl text-cream md:text-2xl">
              Open {BUSINESS.hours} ·{" "}
              <span className="font-bold text-gold">{BUSINESS.hoursNote}</span>
            </p>
          </div>
          <AreasServed />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
