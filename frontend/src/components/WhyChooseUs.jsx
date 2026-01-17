import React from 'react';
import { whyChooseUs } from '../data/mockData';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cardx Academia and Travel Tours offers seamless visa support, air ticket booking, and personalized consultations, making us your trusted education consultants for global academic success
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
