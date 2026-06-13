const steps = [
  {
    number: '1',
    title: 'Record a moment',
    description:
      'A short voice message and a few photos. Takes a minute. No pressure to be perfect.',
  },
  {
    number: '2',
    title: 'Choose when it opens',
    description:
      "Set it for a date that matters — or let them open it whenever they need it, like 'open when you miss me'.",
  },
  {
    number: '3',
    title: "They'll feel you there",
    description:
      "Your message arrives exactly when it should. And when they open it, you'll quietly know — so you can reach out.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-light py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-brand-purple uppercase tracking-widest text-sm mb-3 font-nunito font-semibold">
          How it works
        </p>
        <h2 className="font-nunito font-bold text-4xl text-brand-deep mb-3">
          Simple. Thoughtful. Exactly on time.
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Three steps. No app for your recipient to download.
        </p>

        {/* Mobile carousel / Desktop grid */}
        <div className="scrollbar-hide -mx-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {steps.map((step) => (
            <div
              key={step.number}
              className="snap-center shrink-0 min-w-[80vw] first:ml-6 last:mr-6 md:min-w-0 md:first:ml-0 md:last:mr-0 bg-white rounded-2xl p-8 border border-purple-100"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-rose flex items-center justify-center font-nunito font-bold text-white mb-4">
                {step.number}
              </div>
              <h3 className="font-nunito font-bold text-xl text-brand-deep mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
