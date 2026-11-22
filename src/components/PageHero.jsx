export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        {eyebrow && (
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-secondary">{eyebrow}</p>
        )}
        <h1 className="mt-4 font-heading text-4xl font-semibold md:text-5xl">{title}</h1>
        {text && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70">{text}</p>
        )}
      </div>
    </section>
  );
}