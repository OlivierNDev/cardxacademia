import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight
} from 'lucide-react';

const VisitorVisaPage = () => {
  const services = [
    {
      title: 'Application Guidance',
      description: 'Step-by-step assistance through the entire visitor visa application process.'
    },
    {
      title: 'Document Preparation',
      description: 'Help preparing all required documents including invitation letters, travel itineraries, and financial proof.'
    },
    {
      title: 'Financial Documentation',
      description: 'Guidance on preparing bank statements, proof of funds, and financial support documents.'
    },
    {
      title: 'Travel Itinerary Planning',
      description: 'Assistance creating detailed travel plans and itineraries required for visa applications.'
    },
    {
      title: 'Timeline Management',
      description: 'Help managing application deadlines and processing times for timely submission.'
    },
    {
      title: 'Multiple Entry Support',
      description: 'Guidance on applying for single or multiple entry visitor visas based on your travel needs.'
    }
  ];

  const requirements = [
    'Valid passport (minimum 6 months validity)',
    'Completed visa application form',
    'Passport-sized photographs',
    'Proof of financial means (bank statements)',
    'Travel itinerary and flight bookings',
    'Hotel reservations or accommodation proof',
    'Travel insurance (if required)',
    'Invitation letter (if visiting family/friends)',
    'Proof of ties to home country',
    'Previous travel history (if applicable)'
  ];

  const popularDestinations = [
    { country: 'USA', type: 'B-2 Tourist Visa', duration: 'Up to 6 months' },
    { country: 'UK', type: 'Standard Visitor Visa', duration: 'Up to 6 months' },
    { country: 'Schengen', type: 'Schengen Visa', duration: 'Up to 90 days' },
    { country: 'Canada', type: 'Visitor Visa (TRV)', duration: 'Up to 6 months' },
    { country: 'Australia', type: 'Visitor Visa (Subclass 600)', duration: '3-12 months' },
    { country: 'UAE', type: 'Tourist Visa', duration: '30-90 days' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Visitor / Tourist Visa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance for tourist and visitor visa applications for short-term travel, tourism, and family visits
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Your Gateway to Travel
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Whether you're planning a vacation, visiting family and friends, or exploring new destinations, our expert team provides comprehensive support for your visitor visa application. We guide you through every step to ensure a smooth and successful application process.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Visitor visas are typically issued for short-term stays, allowing you to travel for tourism, business meetings, medical treatment, or to visit family. Requirements vary by destination, and we help you navigate these differences to prepare a strong application.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            How We Help You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{service.title}</h3>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Required Documents
              </h2>
              <p className="text-gray-600 mb-6">
                While requirements vary by country, here are common documents needed for visitor visa applications:
              </p>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    • {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Popular Destinations
              </h2>
              <p className="text-gray-600 mb-6">
                We assist with visitor visa applications for these popular destinations:
              </p>
              <div className="space-y-4">
                {popularDestinations.map((dest, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{dest.country}</h3>
                    <p className="text-sm text-gray-600 mb-1">{dest.type}</p>
                    <p className="text-xs text-gray-500">Duration: {dest.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Application Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Consultation', desc: 'Assess your travel plans and visa requirements' },
              { step: '2', title: 'Documentation', desc: 'Prepare and review all required documents' },
              { step: '3', title: 'Application', desc: 'Complete and submit visa application forms' },
              { step: '4', title: 'Follow-up', desc: 'Monitor application and respond to requests' },
              { step: '5', title: 'Interview Prep', desc: 'Prepare for visa interview if required' },
              { step: '6', title: 'Approval', desc: 'Assist with visa collection and travel planning' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-sm font-semibold text-blue-500 mb-2">Step {item.step}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book a consultation with our expert team to discuss your visitor visa application and get personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button 
                size="lg" 
                className="bg-white text-blue-500 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                Book an Appointment
              </Button>
            </Link>
            <Link to="/visa">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                View Other Visa Types
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

export default VisitorVisaPage;
