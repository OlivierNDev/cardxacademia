import React from 'react';
import { services } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-serif italic leading-tight mb-6">
              Empowered Learning Pathways
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
              Unlock your potential with personalized learning solutions tailored just for you. Let's transform your educational journey together!
            </p>
            <a 
              href="/application"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Apply Now
            </a>
          </div>

          {/* Service Cards - Show first 3 featured services */}
          <div className="space-y-4">
            {services.slice(0, 3).map((service) => (
              <div 
                key={service.id}
                className="bg-white/95 backdrop-blur-sm rounded-lg p-5 flex justify-between items-center group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-500 transition-colors">
                  {service.title}
                </h3>
                <a 
                  href={service.href}
                  className="flex items-center gap-2 text-teal-500 font-medium group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
