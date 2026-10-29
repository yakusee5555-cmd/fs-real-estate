import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { inr, inrShort, Reveal } from "./Fx";

const MIN_AMT = 500000;
const MAX_AMT = 30000000;

function Slider({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
  accent = false,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  accent?: boolean;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-cream/60">
          {label}
        </label>
        <span
          className={`font-display text-xl font-bold md:text-2xl ${accent ? "text-gold" : "text-cream"}`}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="emi-slider mt-3 w-full"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

function Donut({ principal, interest, emi }: { principal: number; interest: number; emi: number }) {
  const reduce = useReducedMotion();
  const total = principal + interest || 1;
  const R = 84;
  const C = 2 * Math.PI * R;
  const pFrac = principal / total;
  return (
    <div className="relative h-52 w-52 md:h-60 md:w-60">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(250,248,242,0.12)" strokeWidth="22" />
        <motion.circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="#f0c030"
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={false}
          animate={{ strokeDashoffset: C * (1 - pFrac) }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 20 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/55">
          Monthly EMI
        </span>
        <span className="mt-1 font-display text-3xl font-bold text-cream md:text-4xl">
          {inr(emi)}
        </span>
      </div>
    </div>
  );
}

export default function EmiCalculator({
  amount,
  setAmount,
  rate,
  setRate,
  years,
  setYears,
}: {
  amount: number;
  setAmount: (v: number) => void;
  rate: number;
  setRate: (v: number) => void;
  years: number;
  setYears: (v: number) => void;
}) {
  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const r = rate / 1200;
    const n = years * 12;
    const pow = Math.pow(1 + r, n);
    const emi = r > 0 ? (amount * r * pow) / (pow - 1) : amount / n;
    const totalPayable = emi * n;
    return { emi, totalInterest: totalPayable - amount, totalPayable };
  }, [amount, rate, years]);

  const waText = encodeURIComponent(
    `Hi FS Real Estate! I'm planning a home loan of ${inrShort(amount)} at ${rate}% for ${years} years (EMI ~${inr(emi)}/mo). Can you help me find a property that fits?`
  );

  return (
    <section className="relative overflow-hidden bg-royal-night py-12 md:py-28">
      <p
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap font-display text-[15vw] uppercase leading-none opacity-50"
      >
        EMI · EMI · EMI
      </p>
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            Home loan planner
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-[1.08] text-cream md:text-5xl md:leading-[1.05]">
            What will your EMI
            <br />
            actually look like?
          </h2>
          <div className="gold-rule mt-5 w-16" />
          <p className="mt-4 max-w-xl text-cream/60">
            Drag the sliders — the numbers update live. Then bring the figure to us and we'll
            shortlist homes that fit it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal className="rounded-3xl border border-cream/12 bg-white/[0.04] p-6 md:p-9">
            <div className="space-y-8">
              <Slider
                label="Loan amount"
                display={inrShort(amount)}
                min={MIN_AMT}
                max={MAX_AMT}
                step={100000}
                value={amount}
                onChange={setAmount}
                accent
              />
              <Slider
                label="Interest rate"
                display={`${rate.toFixed(1)}% p.a.`}
                min={7}
                max={12}
                step={0.1}
                value={rate}
                onChange={setRate}
              />
              <Slider
                label="Tenure"
                display={`${years} years`}
                min={5}
                max={30}
                step={1}
                value={years}
                onChange={setYears}
              />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-cream/10 pt-6">
              {[
                { k: "Principal", v: inrShort(amount), c: "text-gold" },
                { k: "Total interest", v: inrShort(totalInterest), c: "text-cream/70" },
                { k: "Total payable", v: inrShort(totalPayable), c: "text-cream" },
              ].map((s) => (
                <div key={s.k}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/45">
                    {s.k}
                  </p>
                  <p className={`mt-1 font-display text-lg font-bold md:text-xl ${s.c}`}>{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col items-center justify-center">
            <Donut principal={amount} interest={totalInterest} emi={emi} />
            <div className="mt-6 flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-cream/70">
                <span className="h-3 w-3 rounded-full bg-gold" /> Principal
              </span>
              <span className="flex items-center gap-2 text-cream/70">
                <span className="h-3 w-3 rounded-full bg-cream/25" /> Interest
              </span>
            </div>
            <motion.a
              href={`https://wa.me/919152947571?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-shine mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-whatsapp px-10 text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              Discuss this on WhatsApp
            </motion.a>
            <p className="mt-3 text-center text-xs text-cream/40">
              Indicative only — your bank's final offer may differ.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
