import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  DollarSign,
  Clock,
  Globe,
  ArrowRight,
  BookOpen,
  Users,
  Award
} from 'lucide-react';

const StudentVisaPage = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'University Selection Support',
      description: 'Help you choose the right university and program that matches your academic goals and career aspirations.'
    },
    {
      icon: FileText,
      title: 'Application Process Guidance',
      description: 'Step-by-step assistance through the entire university application process, ensuring all requirements are met.'
    },
    {
      icon: FileText,
      title: 'Document Preparation',
      description: 'Professional help preparing all required documents including transcripts, recommendation letters, and personal statements.'
    },
    {
      icon: DollarSign,
      title: 'Financial Documentation',
      description: 'Guidance on preparing financial documents, bank statements, and proof of funds required for visa applications.'
    },
    {
      icon: Users,
      title: 'Visa Interview Preparation',
      description: 'Comprehensive interview coaching and practice sessions to help you confidently answer visa officer questions.'
    },
    {
      icon: Award,
      title: 'Scholarship Applications',
      description: 'Assistance finding and applying for partial and full scholarships to fund your education abroad.'
    },
    {
      icon: Clock,
      title: 'Timeline Management',
      description: 'Help you manage application deadlines, visa processing times, and ensure timely submission of all documents.'
    },
    {
      icon: Globe,
      title: 'Post-Arrival Support',
      description: 'Ongoing support after you arrive, including orientation, accommodation assistance, and settling in.'
    }
  ];

  const requirements = [
    'Valid passport',
    'Letter of acceptance from educational institution',
    'Proof of financial support',
    'Academic transcripts and certificates',
    'Language proficiency test results (IELTS, TOEFL, etc.)',
    'Medical examination reports (if required)',
    'Police clearance certificate',
    'Visa application forms',
    'Passport-sized photographs',
    'Travel insurance (if required)'
  ];

  const popularDestinations = [
    { country: 'Canada', programs: ['Study Permit', 'Post-Graduation Work Permit'] },
    { country: 'USA', programs: ['F-1 Visa', 'M-1 Visa', 'J-1 Visa'] },
    { country: 'UK', programs: ['Student Visa (Tier 4)', 'Short-term Study Visa'] },
    { country: 'Germany', programs: ['Student Visa', 'Language Course Visa'] },
    { country: 'Australia', programs: ['Student Visa (Subclass 500)'] },
    { country: 'France', programs: ['Student Visa', 'Long-stay Visa'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Student Visa Application
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive assistance for student visa applications to study abroad at top universities and colleges worldwide
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Your Path to International Education
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Studying abroad is a life-changing experience that opens doors to global opportunities. Our expert team provides comprehensive support throughout your student visa application process, from university selection to visa approval and beyond.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We understand that each student's journey is unique. That's why we offer personalized guidance tailored to your specific goals, destination country, and academic background. With our assistance, thousands of students have successfully obtained their student visas and are now pursuing their dreams at top institutions worldwide.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent size={24} className="text-yellow-500" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              );
            })}
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
                While requirements vary by country, here are the common documents needed for student visa applications:
              </p>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Popular Study Destinations
              </h2>
              <p className="text-gray-600 mb-6">
                We assist students with visa applications for these popular study destinations:
              </p>
              <div className="space-y-4">
                {popularDestinations.map((dest, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{dest.country}</h3>
                    <div className="flex flex-wrap gap-2">
                      {dest.programs.map((program, pIndex) => (
                        <span key={pIndex} className="text-sm bg-white text-gray-600 px-3 py-1 rounded">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', desc: 'Initial assessment of your goals and eligibility' },
              { step: '2', title: 'University Selection', desc: 'Help you choose the right institution and program' },
              { step: '3', title: 'Application Support', desc: 'Assist with university and visa applications' },
              { step: '4', title: 'Documentation', desc: 'Prepare and review all required documents' },
              { step: '5', title: 'Interview Prep', desc: 'Coach you for visa interviews' },
              { step: '6', title: 'Submission', desc: 'Submit applications and track progress' },
              { step: '7', title: 'Follow-up', desc: 'Monitor application status and respond to requests' },
              { step: '8', title: 'Post-Arrival', desc: 'Support after you arrive at your destination' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {item.step}
                </div>
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
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book a consultation with our expert team to discuss your student visa application and get personalized guidance.
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

export default StudentVisaPage;
