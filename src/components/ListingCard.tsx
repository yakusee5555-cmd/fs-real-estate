import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Listing } from "../data";

const TYPE_STYLES: Record<Listing["type"], string> = {
  buy: "bg-royal text-white",
  rent: "bg-whatsapp text-white",
  commercial: "bg-gold text-royal-night",
};

const MotionLink = motion(Link);

export default function ListingCard({
  listing,
  index = 0,
  layout = false,
}: {
  listing: Listing;
  index?: number;
  layout?: boolean;
}) {
  return (
    <MotionLink
      to={`/listings/${listing.slug}`}
      layout={layout}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.55,
        delay: (index % 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: "spring", stiffness: 320, damping: 32 },
      }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(16,28,82,0.10)] hover:shadow-[0_24px_60px_rgba(16,28,82,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.img}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${TYPE_STYLES[listing.type]}`}
        >
          {listing.typeLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-2xl font-bold text-royal">{listing.price}</p>
        <h3 className="mt-2 font-display text-xl leading-snug text-charcoal transition group-hover:text-royal">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-charcoal/55">{listing.locality}, Mumbai</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-charcoal/10 pt-4 text-sm font-medium text-charcoal/70">
          {listing.beds !== "—" && <span>{listing.beds} BHK</span>}
          {listing.baths !== "—" && <span>{listing.baths} Bath</span>}
          <span>{listing.area}</span>
        </div>
        <span className="mt-4 inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-royal">
          View details
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </MotionLink>
  );
}
