const pills = [
  "Open when you feel alone",
  "Open when you can't sleep",
  "Open when your brain says nobody cares",
  "Open when you feel overwhelmed",
  "Open when you need grounding",
  "Open when you want to give up",
];

export default function OpenWhen() {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #7B6BA8 0%, #C4849A 55%, #E8B48A 100%)',
      }}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-nunito font-bold text-5xl text-white mb-3">Open when…</h2>
        <p className="text-white/80 text-lg mb-10">
          You don&apos;t need to explain yourself. Just choose what you&apos;re feeling.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {pills.map((pill) => (
            <span
              key={pill}
              className="bg-white/20 border border-white/40 text-white rounded-full px-6 py-3 text-base"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
