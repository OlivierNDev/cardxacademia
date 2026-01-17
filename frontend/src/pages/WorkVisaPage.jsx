import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  Building2,
  Clock,
  Globe,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const WorkVisaPage = () => {
  const services = [
    {
      icon: UserCheck,
      title: 'Eligibility Assessment',
      description: 'Evaluate your qualifications, work experience, and skills to determine the best work visa options for you.'
    },
    {
      icon: Building2,
      title: 'Employer Sponsorship Support',
      description: 'Assist with finding employers who can sponsor your work visa and guide them through the sponsorship process.'
    },
    {
      icon: FileText,
      title: 'Work Permit Applications',
      description: 'Complete support for work permit applications, including all required forms and documentation.'
    },
    {
      icon: Award,
      title: 'Skills Assessment',
      description: 'Help with skills assessment and credential evaluation required for skilled worker visa programs.'
    },
    {
      icon: FileText,
      title: 'Labor Market Impact',
      description: 'Assistance with Labor Market Impact Assessments (LMIAs) and similar employer documentation requirements.'
    },
    {
      icon: TrendingUp,
      title: 'Career Guidance',
      description: 'Professional advice on career paths, job opportunities, and work authorization options in your destination country.'
    },
    {
      icon: Clock,
      title: 'Timeline Management',
      description: 'Help you understand processing times, manage deadlines, and ensure timely submission of all documents.'
    },
    {
      icon: Globe,
      title: 'Work Authorization Support',
      description: 'Guidance on work authorization, visa renewals, and transitioning to permanent residence if applicable.'
    }
  ];

  const requirements = [
    'Valid passport',
    'Job offer letter from employer',
    'Employer sponsorship documents',
    'Educational certificates and credentials',
    'Work experience letters',
    'Skills assessment results (if required)',
    'Language proficiency test results',
    'Medical examination reports (if required)',
    'Police clearance certificate',
    'Work permit application forms',
    'Labor Market Impact Assessment (LMIA) - if required',
    'Passport-sized photographs'
  ];

  const workVisaTypes = [
    { 
      country: 'Canada', 
      programs: [
        'Temporary Foreign Worker Program',
        'International Mobility Program',
        'Post-Graduation Work Permit',
        'Express Entry (FSW, CEC)'
      ] 
    },
    { 
      country: 'USA', 
      programs: [
        'H-1B Visa (Specialty Occupations)',
        'L-1 Visa (Intracompany Transfer)',
        'E-2 Visa (Treaty Investor)',
        'O-1 Visa (Extraordinary Ability)'
      ] 
    },
    { 
      country: 'UK', 
      programs: [
        'Skilled Worker Visa',
        'Health and Care Worker Visa',
        'Intra-company Transfer Visa',
        'Start-up and Innovator Visa'
      ] 
    },
    { 
      country: 'Germany', 
      programs: [
        'EU Blue Card',
        'Skilled Worker Visa',
        'Job Seeker Visa',
        'Freelancer Visa'
      ] 
    },
    { 
      country: 'Australia', 
      programs: [
        'Temporary Skill Shortage (TSS) Visa',
        'Skilled Independent Visa',
        'Employer Nomination Scheme',
        'Regional Sponsored Migration'
      ] 
    },
    { 
      country: 'UAE', 
      programs: [
        'Employment Visa',
        'Investor Visa',
        'Freelancer Permit',
        'Golden Visa'
      ] 
    }
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
              <Briefcase size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Work Visa / Work Permit Application
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Professional support for work visa and work permit applications, helping you secure employment opportunities abroad
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Your Path to International Employment
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Working abroad offers incredible opportunities for career growth, skill development, and financial advancement. Our expert team provides comprehensive support throughout your work visa application process, from finding the right opportunity to securing your work permit.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We understand the complexities of work visa applications, which vary significantly by country and job type. Whether you're a skilled professional, an investor, or looking for temporary work opportunities, we guide you through every step to ensure a successful application.
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
                While requirements vary by country and visa type, here are common documents needed for work visa applications:
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
                Popular Work Visa Programs
              </h2>
              <p className="text-gray-600 mb-6">
                We assist professionals with work visa applications for these popular destinations:
              </p>
              <div className="space-y-4">
                {workVisaTypes.map((dest, index) => (
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
              { step: '1', title: 'Consultation', desc: 'Assess your qualifications and work visa options' },
              { step: '2', title: 'Job Search Support', desc: 'Help find employers or assess job offers' },
              { step: '3', title: 'Employer Support', desc: 'Guide employers through sponsorship process' },
              { step: '4', title: 'Documentation', desc: 'Prepare and review all required documents' },
              { step: '5', title: 'Application Filing', desc: 'Complete and submit work permit applications' },
              { step: '6', title: 'Follow-up', desc: 'Monitor application and respond to requests' },
              { step: '7', title: 'Approval Support', desc: 'Assist with visa issuance and travel arrangements' },
              { step: '8', title: 'Post-Arrival', desc: 'Support with work authorization and settlement' }
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
            Ready to Work Abroad?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book a consultation with our expert team to discuss your work visa application and explore your options.
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

export default WorkVisaPage;
