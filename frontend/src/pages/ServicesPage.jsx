import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { 
  GraduationCap, 
  School, 
  FileText, 
  Briefcase, 
  UserCheck, 
  ClipboardCheck,
  Plane,
  Award,
  Globe,
  Mail,
  MapPin,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Assistance with Studying and Working Abroad',
    icon: GraduationCap,
    description: 'Comprehensive support for students and professionals seeking opportunities to study and work internationally.'
  },
  {
    id: 2,
    title: 'University Selection Support',
    icon: School,
    description: 'Expert guidance to help you choose the right university that matches your academic goals and career aspirations.'
  },
  {
    id: 3,
    title: 'Guidance on University Application Processes',
    icon: FileText,
    description: 'Step-by-step assistance through the entire university application process, ensuring all requirements are met.'
  },
  {
    id: 4,
    title: 'Career Advisory Services',
    icon: Briefcase,
    description: 'Professional career counseling to help you make informed decisions about your future career path.'
  },
  {
    id: 5,
    title: 'Admission Consulting',
    icon: UserCheck,
    description: 'Personalized admission consulting services to maximize your chances of acceptance to top universities.'
  },
  {
    id: 6,
    title: 'University/College Offer and Admission Management',
    icon: ClipboardCheck,
    description: 'Complete management of your university offers and admissions, from acceptance to enrollment.'
  },
  {
    id: 7,
    title: 'Visa Application Support',
    icon: Plane,
    description: 'Expert assistance with visa applications, documentation, and follow-up to ensure successful approval.'
  },
  {
    id: 8,
    title: 'Help Finding Partial and Full Scholarships',
    icon: Award,
    description: 'Comprehensive scholarship search and application support to help you secure funding for your education.'
  },
  {
    id: 9,
    title: 'Application Assistance for International Conferences',
    icon: Globe,
    description: 'Support with applications for international conferences, workshops, and academic events.'
  },
  {
    id: 10,
    title: 'Support with Application for Invitation Letters',
    icon: Mail,
    description: 'Assistance in obtaining invitation letters required for visa applications and travel purposes.'
  },
  {
    id: 11,
    title: 'Travel Arrangements Including Flight Booking',
    icon: MapPin,
    description: 'Complete travel arrangement services including affordable flight bookings and itinerary planning.'
  },
  {
    id: 12,
    title: 'Airport Pickup Services',
    icon: Car,
    description: 'Reliable airport pickup and transfer services to ensure a smooth arrival at your destination.'
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            OUR SERVICES
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive support for your international education and travel needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                    <IconComponent 
                      size={32} 
                      className="text-blue-500 group-hover:text-white transition-colors" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Israel Pilgrimage Banner */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  🌍 Special Tour: Holy Land Pilgrimage to Israel
                </h3>
                <p className="text-white/90 mb-3">
                  December 30, 2025 – January 14, 2026 • $2,900 USD
                </p>
                <p className="text-white/90 text-sm">
                  A spiritual journey through the land of the Bible. Walk where Jesus walked.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/israel-pilgrimage-2025">
                  <Button className="bg-white text-yellow-500 hover:bg-gray-100">
                    Learn More
                  </Button>
                </Link>
                <Link to="/apply-israel-tour">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book an appointment with our expert team to discuss your needs and get personalized assistance.
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

export default ServicesPage;
