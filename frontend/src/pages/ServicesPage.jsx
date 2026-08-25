import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/mockData';
import { PILGRIMAGE_TOUR_DATES_SHORT } from '../constants/pilgrimageDeadline';

const travelServices = services.filter(
  (service) => service.category === 'travel' && service.icon !== 'landmark'
);
const educationServices = services.filter((service) => service.category === 'education');
const israelTour = services.find((service) => service.icon === 'landmark');

const ServiceRow = ({ service }) => (
  <div className="border-t border-gray-200 py-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{service.description}</p>
  </div>
);

const ServicesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#education') {
      const el = document.getElementById('education');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="border-b border-gray-100 bg-brand-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.18em] text-brand-blue-600 mb-3">Services</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 max-w-2xl">
            Travel first. Education when you need it.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Tours, flights, stays, and transfers — plus study-abroad and visa support.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Travel & Tours</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            End-to-end trip support across destinations.
          </p>
          <div>
            {travelServices.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {israelTour && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="border border-gray-200 rounded-md p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-brand-sky-50">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-700 mb-2">
                  Upcoming tour · Registration closed
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{israelTour.title}</h2>
                <p className="text-gray-600">
                  {PILGRIMAGE_TOUR_DATES_SHORT} · $2,900 USD
                </p>
              </div>
              <Link to="/israel-pilgrimage-2026">
                <Button className="bg-brand-blue-600 text-white hover:bg-brand-blue-700">
                  View tour details
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="education" className="py-16 border-t border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Visa Support</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Study abroad, admissions, scholarships, and immigration guidance.
          </p>
          <div>
            {educationServices.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Start with a conversation</h2>
          <p className="text-brand-blue-50 mb-8">
            Tell us where you want to go — travel plans or education pathways.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/appointment">
              <Button size="lg" className="bg-white text-brand-blue-700 hover:bg-brand-blue-50 font-semibold px-8">
                Book an appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
              >
                Contact us
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

export default ServicesPage;
