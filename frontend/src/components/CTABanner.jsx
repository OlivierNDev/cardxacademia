import React from 'react';

const CTABanner = () => {
  return (
    <section className="py-16 bg-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Best Education Consultants
            </h2>
            <p className="text-blue-100 text-lg">
              Personalized admissions, VISA guidance, and expert consultations.
            </p>
          </div>
          <a 
            href="/appointment"
            className="bg-white text-blue-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:bg-gray-50"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
