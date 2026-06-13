const pills = [
  'Open on your birthday',
  'Open on our anniversary',
  'Open on your first day',
  'Open when you miss me',
  "Open when you can't sleep",
  "Open when it's a hard day",
  'Open when you need me',
];

export default function OpenWhen() {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #7B6BA8 0%, #C4849A 55%, #E8B48A 100%)',
      }}
      className="py-12 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-nunito font-bold text-5xl text-white mb-3">
          For every moment that matters
        </h2>
        <p className="text-white/80 text-lg mb-10">Big days and hard days alike.</p>
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
