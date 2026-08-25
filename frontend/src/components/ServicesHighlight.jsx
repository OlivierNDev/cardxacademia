import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';

const travelHighlights = services
  .filter((s) => s.category === 'travel' && s.icon !== 'landmark')
  .slice(0, 6);

const ServicesHighlight = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-brand-blue-600 mb-3">
              What we offer
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Travel & Tours
            </h2>
            <p className="text-gray-600 max-w-xl leading-relaxed">
              Multi-country tours, flights, stays, car rentals, and transfers —
              planned with clear next steps.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-brand-blue-700 hover:text-brand-blue-800 font-semibold transition-colors"
          >
            All services
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {travelHighlights.map((service) => (
            <div key={service.id} className="border-t border-gray-200 pt-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Education & visa support
            </h3>
            <p className="text-gray-600 text-sm max-w-xl">
              Study abroad, admissions, scholarships, and immigration guidance when you need them.
            </p>
          </div>
          <Link
            to="/services#education"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-brand-blue-700 font-medium transition-colors"
          >
            View education services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
