import React from 'react';

const AirTicketSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
                alt="Air Travel"
                className="w-full h-[400px] object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-500 rounded-full opacity-20"></div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Best Air Ticket Booking: Affordable Flights Worldwide
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Book the cheapest and most affordable flights to destinations across the globe with our reliable air ticketing services. We guarantee the best deals, ensuring smooth travel for students and families. Your journey begins with us!
            </p>
            <a 
              href="/booking"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg hover:-translate-y-1 uppercase tracking-wide"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirTicketSection;
