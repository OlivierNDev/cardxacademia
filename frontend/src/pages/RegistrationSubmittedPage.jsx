import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { contactInfo } from '../data/mockData';

const RegistrationSubmittedPage = () => {
  const registration = JSON.parse(sessionStorage.getItem('tourRegistration') || '{}');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const fullName = [registration.first_name, registration.last_name].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-brand-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-brand-blue-500" size={44} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Registration Submitted
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for registering with CardX Academia & Travel Tours. Our team will review your application and contact you shortly.
          </p>

          {fullName && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-3">Submission Summary</h2>
              <p className="text-gray-700 mb-1"><strong>Name:</strong> {fullName}</p>
              {registration.telephone_number && (
                <p className="text-gray-700 mb-1"><strong>Telephone:</strong> {registration.telephone_number}</p>
              )}
              {registration.email && (
                <p className="text-gray-700 mb-1"><strong>Email:</strong> {registration.email}</p>
              )}
              {registration.id && (
                <p className="text-gray-500 text-sm mt-2">Reference: {registration.id.slice(0, 8).toUpperCase()}</p>
              )}
            </div>
          )}

          <div className="bg-brand-blue-50 rounded-xl p-6 mb-10 text-left border border-brand-blue-100">
            <p className="text-gray-700 leading-relaxed">
              A confirmation email has been sent to your inbox{registration.email ? ` (${registration.email})` : ''}. Please keep your reference number handy. A member of our team will reach out within 2–3 working days regarding next steps for your tour registration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="text-brand-blue-500 flex-shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-sm text-gray-600">{contactInfo.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="text-brand-gold-500 flex-shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-sm text-gray-600">{contactInfo.phoneDisplay}</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold px-8">
                Return Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-blue-500 text-brand-blue-500 hover:bg-brand-blue-50 font-semibold px-8"
              >
                Contact Us
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RegistrationSubmittedPage;
