'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between py-2 px-6">
        <Image
          src="/assets/justin-logo-no-background.png"
          alt="Justin"
          width={120}
          height={48}
          className="object-contain"
        />

        <a
          href="#download"
          className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full font-nunito font-semibold text-sm transition-colors duration-300 ${
            scrolled
              ? 'bg-brand-purple text-white hover:bg-brand-deep'
              : 'bg-white text-brand-purple hover:bg-white/90'
          }`}
        >
          Download App
        </a>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1.5,
              borderRadius: 9999,
              background: 'white',
              transformOrigin: 'center',
              transition: 'transform 300ms ease, opacity 300ms ease',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              marginBottom: 5,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1.5,
              borderRadius: 9999,
              background: 'white',
              transition: 'opacity 300ms ease',
              opacity: menuOpen ? 0 : 1,
              marginBottom: 5,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1.5,
              borderRadius: 9999,
              background: 'white',
              transformOrigin: 'center',
              transition: 'transform 300ms ease',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <a
            href="#download"
            className="block text-center bg-brand-purple text-white px-6 py-2.5 rounded-full font-nunito font-semibold text-sm hover:bg-brand-deep transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Download App
          </a>
        </div>
      )}
    </nav>
  );
}
