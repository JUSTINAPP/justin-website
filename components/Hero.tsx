import Image from 'next/image';
import AppStoreButtons from './AppStoreButtons';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex">
      <Image
        src="/assets/background.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col md:flex-row px-6 md:px-16 pt-36 pb-12">
        <div className="flex-1 md:w-[55%] flex flex-col gap-6 justify-start">
          <h1 className="font-nunito font-bold text-3xl md:text-5xl text-white leading-tight">
            Your people. Saved for when you need them.
          </h1>
          <p className="text-white/80 text-lg max-w-lg">
            Justin gives the people who love you a private place to leave messages, voice
            notes and photos — ready for the moment you need them most.
          </p>
          <AppStoreButtons />
        </div>

        <div className="flex justify-center md:justify-end md:w-[45%] items-center pt-8 md:pt-0">
          <Image
            src="/assets/justin-image-01.png"
            alt="Justin app"
            width={500}
            height={500}
            className="w-auto object-contain"
            style={{ maxHeight: '500px' }}
            sizes="(max-width: 768px) 80vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
