import React from 'react';
import { whyChooseUs } from '../data/mockData';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.18em] text-brand-blue-600 mb-3">
            Why CardX
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Clear support for every trip
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Practical travel planning first — education pathways when you need them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {whyChooseUs.map((feature) => (
            <div key={feature.id} className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
