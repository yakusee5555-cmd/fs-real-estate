export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: "first-time-buyer-guide-andheri-west",
    title: "First-Time Buyer's Guide to Andheri West",
    excerpt:
      "Micro-markets, realistic budgets, and the paperwork order that saves first-time buyers the most trouble.",
    date: "October 18, 2026",
    readTime: "5 min read",
    img: "/img/blog1.jpg",
    body: [
      "Andheri West is not one market — it is a dozen micro-markets stitched together. Veera Desai Road, Lokhandwala, Versova, and Oshiwara each price differently for the same configuration, sometimes by 30% or more. Before you fall in love with a flat, learn which pocket it sits in and what that pocket actually trades at.",
      "For a realistic 2026 budget: 1 BHKs in the established pockets start around ₹1.3–1.6 crore, 2 BHKs around ₹2–2.6 crore, and 3 BHKs from ₹3.5 crore upward in the prime complexes. Anything far below the pocket's range deserves a second look at the title, the floor, or the building's age.",
      "Get your paperwork in the right order and the purchase gets dramatically simpler. First, the home loan pre-approval — it tells you your real budget and makes sellers take your offer seriously. Second, the title search and chain of documents going back at least 30 years. Third, the society's NOC and outstanding dues certificate. Only then the agreement.",
      "New versus resale is the classic Andheri West dilemma. New launches offer payment plans and modern amenities but carry construction risk and GST. Resales in 15–25 year old societies often give you more carpet area per rupee, established neighbours, and no GST — but check the building's structural audit status and pending redevelopment proposals.",
      "Finally, visit at three different times: a weekday morning for the commute reality, an evening for parking and noise, and once during heavy rain. Mumbai's monsoon reveals what brochures never will. If you want someone who has watched these streets since 2008 to walk the shortlist with you, that is exactly what we do.",
    ],
  },
  {
    slug: "rent-vs-buy-mumbai-honest-math",
    title: "Rent vs Buy in Mumbai: The Honest Math for 2026",
    excerpt:
      "Forget rules of thumb. Here's how to actually compare a ₹2.4 crore flat against renting it.",
    date: "September 30, 2026",
    readTime: "4 min read",
    img: "/img/blog2.jpg",
    body: [
      "The popular rule says: if the annual rent is less than 3% of the property price, renting wins. In Andheri West, a ₹2.4 crore 2 BHK rents for roughly ₹85,000 a month — about ₹10.2 lakh a year, or 4.25% of the price. By the old rule, that says buy. The real answer is more personal.",
      "Buying makes sense when you will stay put for 7–10 years. The first five years of a home loan are mostly interest, stamp duty (5–6% in Mumbai) and registration are sunk costs, and selling early means those costs never get amortised. Short horizon? Renting is usually cheaper, full stop.",
      "Renting makes sense when flexibility has value — a job that might move you, a family size that might change, or capital you can deploy better elsewhere in a business. Mumbai rents have risen steadily, but so have FD and equity returns on the down payment you didn't lock into a flat.",
      "The factor people underweight is the quality-of-life one. Owners renovate freely, never face a landlord's sale notice, and build equity in a city where land is finite. Renters keep optionality and liquidity. Neither is wrong — the mistake is deciding on emotion and justifying with math afterwards.",
      "Our advice to clients is boring and works: run the numbers with an actual loan quote and the actual rent, add a 10-year horizon, and pick the answer you can live with if the market does nothing. Then call us and we'll sanity-check it for free.",
    ],
  },
  {
    slug: "rera-checklist-before-booking-flat",
    title: "RERA Checklist: 7 Things to Verify Before Booking a Flat",
    excerpt:
      "The seven verifications that separate a safe booking from an expensive lesson.",
    date: "September 12, 2026",
    readTime: "4 min read",
    img: "/img/blog3.jpg",
    body: [
      "One: the project must be registered on MahaRERA. Ask for the registration number and verify it yourself on the MahaRERA portal — registration status, approved plans, and the promised possession date should all be there in black and white.",
      "Two: read the carpet area, not the super built-up area. RERA mandates sale on carpet area. If a broker or brochure quotes only super built-up, convert it before comparing prices — two projects at the same 'rate per sq.ft.' can differ 20% on actual livable space.",
      "Three: check the title chain and approvals. Commencement certificate, approved building plans, and a clear title report matter more than the sample flat's Italian marble. Encumbrances on the land become your problem after registration.",
      "Four: understand the payment plan. Construction-linked plans are the safest — your money follows actual progress. Avoid heavy upfront demands beyond the RERA-permitted 10% before the agreement is registered.",
      "Five: confirm what 'possession date' really means, and what compensation the agreement provides for delay. RERA gives you the right to interest on delays — make sure the agreement doesn't quietly waive it.",
      "Six: verify the parking, floor rise, and amenity charges in writing. Verbal promises about 'one covered park included' have a habit of becoming paid extras at the allotment letter stage.",
      "Seven: never book under pressure. 'Only two units left at this price' is the oldest line in the business. A genuine project will still have a genuine unit next week. We verify all seven for every buyer we represent — it is the least exciting part of our job and the most valuable.",
    ],
  },
];
