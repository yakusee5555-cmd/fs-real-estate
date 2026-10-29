import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AREAS } from "../data";
import { Reveal } from "./Fx";

const AREA_INFO: Record<string, { img: string; line: string }> = {
  "Andheri West": {
    img: "/img/listing1.jpg",
    line: "The suburb we know best — metro lines, beaches, and film studios in every other lane.",
  },
  Juhu: {
    img: "/img/listing4.jpg",
    line: "Sea-facing streets and Mumbai's most loved beach — premium addresses with old-Bombay charm.",
  },
  Versova: {
    img: "/img/listing3.jpg",
    line: "Fishing-village roots, beachside apartments, and one of the city's best food streets.",
  },
  "Bandra West": {
    img: "/img/listing5.jpg",
    line: "The queen of the suburbs — sea link access, buzzing cafes, and landmark residences.",
  },
  Goregaon: {
    img: "/img/listing7.jpg",
    line: "Film City on one side, forest views on the other — with the metro tying it together.",
  },
  Malad: {
    img: "/img/listing11.jpg",
    line: "Malls, multiplexes, and well-priced family apartments along Link Road.",
  },
  Jogeshwari: {
    img: "/img/listing6.jpg",
    line: "The value pocket — well-connected, fast-developing, and easy on the budget.",
  },
  "Vile Parle": {
    img: "/img/listing10.jpg",
    line: "Tree-lined streets, top schools, and a strong community feel close to the station.",
  },
  Oshiwara: {
    img: "/img/listing8.jpg",
    line: "Young professionals' favourite — studios, cafes, and the metro within walking distance.",
  },
  Lokhandwala: {
    img: "/img/listing2.jpg",
    line: "Gated complexes, clubhouses, and high-rise living done right.",
  },
};

export default function AreaExplorer({ dark = false }: { dark?: boolean }) {
  const [active, setActive] = useState(AREAS[0]);
  const info = AREA_INFO[active] ?? AREA_INFO["Andheri West"];

  return (
    <div className="mt-10 md:mt-14">
      <Reveal>
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
            dark ? "text-gold" : "text-royal"
          }`}
        >
          Areas we serve — tap to explore
        </p>
      </Reveal>
      <Reveal delay={0.08} className="mt-5 flex flex-wrap gap-2.5">
        {AREAS.map((t) => {
          const on = t === active;
          return (
            <motion.button
              key={t}
              onClick={() => setActive(t)}
              whileTap={{ scale: 0.94 }}
              aria-pressed={on}
              className={`inline-flex min-h-[48px] items-center rounded-full border px-5 text-sm font-semibold transition-colors ${
                on
                  ? "border-gold bg-gold text-royal-night"
                  : dark
                    ? "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
                    : "border-royal/25 text-royal hover:border-royal hover:bg-royal hover:text-white"
              }`}
            >
              {t}
            </motion.button>
          );
        })}
      </Reveal>

      <div className="mt-6 overflow-hidden rounded-3xl border border-cream/10 bg-white/[0.04]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2"
          >
            <div className="relative h-52 overflow-hidden md:h-64">
              <img
                src={info.img}
                alt={`${active}, Mumbai`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-night/50 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                {active}
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-cream md:text-2xl">
                {info.line}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
