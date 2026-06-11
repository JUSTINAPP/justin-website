import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-brand-deep py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="relative h-12 w-36 mb-6">
          <Image
            src="/assets/justin-logo-no-background.png"
            alt="Justin"
            fill
            className="object-contain"
            sizes="144px"
          />
        </div>
        <div className="flex items-center gap-6 text-white/40 text-sm">
          <a href="#" className="hover:text-white/70 transition-colors">
            Privacy Policy
          </a>
          <span>·</span>
          <a href="#" className="hover:text-white/70 transition-colors">
            Terms
          </a>
          <span>·</span>
          <a href="#" className="hover:text-white/70 transition-colors">
            Contact
          </a>
        </div>
        <p className="text-white/30 text-sm italic mt-4">
          Just in case. Just in time. Just in touch.
        </p>
        <p className="text-white/20 text-xs mt-2">
          © 2025 Justin App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
