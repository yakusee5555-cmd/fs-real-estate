import { Link } from "react-router-dom";
import { CtaBand, PageHero, RouteFX } from "../components/PageBits";
import { POSTS } from "../data/posts";

export default function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <RouteFX
        title="Blog | FS Real Estate — Mumbai Property Guides"
        description="Plain-English guides to buying, renting, and RERA verification in Andheri West and Mumbai. By FS Real Estate."
      />
      <PageHero
        eyebrow="Blog"
        title="Mumbai property, explained plainly."
        sub="Guides we actually give our clients — no jargon, no hype."
        img="/img/blog2.jpg"
      />

      <section className="bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Link
            to={`/blog/${featured.slug}`}
            className="reveal group grid overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(16,28,82,0.12)] md:grid-cols-2"
          >
            <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
              <img
                src={featured.img}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-royal">
                Featured · {featured.date} · {featured.readTime}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-charcoal transition group-hover:text-royal md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/65">{featured.excerpt}</p>
              <span className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.2em] text-royal">
                Read article →
              </span>
            </div>
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" data-stagger>
            {rest.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="reveal group overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(16,28,82,0.08)] transition hover:-translate-y-1"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-royal">
                    {p.date} · {p.readTime}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-snug text-charcoal transition group-hover:text-royal">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-royal">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
