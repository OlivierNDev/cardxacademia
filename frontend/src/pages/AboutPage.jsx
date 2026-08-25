import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { stats, whyChooseUs } from '../data/mockData';
import { 
  ArrowRight
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-sky-50 to-brand-gold-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About CardX Academia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Travel & Tours first — education and visa support when you need it
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Travel, tours, and pathways abroad
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CardX Academia & Travel Tours helps people move with confidence — from multi-country tours and flight arrangements to study-abroad and visa support. Based in Kigali, Rwanda, with a branch in Bujumbura, Burundi, we serve clients planning leisure travel, pilgrimages, and academic journeys.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our focus is practical: clear itineraries, reliable bookings, and guided next steps. When education or immigration support is needed, the same team helps with admissions, scholarships, and visa preparation.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are booking a tour or preparing for study abroad, we aim for straightforward service from first consultation to departure.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                <div className="text-4xl font-bold text-brand-blue-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To make international travel and education pathways clearer — from tours and bookings to visas and admissions — with practical guidance at every step.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be East Africa's trusted partner for Travel & Tours and study-abroad support, known for clarity, reliability, and end-to-end care from planning to arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature) => (
              <div 
                key={feature.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">International Travel & Tours</h4>
                <p className="text-gray-600 text-sm">Curated multi-country tours and trip planning for memorable journeys.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Flights, Stays & Transfers</h4>
                <p className="text-gray-600 text-sm">Air ticketing, hotel booking, airport pickup, and car rental assistance.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Custom Trip Planning</h4>
                <p className="text-gray-600 text-sm">Personalized itineraries covering sightseeing and day-to-day travel needs.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">University Selection & Admission</h4>
                <p className="text-gray-600 text-sm">Guidance choosing schools and navigating applications abroad.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Visa & Immigration Support</h4>
                <p className="text-gray-600 text-sm">Student, visitor, work, and related visa application assistance.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Scholarships & Consultations</h4>
                <p className="text-gray-600 text-sm">Help finding funding and one-on-one planning for education pathways.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Excellence', desc: 'We strive for the highest standards in everything we do.' },
              { title: 'Integrity', desc: 'Honest, transparent, and ethical in all our interactions.' },
              { title: 'Dedication', desc: 'Committed to your success from start to finish.' },
              { title: 'Innovation', desc: 'Continuously improving our services and processes.' }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to plan your next trip?
          </h2>
          <p className="text-brand-blue-50 mb-8 text-lg">
            Start with a consultation for tours, travel arrangements, or education pathways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button 
                size="lg" 
                className="bg-white text-brand-blue-700 hover:bg-brand-blue-50 font-semibold px-8 py-6 text-lg"
              >
                Book an Appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                Contact Us
                <ArrowRight size={20} className="ml-2" />
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

export default AboutPage;
