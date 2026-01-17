import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const IsraelPilgrimageBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-yellow-400 to-yellow-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border-2 border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Special Tour
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Limited Seats
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Holy Land Pilgrimage to Israel
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Dec 30, 2025 - Jan 14, 2026</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span className="text-lg font-semibold">$2,900 USD</span>
              </div>
              <p className="text-white/90 text-sm md:text-base">
                A spiritual journey through the land of the Bible. Walk where Jesus walked.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/israel-pilgrimage-2025"
                className="bg-white text-yellow-500 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg text-center"
              >
                Learn More
              </Link>
              <Link 
                to="/apply-israel-tour"
                className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
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
