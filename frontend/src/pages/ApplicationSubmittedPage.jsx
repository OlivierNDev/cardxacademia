import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Get application data from sessionStorage
  const applicationData = JSON.parse(sessionStorage.getItem('israelTourApplication') || '{}');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Success Message */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={48} />
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

          <div className="bg-yellow-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Review Your Application</h3>
                  <p className="text-gray-600">Our team will review your application and contact you within 2-3 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Make Payment</h3>
                  <p className="text-gray-600">Once approved, you'll receive payment instructions. See payment details below.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Submit Payment Proof</h3>
                  <p className="text-gray-600">Send proof of payment via email or WhatsApp to confirm your seat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Visa Processing</h3>
                  <p className="text-gray-600">Visa processing will begin after deposit confirmation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Tour Cost</h3>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
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
                      <span className="font-semibold text-gray-800">CardX Academia & Travel Tours</span>
                      <button
                        onClick={() => copyToClipboard('CardX Academia & Travel Tours')}
                        className="text-blue-500 hover:text-blue-600"
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
                <h3 className="font-bold text-gray-800 mb-3">Payment Notes</h3>
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
              <p className="text-gray-600">tours@cardxacademia.com</p>
            </a>
            <a href="tel:+250788603451" className="bg-yellow-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Phone className="text-yellow-500 mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+250 788 603 451</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Thank You for Your Application
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            We look forward to welcoming you on this life-changing spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/israel-pilgrimage-2025">
              <Button 
                size="lg" 
                className="bg-white text-yellow-500 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                View Tour Details
              </Button>
            </Link>
            <Link to="/">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
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
