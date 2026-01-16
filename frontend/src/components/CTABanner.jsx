import React from 'react';
import { Calendar } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="py-16 bg-teal-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Best Education Consultants
            </h2>
            <p className="text-teal-100 text-lg">
              Personalized admissions, VISA guidance, and expert consultations.
            </p>
          </div>
          <a 
            href="/appointment"
            className="flex items-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1 hover:bg-teal-50"
          >
            <Calendar size={24} />
            Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
