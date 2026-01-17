import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
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
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About Cardx Academia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in global education and travel
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Empowering Global Education Dreams
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Cardx Academia and Travel Tours is a leading educational consulting firm dedicated to helping students and professionals achieve their dreams of studying and working abroad. Based in Kigali, Rwanda, we have established ourselves as a trusted partner for thousands of students seeking international education opportunities.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our mission is to provide comprehensive, personalized support throughout every step of your journey—from university selection and admission to visa applications and travel arrangements. We believe that education knows no boundaries, and we're committed to making global opportunities accessible to everyone.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With a proven track record of success and partnerships with hundreds of universities worldwide, we combine expertise, dedication, and personalized service to ensure your success.
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
                <div className="text-4xl font-bold text-blue-500 mb-2">
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
                To empower students and professionals by providing expert guidance, comprehensive support, and seamless services for international education and travel. We strive to make global opportunities accessible and achievable for everyone, regardless of their background.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the leading educational consulting firm in East Africa, recognized for excellence in student placement, visa services, and travel support. We envision a world where every student has access to quality international education opportunities.
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
                <h4 className="font-bold text-gray-800 mb-1">University Selection & Admission</h4>
                <p className="text-gray-600 text-sm">Expert guidance in choosing the right university and navigating the admission process.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Visa Application Support</h4>
                <p className="text-gray-600 text-sm">Comprehensive assistance for all types of visa applications worldwide.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Air Ticket Booking</h4>
                <p className="text-gray-600 text-sm">Affordable flight bookings and travel arrangements for your journey.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Personalized Consultations</h4>
                <p className="text-gray-600 text-sm">One-on-one consultations tailored to your specific needs and goals.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Scholarship Assistance</h4>
                <p className="text-gray-600 text-sm">Help finding and applying for partial and full scholarships.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Global Reach</h4>
                <p className="text-gray-600 text-sm">Partnerships with universities across 40+ countries worldwide.</p>
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
      <section className="py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Let us help you achieve your dreams of studying or working abroad. Get in touch with our expert team today.
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
