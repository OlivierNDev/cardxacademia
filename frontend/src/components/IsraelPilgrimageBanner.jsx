import React from 'react';
import { Link } from 'react-router-dom';
import {
  PILGRIMAGE_TOUR_DATES_SHORT,
  isPilgrimageRegistrationClosed,
} from '../constants/pilgrimageDeadline';

const IsraelPilgrimageBanner = () => {
  const registrationClosed = isPilgrimageRegistrationClosed();

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-700 mb-1">
              Featured tour
              {registrationClosed ? ' · Registration closed' : ''}
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              Holy Land Israel · {PILGRIMAGE_TOUR_DATES_SHORT}
            </h2>
          </div>
          <Link
            to="/israel-pilgrimage-2026"
            className="inline-flex items-center justify-center border border-gray-300 text-gray-800 hover:border-brand-blue-600 hover:text-brand-blue-700 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
          >
            Tour details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IsraelPilgrimageBanner;
