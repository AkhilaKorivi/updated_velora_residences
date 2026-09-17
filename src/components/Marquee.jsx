const items = [
  "Velora Residences",
  "Madhapur",
  "Hyderabad",
  "3 & 4 BHK",
  "Premium Living",
  "36 Floors",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-line bg-charcoal py-5"
      aria-hidden="true"
    >
      <div className="flex w-max items-center" style={{ animation: "marquee 38s linear infinite" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-lg italic text-mist"
              >
                <span className="px-8">{t}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}