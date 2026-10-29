import { Link, useParams } from "react-router-dom";
import { CtaBand, RouteFX } from "../components/PageBits";
import { BUSINESS } from "../data";
import { POSTS } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <RouteFX title="Article not found | FS Real Estate" />
        <section className="bg-cream py-40 text-center">
          <Link to="/blog" className="font-bold text-royal">
            ← Back to blog
          </Link>
        </section>
      </>
    );
  }

  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <RouteFX
        title={`${post.title} | FS Real Estate`}
        description={post.excerpt}
      />
      <article className="bg-cream pb-12 pt-32 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Link
            to="/blog"
            className="reveal text-sm font-bold uppercase tracking-[0.25em] text-royal"
          >
            ← All articles
          </Link>
          <p className="reveal mt-4 text-xs font-bold uppercase tracking-[0.25em] text-charcoal/50">
            {post.date} · {post.readTime}
          </p>
          <h1 className="reveal mt-3 font-display text-3xl leading-[1.1] text-charcoal md:text-5xl">
            {post.title}
          </h1>
          <p className="reveal mt-4 text-lg leading-relaxed text-charcoal/65">{post.excerpt}</p>
        </div>
        <div className="reveal mx-auto mt-8 max-w-5xl px-6 md:px-12">
          <img
            src={post.img}
            alt={post.title}
            className="aspect-[16/8] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {post.body.map((para, i) => (
            <p
              key={i}
              className="reveal mt-6 text-base leading-[1.9] text-charcoal/75 md:text-lg"
            >
              {para}
            </p>
          ))}
          <div className="reveal mt-10 rounded-3xl bg-royal p-8 text-center">
            <div className="gold-rule mx-auto w-12" />
            <h2 className="mt-4 font-display text-2xl text-cream">
              Buying, selling, or renting in Mumbai?
            </h2>
            <p className="mt-2 text-sm text-cream/65">
              Talk to FS Real Estate — {BUSINESS.phone}
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={BUSINESS.phoneHref}
                className="btn-shine inline-flex min-h-[52px] items-center justify-center rounded-full bg-cream px-8 text-sm font-bold uppercase tracking-[0.2em] text-royal transition hover:bg-white"
              >
                Call Now
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp px-8 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="reveal font-display text-2xl text-charcoal md:text-4xl">
              Keep reading.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2" data-stagger>
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="reveal group flex gap-5 rounded-3xl bg-cream p-4 transition hover:-translate-y-1"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-28 w-36 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="py-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal">
                      {p.readTime}
                    </p>
                    <h3 className="mt-1 font-display text-lg leading-snug text-charcoal transition group-hover:text-royal">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
