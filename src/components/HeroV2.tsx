import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS, LISTINGS } from "../data";

/* Subtle twinkling city-lights canvas over the hero image.
   Pauses off-screen; renders one static frame under reduced motion. */
function TwinkleLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const dots = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: 0.25 + Math.random() * 0.7,
      r: 0.8 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      warm: Math.random() > 0.45,
    }));

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.floor(rect.width / 2));
      h = canvas.height = Math.max(1, Math.floor(rect.height / 2));
    };
    size();
    window.addEventListener("resize", size);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const tw = reduce ? 0.55 : 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t / 1000 * d.speed + d.phase));
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.warm
          ? `rgba(240,192,48,${tw.toFixed(3)})`
          : `rgba(255,255,255,${(tw * 0.8).toFixed(3)})`;
        ctx.fill();
      }
    };

    if (reduce) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        if (running) raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(canvas);
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", size);
      };
    }
    return () => window.removeEventListener("resize", size);
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* Floating sample-property mini card — gentle drift, no pointer tracking. */
function FloatCard({
  listing,
  className,
  delay = 0,
  duration = 7,
}: {
  listing: (typeof LISTINGS)[number];
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 hidden w-52 overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur md:block ${className ?? ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { delay: 0.9 + delay, duration: 0.8 },
        y: { delay: 0.9 + delay, duration, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <img src={listing.img} alt="" className="h-24 w-full object-cover" loading="eager" />
      <div className="p-3">
        <p className="font-display text-base font-bold text-royal">{listing.price}</p>
        <p className="truncate text-xs text-charcoal/60">{listing.title}</p>
      </div>
    </motion.div>
  );
}

const line = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.15 + i * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroV2() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const reduce = useReducedMotion();

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
      {/* base photo */}
      <img
        src="/img/hero.jpg"
        alt="Mumbai residential towers at dusk"
        draggable={false}
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      {/* animated deep-blue gradient mesh */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="mesh-blob absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-royal/60 blur-[110px]" />
        <div
          className="mesh-blob2 absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-royal-deep/70 blur-[110px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="mesh-blob absolute bottom-0 left-1/3 h-[380px] w-[520px] rounded-full bg-royal-ink/70 blur-[120px]"
          style={{ animationDelay: "-12s" }}
        />
      </div>
      <TwinkleLights />
      <div className="absolute inset-0 bg-gradient-to-t from-royal-night/95 via-royal-night/30 to-royal-night/50" />

      {/* floating cards (desktop) */}
      {!reduce && (
        <>
          <FloatCard listing={LISTINGS[11]} className="right-[6%] top-[22%]" delay={0} duration={7} />
          <FloatCard listing={LISTINGS[3]} className="right-[15%] top-[44%]" delay={0.5} duration={8.5} />
        </>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-12 md:pb-20">
        <motion.p
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="text-center text-[11px] font-bold uppercase tracking-[0.4em] text-gold md:text-left md:text-xs"
        >
          Since 2008 · Andheri West, Mumbai
        </motion.p>
        <motion.h1
          custom={1}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-4 text-center font-display text-4xl font-bold leading-[1.06] text-white md:text-left md:text-7xl md:leading-[1.02]"
        >
          We complete you.
          <span className="mt-2 block text-xl font-semibold text-cream/85 md:text-3xl">
            Buy, sell, rent & lease across Mumbai's western suburbs.
          </span>
        </motion.h1>

        {/* search bar */}
        <motion.form
          custom={2}
          variants={line}
          initial="hidden"
          animate="show"
          onSubmit={submit}
          className="mt-8 rounded-3xl bg-cream/95 p-3 shadow-2xl backdrop-blur md:rounded-full md:p-2 md:pl-6"
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
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-shine flex min-h-[52px] items-center justify-center rounded-2xl bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white md:rounded-full"
            >
              Search
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start"
        >
          <motion.a
            href={BUSINESS.phoneHref}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shine flex min-h-[52px] w-full items-center justify-center rounded-full bg-royal px-10 text-sm font-bold uppercase tracking-[0.2em] text-white sm:w-auto"
          >
            Call {BUSINESS.phone}
          </motion.a>
          <motion.a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shine flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-white/70 px-10 text-sm font-bold uppercase tracking-[0.2em] text-white sm:w-auto"
          >
            WhatsApp Us
          </motion.a>
        </motion.div>
        <motion.p
          custom={4}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-4 text-center text-xs text-cream/60 md:text-left"
        >
          {BUSINESS.hours} · {BUSINESS.hoursNote}
        </motion.p>
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
