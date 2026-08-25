import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/mockData';

const AirTicketSection = () => {
  const airTicketingService = services.find((service) => service.icon === 'plane');
  const sectionTitle = airTicketingService?.title || 'Air Ticketing';
  const sectionDescription =
    airTicketingService?.description ||
    'Affordable flight bookings and itinerary support for destinations worldwide.';

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
                alt="Air travel"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {sectionDescription}
            </p>
            <Link
              to="/appointment"
              className="inline-block bg-brand-blue-500 hover:bg-brand-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirTicketSection;
