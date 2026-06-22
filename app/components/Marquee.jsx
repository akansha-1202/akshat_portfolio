import { marqueeItems } from "@/app/constants";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4">
      <div className="marquee-track gap-12 px-6">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-12 text-sm font-semibold uppercase tracking-[0.28em] text-muted"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
