import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Get in touch
        </h2>
        <p className="text-gray-600 mb-8">
          For tours, flights, or education support — use the Contact page.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-brand-blue-500 hover:bg-brand-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
