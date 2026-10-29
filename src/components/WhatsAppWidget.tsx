import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CHIPS = [
  { label: "I want to buy", text: "Hi FS Real Estate! I want to buy a property. Can you help?" },
  { label: "I want to rent", text: "Hi FS Real Estate! I'm looking for a rental. Can you help?" },
  { label: "List my property", text: "Hi FS Real Estate! I want to list my property with you." },
];

function waLink(text: string) {
  return `https://wa.me/919152947571?text=${encodeURIComponent(text)}`;
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[76px] right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-64 overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_rgba(10,20,60,0.35)]"
          >
            <div className="bg-royal px-5 py-4">
              <p className="font-display text-lg font-bold text-cream">Chat with us</p>
              <p className="text-xs text-cream/70">
                Mon–Thu & Sat–Sun · 10:30 AM – 8:30 PM
              </p>
            </div>
            <div className="space-y-2 p-4">
              {CHIPS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={waLink(c.text)}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.3 }}
                  className="flex min-h-[48px] items-center rounded-2xl border border-royal/15 bg-cream px-4 text-sm font-semibold text-royal transition hover:border-royal hover:bg-royal hover:text-white"
                >
                  {c.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_rgba(31,170,83,0.45)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24"
              className="h-6 w-6 stroke-current"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-current"
            >
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5L9.4 8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.3-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.2c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
