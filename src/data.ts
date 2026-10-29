export const BUSINESS = {
  name: "FS Real Estate",
  tagline: "WE COMPLETE YOU",
  hindiName: "एफ एस रिअल ईस्टेट",
  est: "2008",
  phone: "+91 91529 47571",
  phoneHref: "tel:+919152947571",
  phones: [
    { label: "+91 91529 47571", href: "tel:+919152947571", primary: true },
    { label: "+91 91529 47574", href: "tel:+919152947574", primary: false },
    { label: "+91 91529 47579", href: "tel:+919152947579", primary: false },
  ],
  whatsapp: "https://wa.me/919152947571",
  address: "A-31, Okaz Shopping Centre, Millat Nagar Rd, Andheri West, Mumbai, Maharashtra 400053",
  shortAddress: "A-31, Okaz Shopping Centre, Millat Nagar, Andheri West, Mumbai 400053",
  hours: "Mon–Thu & Sat–Sun · 10:30 AM – 8:30 PM",
  hoursNote: "Closed on Fridays",
  mapQuery: "Okaz Shopping Centre, Millat Nagar, Andheri West, Mumbai",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type ListingType = "buy" | "rent" | "commercial";

export interface Listing {
  slug: string;
  title: string;
  type: ListingType;
  typeLabel: string;
  price: string;
  priceBand: "under50L" | "50L-2Cr" | "2Cr-5Cr" | "5Cr+" | "rent";
  beds: string;
  baths: string;
  area: string;
  locality: string;
  address: string;
  img: string;
  desc: string;
  features: string[];
}

/* SAMPLE listings — the business will replace these with real inventory.
   Keep the "Sample listings for illustration" label wherever they appear. */
export const LISTINGS: Listing[] = [
  {
    slug: "2bhk-veera-desai-andheri-west",
    title: "2 BHK Apartment, Veera Desai Road",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹2.35 Cr",
    priceBand: "2Cr-5Cr",
    beds: "2",
    baths: "2",
    area: "1,050 sq.ft.",
    locality: "Andheri West",
    address: "Veera Desai Road, Andheri West, Mumbai",
    img: "/img/listing1.jpg",
    desc: "A well-kept 2 BHK in a maintained Andheri West society, minutes from the station and the metro. Bright living spaces, a functional kitchen, and a building with power backup and parking.",
    features: ["Gated society", "Car parking", "Power backup", "Near metro station", "Vaastu-compliant layout"],
  },
  {
    slug: "3bhk-lokhandwala",
    title: "3 BHK Apartment, Lokhandwala",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹3.80 Cr",
    priceBand: "2Cr-5Cr",
    beds: "3",
    baths: "3",
    area: "1,450 sq.ft.",
    locality: "Lokhandwala",
    address: "Lokhandwala Complex, Andheri West, Mumbai",
    img: "/img/listing2.jpg",
    desc: "Spacious 3 BHK in the heart of Lokhandwala with large decks and cross-ventilation. The complex offers a clubhouse, pool, and landscaped greens — ideal for families.",
    features: ["Clubhouse & pool", "2 car parks", "Large decks", "Modular kitchen", "Servant room"],
  },
  {
    slug: "1bhk-versova",
    title: "1 BHK Apartment, Versova",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹1.45 Cr",
    priceBand: "50L-2Cr",
    beds: "1",
    baths: "1",
    area: "650 sq.ft.",
    locality: "Versova",
    address: "JP Road, Versova, Andheri West, Mumbai",
    img: "/img/listing3.jpg",
    desc: "A compact, efficient 1 BHK a short walk from Versova beach. Perfect first home or investment — strong rental demand in this pocket all year round.",
    features: ["Walk to beach", "High rental yield pocket", "New fittings", "Society parking", "Clear title"],
  },
  {
    slug: "2bhk-rent-juhu",
    title: "2 BHK for Rent, Juhu",
    type: "rent",
    typeLabel: "For Rent",
    price: "₹85,000/mo",
    priceBand: "rent",
    beds: "2",
    baths: "2",
    area: "950 sq.ft.",
    locality: "Juhu",
    address: "Juhu Tara Road, Mumbai",
    img: "/img/listing4.jpg",
    desc: "Semi-furnished 2 BHK in a quiet Juhu lane, close to the beach and ISKCON. Available for immediate move-in with a standard 11-month agreement.",
    features: ["Semi-furnished", "Immediate possession", "Sea breeze locality", "Society maintenance included", "Pet-friendly building"],
  },
  {
    slug: "3bhk-rent-bandra-west",
    title: "3 BHK for Rent, Bandra West",
    type: "rent",
    typeLabel: "For Rent",
    price: "₹1,60,000/mo",
    priceBand: "rent",
    beds: "3",
    baths: "3",
    area: "1,400 sq.ft.",
    locality: "Bandra West",
    address: "Waterfield Road, Bandra West, Mumbai",
    img: "/img/listing5.jpg",
    desc: "Elegant 3 BHK rental in prime Bandra West with tasteful interiors and abundant natural light. Suited for corporate leases and families alike.",
    features: ["Fully furnished option", "Corporate lease welcome", "Prime location", "Covered parking", "24x7 security"],
  },
  {
    slug: "office-andheri-west-lease",
    title: "Commercial Office, Andheri West",
    type: "commercial",
    typeLabel: "Commercial",
    price: "₹1,25,000/mo",
    priceBand: "rent",
    beds: "—",
    baths: "2",
    area: "1,200 sq.ft.",
    locality: "Andheri West",
    address: "New Link Road, Andheri West, Mumbai",
    img: "/img/listing6.jpg",
    desc: "Grade-A style office space on New Link Road with excellent frontage and footfall. Ready for fit-out, with dedicated parking and high-speed elevator access.",
    features: ["Main road frontage", "Fit-for-customisation", "Dedicated parking", "High-speed elevators", "Near metro"],
  },
  {
    slug: "2bhk-goregaon-west",
    title: "2 BHK Apartment, Goregaon West",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹2.10 Cr",
    priceBand: "2Cr-5Cr",
    beds: "2",
    baths: "2",
    area: "1,000 sq.ft.",
    locality: "Goregaon",
    address: "MG Road, Goregaon West, Mumbai",
    img: "/img/listing7.jpg",
    desc: "Sunlit 2 BHK in a well-managed Goregaon West tower with podium amenities. Good connectivity to the Western Express Highway and the harbour line.",
    features: ["Podium amenities", "High floor available", "Near highway", "Children's play area", "Rainwater harvesting"],
  },
  {
    slug: "studio-rent-oshiwara",
    title: "Studio Apartment for Rent, Oshiwara",
    type: "rent",
    typeLabel: "For Rent",
    price: "₹42,000/mo",
    priceBand: "rent",
    beds: "1",
    baths: "1",
    area: "450 sq.ft.",
    locality: "Oshiwara",
    address: "Oshiwara Garden, Andheri West, Mumbai",
    img: "/img/listing8.jpg",
    desc: "Smart studio apartment near Oshiwara garden — ideal for working professionals. Compact, modern, and walking distance to cafes and the metro.",
    features: ["Furnished", "Near metro", "Working professionals preferred", "High-speed internet ready", "Housekeeping available"],
  },
  {
    slug: "retail-shop-andheri-west",
    title: "Retail Shop, Andheri West",
    type: "commercial",
    typeLabel: "Commercial",
    price: "₹4.50 Cr",
    priceBand: "2Cr-5Cr",
    beds: "—",
    baths: "1",
    area: "800 sq.ft.",
    locality: "Andheri West",
    address: "Market Road, Andheri West, Mumbai",
    img: "/img/listing9.jpg",
    desc: "High-street retail space in the Andheri West market belt with strong daily footfall. Clear title, ready for immediate commercial use.",
    features: ["High-street frontage", "Heavy footfall zone", "Clear title", "Immediate possession", "Mezzanine storage"],
  },
  {
    slug: "3bhk-vile-parle-west",
    title: "3 BHK Apartment, Vile Parle West",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹4.20 Cr",
    priceBand: "2Cr-5Cr",
    beds: "3",
    baths: "3",
    area: "1,550 sq.ft.",
    locality: "Vile Parle",
    address: "Dixit Road, Vile Parle West, Mumbai",
    img: "/img/listing10.jpg",
    desc: "Premium 3 BHK in a respected Vile Parle West society known for its community and upkeep. Large living-dining, pooja space, and two covered parks.",
    features: ["Pooja space", "2 covered car parks", "Reputed society", "Near station", "East-west facing"],
  },
  {
    slug: "2bhk-rent-malad-west",
    title: "2 BHK for Rent, Malad West",
    type: "rent",
    typeLabel: "For Rent",
    price: "₹58,000/mo",
    priceBand: "rent",
    beds: "2",
    baths: "2",
    area: "980 sq.ft.",
    locality: "Malad",
    address: "Link Road, Malad West, Mumbai",
    img: "/img/listing11.jpg",
    desc: "Comfortable 2 BHK rental on Link Road, Malad West — close to malls, multiplexes, and the metro. Family preferred, available from next month.",
    features: ["Near metro & mall", "Family preferred", "Modular kitchen", "Balcony sit-out", "Gated complex"],
  },
  {
    slug: "4bhk-penthouse-juhu",
    title: "4 BHK Penthouse, Juhu",
    type: "buy",
    typeLabel: "For Sale",
    price: "₹9.75 Cr",
    priceBand: "5Cr+",
    beds: "4",
    baths: "5",
    area: "2,800 sq.ft.",
    locality: "Juhu",
    address: "Juhu Beach Road, Mumbai",
    img: "/img/listing12.jpg",
    desc: "A rare sea-facing penthouse on Juhu Beach Road with a sprawling terrace, private elevator lobby, and interiors done to turnkey finish.",
    features: ["Sea-facing terrace", "Private elevator lobby", "Turnkey interiors", "4 car parks", "Concierge building"],
  },
];

export interface Service {
  slug: string;
  title: string;
  desc: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "buy",
    title: "Buy a Home",
    desc: "Shortlisted options that match your budget and lifestyle — with clear titles, verified paperwork, and negotiation handled for you.",
    points: ["Curated shortlists", "Title & RERA verification", "Price negotiation", "Loan assistance"],
  },
  {
    slug: "sell",
    title: "Sell Your Property",
    desc: "Right pricing, serious buyers, and end-to-end documentation — so your property sells at its true market value, without the wait.",
    points: ["Accurate valuation", "Qualified buyers only", "Marketing & site visits", "Registration support"],
  },
  {
    slug: "rent",
    title: "Rent a Home",
    desc: "Verified rental listings across Andheri West and nearby suburbs, with registered agreements drafted correctly the first time.",
    points: ["Verified listings", "Registered rent agreements", "Police verification help", "Move-in support"],
  },
  {
    slug: "lease",
    title: "Lease & Leave-License",
    desc: "Corporate and long-term leasing structured properly — terms, lock-ins, and renewals drafted to protect both sides.",
    points: ["Corporate leasing", "Leave & license drafting", "Renewal management", "Dispute-free exits"],
  },
  {
    slug: "commercial",
    title: "Commercial Spaces",
    desc: "Offices, retail, and commercial floors in high-demand Mumbai corridors — matched to footfall, frontage, and business requirements.",
    points: ["Offices & retail", "Pre-leased options", "Location analytics", "Fit-out coordination"],
  },
  {
    slug: "advisory",
    title: "Property Advisory",
    desc: "Straight answers on where to buy, what to pay, and when to hold — from people who have watched Andheri West since 2008.",
    points: ["Investment guidance", "Market price opinions", "NRI transaction help", "Portfolio reviews"],
  },
];

export const AREAS = [
  "Andheri West",
  "Juhu",
  "Versova",
  "Bandra West",
  "Goregaon",
  "Malad",
  "Jogeshwari",
  "Vile Parle",
  "Oshiwara",
  "Lokhandwala",
];

export const FAQS = [
  {
    q: "What does FS Real Estate charge as brokerage?",
    a: "Brokerage follows Mumbai market norms — typically 1% on sale/purchase and one month's rent on rentals, confirmed in writing before we begin. No hidden charges, ever.",
  },
  {
    q: "Do you verify property titles and RERA registration?",
    a: "Yes. Every purchase we handle includes a title check and RERA registration verification for new projects. If something doesn't check out, we tell you before you spend a rupee.",
  },
  {
    q: "Can you help with home loans?",
    a: "We work with leading banks and NBFCs and can connect you with loan officers, help compare offers, and keep the paperwork moving alongside your purchase.",
  },
  {
    q: "I'm an NRI. Can you handle my transaction?",
    a: "Yes — we regularly assist NRI buyers and sellers with documentation, POA formalities, and FEMA-compliant payment routing, coordinating with your CA where needed.",
  },
  {
    q: "Why are you closed on Fridays?",
    a: "Our office observes a weekly holiday on Fridays. We're open Monday to Thursday and Saturday to Sunday, 10:30 AM to 8:30 PM. Calls and WhatsApp messages are answered during working hours.",
  },
  {
    q: "What documents do I need for a rent agreement?",
    a: "Typically: Aadhaar/PAN of owner and tenant, address proof, and photographs. We draft the agreement, arrange registration, and guide the police verification step.",
  },
];

export const PRICE_BANDS = [
  { value: "all", label: "Any price" },
  { value: "under50L", label: "Under ₹50 L" },
  { value: "50L-2Cr", label: "₹50 L – ₹2 Cr" },
  { value: "2Cr-5Cr", label: "₹2 Cr – ₹5 Cr" },
  { value: "5Cr+", label: "₹5 Cr+" },
  { value: "rent", label: "Rentals" },
];
