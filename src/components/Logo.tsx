/* FS Real Estate logo mark — gold ring + laurel + FS serif on royal blue.
   Mirrors the business card: royal blue field, gold ring/laurel, white FS. */
export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="FS Real Estate logo">
      <rect width="64" height="64" rx="14" fill="#203F9A" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#F0C030" strokeWidth="2.5" />
      <ellipse cx="50" cy="18" rx="3.4" ry="6" fill="#F0C030" transform="rotate(38 50 18)" />
      <ellipse cx="53" cy="27" rx="3" ry="5.4" fill="#F0C030" transform="rotate(62 53 27)" />
      <ellipse cx="52.5" cy="36" rx="2.7" ry="4.8" fill="#F0C030" transform="rotate(84 52.5 36)" />
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="21"
        fontWeight="bold"
        fill="#FFFFFF"
      >
        FS
      </text>
    </svg>
  );
}
