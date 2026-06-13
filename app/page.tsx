'use client';

import { useEffect } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ValueProp from '@/components/ValueProp';
import HowItWorks from '@/components/HowItWorks';
import OpenWhen from '@/components/OpenWhen';
import ReachBack from '@/components/ReachBack';
import Testimonials from '@/components/Testimonials';
import DownloadCTA from '@/components/DownloadCTA';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <div className="fade-in">
        <Hero />
      </div>
      <div className="fade-in">
        <ValueProp />
      </div>
      <div className="fade-in">
        <HowItWorks />
      </div>
      <div className="fade-in">
        <OpenWhen />
      </div>
      <div className="fade-in">
        <ReachBack />
      </div>
      <div className="fade-in">
        <Testimonials />
      </div>
      <div className="fade-in">
        <DownloadCTA />
      </div>
      <div className="fade-in">
        <Footer />
      </div>
    </>
  );
}
