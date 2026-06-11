'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex flex-col items-center py-2 px-6">
        <Image
          src="/assets/justin-logo-no-background.png"
          alt="Justin"
          width={200}
          height={64}
          className="h-16 w-auto object-contain"
        />
        <p
          className={`font-nunito text-xs tracking-widest transition-colors duration-300 ${
            scrolled ? 'text-brand-purple/70' : 'text-white/80'
          }`}
        >
          Just in case, Just in time, Just in touch.
        </p>
      </div>
    </nav>
  );
}
