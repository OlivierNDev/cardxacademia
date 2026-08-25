import React from 'react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section className="py-16 bg-brand-blue-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-white mb-2">Ready to plan?</h2>
          <p className="text-brand-blue-50 leading-relaxed">
            Book a consultation for tours and travel — or reach out with a quick question.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/appointment"
            className="bg-white text-brand-blue-700 px-7 py-3 rounded-md font-semibold hover:bg-brand-blue-50 transition-colors"
          >
            Book appointment
          </Link>
          <Link
            to="/contact"
            className="border border-white/60 text-white px-7 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
