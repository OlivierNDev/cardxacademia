import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  DollarSign, 
  Mail, 
  Phone,
  ArrowRight,
  Copy,
  CreditCard
} from 'lucide-react';

const ApplicationSubmittedPage = () => {
  // Get application data from sessionStorage
  const applicationData = JSON.parse(sessionStorage.getItem('israelTourApplication') || '{}');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      
      {/* Success Message */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-blue-500" size={48} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for applying to the Holy Land Pilgrimage to Israel
            </p>
          </div>

          {applicationData.fullName && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-bold text-gray-800 mb-4">Application Details</h2>
              <p className="text-gray-700 mb-2"><strong>Name:</strong> {applicationData.fullName}</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {applicationData.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {applicationData.phone}</p>
            </div>
          )}

          {/* Final UX Message */}
          <div className="bg-orange-50 rounded-lg p-8 mb-8 border-2 border-orange-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              Thank you for applying for the CardX Academia Holy Land Pilgrimage. Please complete your payment using the bank details below. Our team will contact you within 2–3 working days to confirm your seat and visa process.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Information - ONLY VISIBLE AFTER SUBMISSION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Tour Cost</h3>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <p className="text-3xl font-bold text-gray-800">USD $2,900</p>
                  <p className="text-gray-600">per person</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-4">Bank Transfer Details</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">CardX Academia & Travel Tours Ltd</span>
                      <button
                        onClick={() => copyToClipboard('CardX Academia & Travel Tours Ltd')}
                        className="text-blue-500 hover:text-blue-600"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-semibold text-gray-800">[To be provided]</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-semibold text-gray-800">[To be provided]</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-semibold text-gray-800">USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SWIFT Code:</span>
                    <span className="font-semibold text-gray-800">[To be provided]</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3">Payment Instructions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span>Full payment: $2,900 USD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span>Installments allowed (as approved)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span>Proof of payment must be submitted by email or WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <span>Visa processing starts after deposit confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Need Help? Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="mailto:tours@cardxacademia.com" className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Mail className="text-blue-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-1">tours@cardxacademia.com</p>
              <p className="text-gray-600 text-sm">cardxtraveltours@gmail.com</p>
            </a>
            <a href="tel:+250788603451" className="bg-orange-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Phone className="text-orange-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+250 788 603 451</p>
              <p className="text-gray-600">+250 787 420 838</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Thank You for Your Application
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We look forward to welcoming you on this life-changing spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/israel-pilgrimage-2025">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg"
              >
                View Tour Details
              </Button>
            </Link>
            <Link to="/">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold px-8 py-6 text-lg"
              >
                Return to Home
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

export default ApplicationSubmittedPage;
