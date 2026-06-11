const stats = [
  {
    flag: '🇦🇺',
    stat: '1 in 5',
    desc: '4.5 million Australians experience a mental health condition each year',
  },
  {
    flag: '🇬🇧',
    stat: '1 in 4',
    desc: '16.75 million people in the UK are affected annually',
  },
  {
    flag: '🇺🇸',
    stat: '1 in 5',
    desc: '62.2 million adults in the US living with mental illness',
  },
];

export default function Problem() {
  return (
    <section className="bg-brand-deep py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-widest text-white/40 text-sm mb-3 font-nunito">
          The problem
        </p>
        <h2 className="font-nunito font-bold text-4xl text-white mb-4">
          When we need help most, our mind tells us nobody cares.
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mb-8">
          Depression and anxiety distort perspective. In our hardest moments, reaching out
          feels impossible — we convince ourselves we&apos;re a burden, that no one really
          wants to hear from us. Justin was built to break that lie.
        </p>

        {/* Mobile carousel / Desktop grid */}
        <div className="scrollbar-hide -mx-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
          {stats.map((item) => (
            <div
              key={item.flag}
              className="snap-center shrink-0 min-w-[80vw] first:ml-6 last:mr-6 md:min-w-0 md:first:ml-0 md:last:mr-0 bg-white/10 border border-white/15 rounded-2xl p-6"
            >
              <div className="text-3xl mb-2">{item.flag}</div>
              <div className="font-nunito font-bold text-brand-peach text-3xl mb-1">
                {item.stat}
              </div>
              <div className="text-white/60 text-sm mt-2">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
