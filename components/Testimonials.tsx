const testimonials = [
  {
    quote:
      "I think Justin is a great support tool for psychotherapy as peer support has proven to be an effective intervention for people with substance and mental health issues.",
    name: 'Dr Casimir Liber',
    title: 'Psychiatrist',
  },
  {
    quote:
      "I have so much faith that this app is so invaluable to so many people and as it is for me.",
    name: 'Justine',
    title: 'Cancer patient',
  },
  {
    quote: "The thing I like about Justin is I am in control of my conversations.",
    name: 'Stella',
    title: '17 years old',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-brand-purple uppercase tracking-widest text-sm mb-3 font-nunito font-semibold">
          What people say
        </p>
        <h2 className="font-nunito font-bold text-4xl text-brand-deep mb-12">
          Heard from people who&apos;ve used it
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-brand-light rounded-2xl p-8 border-t-4 border-brand-rose"
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
