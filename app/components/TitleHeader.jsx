export default function TitleHeader({ label, title, subtitle, className = "" }) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <span className="section-label">{label}</span>
      <h2
        className="display-heading mt-2 max-w-3xl"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
      )}
    </div>
  );
}
