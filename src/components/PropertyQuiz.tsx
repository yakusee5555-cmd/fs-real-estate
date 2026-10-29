import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LISTINGS, BUSINESS, type Listing } from "../data";
import { Reveal } from "./Fx";

const BUDGETS = [
  { value: "under50L", label: "Under ₹50 L" },
  { value: "50L-2Cr", label: "₹50 L – ₹2 Cr" },
  { value: "2Cr-5Cr", label: "₹2 Cr – ₹5 Cr" },
  { value: "5Cr+", label: "₹5 Cr+" },
  { value: "rent", label: "I want to rent" },
];

const BHKS = [
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4+ BHK" },
];

const INTENTS = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "commercial", label: "Commercial" },
];

function matchQuiz(budget: string, bhk: string, intent: string): Listing[] {
  return LISTINGS.filter((l) => {
    if (l.type !== intent) return false;
    if (intent === "commercial") return true;
    if (budget === "rent") return l.priceBand === "rent" && l.beds === bhk;
    return l.priceBand === budget && l.beds === bhk;
  }).slice(0, 3);
}

const stepAnim = {
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -48 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export default function PropertyQuiz() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<string | null>(null);
  const [bhk, setBhk] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setBudget(null);
    setBhk(null);
    setIntent(null);
  };

  const results = budget && bhk && intent ? matchQuiz(budget, bhk, intent) : [];

  const pick = (
    title: string,
    options: { value: string; label: string }[],
    onPick: (v: string) => void
  ) => (
    <div>
      <h3 className="font-display text-2xl text-charcoal md:text-3xl">{title}</h3>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <motion.button
            key={o.value}
            onClick={() => onPick(o.value)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex min-h-[64px] items-center justify-center rounded-2xl border-2 border-royal/20 bg-white px-4 py-4 text-sm font-bold uppercase tracking-wider text-royal transition-colors hover:border-royal hover:bg-royal hover:text-white"
          >
            {o.label}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-cream py-12 md:py-28">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <Reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-royal">
            30-second match
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.08] text-charcoal md:text-5xl">
            Which property fits you?
          </h2>
          <div className="gold-rule mx-auto mt-5 w-16" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(16,28,82,0.12)] md:p-10">
            {/* progress dots */}
            <div className="mb-8 flex items-center justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i <= step ? "w-8 bg-royal" : "w-2 bg-charcoal/15"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" {...stepAnim}>
                  {pick("What's your budget?", BUDGETS, (v) => {
                    setBudget(v);
                    if (v === "rent") setIntent("rent");
                    setStep(1);
                  })}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" {...stepAnim}>
                  <button
                    onClick={() => setStep(0)}
                    className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/45 hover:text-royal"
                  >
                    ← Back
                  </button>
                  {pick("How many bedrooms?", BHKS, (v) => {
                    setBhk(v);
                    // rent-budget users already have intent preset — skip the intent question
                    setStep(intent === "rent" ? 3 : 2);
                  })}
                </motion.div>
              )}

              {step === 2 && !intent && (
                <motion.div key="s2" {...stepAnim}>
                  <button
                    onClick={() => setStep(1)}
                    className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/45 hover:text-royal"
                  >
                    ← Back
                  </button>
                  {pick("And you're looking to…", INTENTS, (v) => {
                    setIntent(v);
                    setStep(3);
                  })}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" {...stepAnim}>
                  <div className="text-center">
                    <h3 className="font-display text-2xl text-charcoal md:text-3xl">
                      {results.length > 0 ? "Your matches" : "Close, but no exact match"}
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/55">
                      Sample listings for illustration.
                    </p>
                  </div>
                  {results.length > 0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {results.map((l, i) => (
                        <motion.div
                          key={l.slug}
                          initial={{ opacity: 0, y: 24, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            to={`/listings/${l.slug}`}
                            className="group block overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition hover:-translate-y-1 hover:shadow-xl"
                          >
                            <img
                              src={l.img}
                              alt={l.title}
                              loading="lazy"
                              className="aspect-[16/10] w-full object-cover"
                            />
                            <div className="p-4">
                              <p className="font-display text-lg font-bold text-royal">{l.price}</p>
                              <p className="mt-1 truncate text-sm text-charcoal/65">{l.title}</p>
                              <span className="mt-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-royal group-hover:underline">
                                View →
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-2xl bg-cream p-8 text-center">
                      <p className="text-charcoal/70">
                        Nothing in the samples fits exactly — but our live inventory changes daily.
                      </p>
                      <a
                        href={BUSINESS.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-shine mt-5 inline-flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp px-8 text-sm font-bold uppercase tracking-[0.2em] text-white"
                      >
                        Ask us on WhatsApp
                      </a>
                    </div>
                  )}
                  <div className="mt-6 text-center">
                    <button
                      onClick={reset}
                      className="text-xs font-bold uppercase tracking-[0.2em] text-royal underline underline-offset-4 hover:text-royal-deep"
                    >
                      Retake the quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
