import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "./Fx";

const STEPS = [
  {
    n: "01",
    title: "Enquire",
    desc: "Call or WhatsApp us with your budget and locality. We shortlist real options — no spammy bulk lists.",
  },
  {
    n: "02",
    title: "Site visit",
    desc: "We walk the properties with you, pointing out what the photos don't — light, noise, water, neighbours.",
  },
  {
    n: "03",
    title: "Negotiation",
    desc: "Eighteen years of Andheri West price data works in your favour. We negotiate hard, on your side.",
  },
  {
    n: "04",
    title: "Registration",
    desc: "Agreements drafted, stamp duty and registration handled, keys in your hand. Done right, done once.",
  },
];

export default function ProcessStepper() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="bg-white py-12 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-royal">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.08] text-charcoal md:text-5xl">
            Buying with us, in four steps.
          </h2>
          <div className="gold-rule mx-auto mt-5 w-16" />
        </Reveal>

        <div ref={ref} className="relative mt-12 md:mt-16">
          {/* track */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[27px] top-4 w-[3px] rounded-full bg-royal/10 md:left-[35px]"
          />
          {/* progress fill — draws as you scroll */}
          <motion.div
            aria-hidden="true"
            style={reduce ? { scaleY: 1 } : { scaleY }}
            className="absolute bottom-4 left-[27px] top-4 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold to-royal md:left-[35px]"
          />

          <div className="space-y-8 md:space-y-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 md:gap-8"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-royal font-display text-lg font-bold text-white shadow-lg md:h-[72px] md:w-[72px] md:text-xl">
                  {s.n}
                  <span className="absolute inset-0 rounded-full border-2 border-gold/60" aria-hidden="true" />
                </div>
                <div className="rounded-3xl border border-charcoal/10 bg-cream p-6 pt-5 md:p-7">
                  <h3 className="font-display text-xl text-charcoal md:text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal/65">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
