import React from 'react';
import { whyChooseUs } from '../data/mockData';
import { ShieldCheck, Ticket, Users, Globe, Award, GraduationCap } from 'lucide-react';

const iconMap = {
  visa: ShieldCheck,
  ticket: Ticket,
  consultation: Users,
  global: Globe,
  success: Award,
  admission: GraduationCap,
};

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
          {whyChooseUs.map((feature) => {
            const IconComponent = iconMap[feature.icon] || ShieldCheck;
            return (
              <div 
                key={feature.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                  <IconComponent 
                    size={32} 
                    className="text-blue-500 group-hover:text-white transition-colors" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
