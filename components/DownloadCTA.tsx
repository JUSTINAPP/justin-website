import AppStoreButtons from './AppStoreButtons';

export default function DownloadCTA() {
  return (
    <section
      id="download"
      style={{
        background: 'linear-gradient(160deg, #7B6BA8 0%, #C4849A 55%, #E8B48A 100%)',
      }}
      className="py-12 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="font-nunito font-bold text-5xl text-white mb-3">
          Start with one message.
        </h2>
        <p className="text-white/80 text-xl mb-10">
          Pick one person. Leave them something for later. It only takes a minute.
        </p>
        <AppStoreButtons centered />
      </div>
    </section>
  );
}
