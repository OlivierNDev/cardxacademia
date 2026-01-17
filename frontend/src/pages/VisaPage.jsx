import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const visaTypes = [
  {
    id: 'student',
    title: 'Student Visa',
    description: 'Comprehensive assistance for student visa applications to study abroad at universities, colleges, and educational institutions worldwide.',
    href: '/visa/student',
    features: [
      'University admission support',
      'Document preparation',
      'Visa interview preparation',
      'Financial documentation',
      'Post-arrival support'
    ],
    popularCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia']
  },
  {
    id: 'work',
    title: 'Work Visa / Work Permit',
    description: 'Professional support for work visa and work permit applications, helping you secure employment opportunities abroad.',
    href: '/visa/work',
    features: [
      'Work permit applications',
      'Employer sponsorship support',
      'Skills assessment',
      'Labor market impact assessments',
      'Work authorization guidance'
    ],
    popularCountries: ['Canada', 'USA', 'UK', 'Germany', 'UAE']
  },
  {
    id: 'visitor',
    title: 'Visitor / Tourist Visa',
    description: 'Expert guidance for tourist and visitor visa applications for short-term travel, tourism, and family visits.',
    href: '/visa/visitor',
    features: [
      'Tourist visa applications',
      'Family visit visas',
      'Travel itinerary planning',
      'Travel insurance guidance',
      'Multiple entry visa support'
    ],
    popularCountries: ['USA', 'UK', 'Schengen', 'Canada', 'Australia']
  },
  {
    id: 'business',
    title: 'Business Visa',
    description: 'Assistance with business visa applications for business meetings, conferences, and commercial activities.',
    href: '/visa/business',
    features: [
      'Business meeting visas',
      'Conference attendance',
      'Commercial activities',
      'Investor visa support',
      'Business documentation'
    ],
    popularCountries: ['USA', 'UK', 'Schengen', 'China', 'UAE']
  },
  {
    id: 'family',
    title: 'Family / Spouse Visa',
    description: 'Support for family reunification visas, spouse visas, and dependent visas to join family members abroad.',
    href: '/visa/family',
    features: [
      'Spouse visa applications',
      'Family reunification',
      'Dependent visa support',
      'Relationship documentation',
      'Sponsorship guidance'
    ],
    popularCountries: ['Canada', 'USA', 'UK', 'Australia', 'New Zealand']
  },
  {
    id: 'permanent',
    title: 'Permanent Residence',
    description: 'Comprehensive guidance for permanent residence applications, including Express Entry, skilled worker programs, and immigration pathways.',
    href: '/visa/permanent',
    features: [
      'Express Entry (Canada)',
      'Skilled worker programs',
      'Provincial nominations',
      'Immigration pathways',
      'Settlement support'
    ],
    popularCountries: ['Canada', 'Australia', 'New Zealand', 'UK']
  },
  {
    id: 'transit',
    title: 'Transit Visa',
    description: 'Assistance with transit visa applications for travelers passing through countries on their way to final destinations.',
    href: '/visa/transit',
    features: [
      'Airport transit visas',
      'Short-stay transit',
      'Multiple country transit',
      'Travel documentation',
      'Quick processing support'
    ],
    popularCountries: ['Schengen', 'UK', 'USA', 'UAE', 'Singapore']
  },
  {
    id: 'express-entry',
    title: 'Express Entry (Canada)',
    description: 'Complete Express Entry program guidance for Canadian immigration through Federal Skilled Worker, Federal Skilled Trades, and Canadian Experience Class programs.',
    href: '/visa/express-entry',
    features: [
      'CRS score optimization',
      'Profile creation and submission',
      'Provincial nominations',
      'ITA support',
      'Permanent residence pathway'
    ],
    popularCountries: ['Canada']
  }
];

const VisaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Visa Application Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive visa support for all types of applications. We handle student visas, work permits, visitor visas, and more.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Apply to All Types of VISAs
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Cardx Academia, we provide expert assistance for all visa types. Whether you're looking to study, work, visit, or immigrate permanently, our experienced team guides you through every step of the application process. We handle documentation, prepare you for interviews, and ensure your application meets all requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Visa Types Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Visa Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaTypes.map((visa) => (
              <div 
                key={visa.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {visa.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {visa.description}
                </p>
                
                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What We Offer:</p>
                  <ul className="space-y-1 mb-4">
                    {visa.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-600">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Countries */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Popular Destinations:</p>
                  <div className="flex flex-wrap gap-1">
                    {visa.popularCountries.slice(0, 3).map((country, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {country}
                      </span>
                    ))}
                    {visa.popularCountries.length > 3 && (
                      <span className="text-xs text-gray-500">+{visa.popularCountries.length - 3} more</span>
                    )}
                  </div>
                </div>

                <Link to={visa.href}>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help with Your Visa Application?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book a consultation with our expert team to discuss your visa needs and get personalized guidance.
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
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                Contact Us
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

export default VisaPage;
