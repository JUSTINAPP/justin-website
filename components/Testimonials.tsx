const testimonials = [
  {
    quote:
      "I have so much faith that this app is so invaluable to so many people — and as it is for me.",
    name: 'Justine',
    title: 'Using Justin for over a year',
  },
  {
    quote: "The thing I like about Justin is I am in control — I choose what I leave and when.",
    name: 'Stella',
    title: '17 years old',
  },
  {
    quote:
      "It's such a simple idea. Leave something for someone before you need to. I wish I'd had it years ago.",
    name: 'Michael',
    title: 'Father of two',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-brand-purple uppercase tracking-widest text-sm mb-3 font-nunito font-semibold">
          What people say
        </p>
        <h2 className="font-nunito font-bold text-4xl text-brand-deep mb-8">
          Loved by the people who use it
        </h2>

        {/* Mobile carousel / Desktop grid */}
        <div className="scrollbar-hide -mx-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="snap-center shrink-0 min-w-[80vw] first:ml-6 last:mr-6 md:min-w-0 md:first:ml-0 md:last:mr-0 bg-brand-light rounded-2xl p-8 border-t-4 border-brand-rose"
            >
              <p className="italic text-gray-600 text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="font-nunito font-semibold text-brand-purple text-sm">
                — {t.name}, {t.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
