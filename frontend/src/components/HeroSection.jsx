import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80';

const HeroSection = () => {
  return (
    <section className="relative min-h-[78vh] lg:min-h-[88vh] flex items-end lg:items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[heroZoom_18s_ease-out_forwards]"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-28 w-full">
        <p className="text-sm uppercase tracking-[0.24em] text-white/85 mb-5 animate-[fadeUp_0.7s_ease-out]">
          CardX Academia & Travel Tours
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl mb-6 animate-[fadeUp_0.85s_ease-out]">
          Travel & Tours, made clear
        </h1>
        <p className="text-lg text-white/85 max-w-lg mb-10 leading-relaxed animate-[fadeUp_1s_ease-out]">
          Curated tours, flights, car rentals, and transfers — with education
          support available when you need it.
        </p>
        <div className="flex flex-wrap gap-3 animate-[fadeUp_1.15s_ease-out]">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-brand-blue-500 hover:bg-brand-blue-600 text-white px-7 py-3.5 rounded-md font-semibold transition-colors"
          >
            Explore services
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 border border-white/45 text-white hover:bg-white/10 px-7 py-3.5 rounded-md font-semibold transition-colors"
          >
            Book appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
