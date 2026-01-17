import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const IsraelPilgrimageBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-blue-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Special Tour
                </span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Limited Seats
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Holy Land Pilgrimage to Israel
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                <span>March 29 - April 5, 2026</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-lg font-semibold text-gray-800">$2,900 USD</span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                A spiritual journey through the land of the Bible. Walk where Jesus walked.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/israel-pilgrimage-2025"
                className="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all text-center"
              >
                Learn More
              </Link>
              <Link 
                to="/apply-israel-tour"
                className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsraelPilgrimageBanner;
