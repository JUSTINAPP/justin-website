const steps = [
  {
    number: '1',
    title: 'Invite your people',
    description:
      'Choose up to 5 people who care about you. They receive a simple link — no app to download.',
  },
  {
    number: '2',
    title: 'They leave messages',
    description:
      "Voice notes, photos, short videos. Prompted with: 'What would you want them to hear when they feel alone?'",
  },
  {
    number: '3',
    title: 'Open when you need them',
    description:
      "When you're struggling, open Justin. Your people are waiting — and they'll be quietly notified to reach out.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-light py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-brand-purple uppercase tracking-widest text-sm mb-3 font-nunito font-semibold">
          How it works
        </p>
        <h2 className="font-nunito font-bold text-4xl text-brand-deep mb-3">
          Simple to set up. Powerful when it matters.
        </h2>
        <p className="text-gray-500 text-lg mb-12">
          Three steps. No app for your supporters to download.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-8 border border-purple-100"
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
