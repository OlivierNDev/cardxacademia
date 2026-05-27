import React, { useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />

      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Privacy Policy</h1>
          <p className="text-gray-600">How CardX Academia collects, uses, and protects your data.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <p>
              Effective Date: May 27, 2026. This policy applies to all services provided by CardX Academia and
              Travel Tours through our website, appointment forms, visa forms, and Israel pilgrimage registration.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including your name, email, phone number, country, travel
              details, passport details, emergency contact details, appointment preferences, and related application
              information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>
              We use your information to process applications, schedule consultations, provide visa and travel support,
              send booking confirmations, share service updates, and communicate required next steps.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Legal Basis and Consent</h2>
            <p>
              By submitting forms on our website, you consent to the processing of your personal information for
              legitimate service delivery purposes. You may request correction or deletion of your data, subject to
              legal and operational retention obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Sharing</h2>
            <p>
              We only share your data with trusted partners where necessary to deliver services, such as universities,
              visa authorities, airlines, and secure service providers (for communication and hosting). We do not sell
              personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Security</h2>
            <p>
              We apply reasonable technical and organizational safeguards to protect your information against
              unauthorized access, misuse, or loss. No online system is fully risk-free, but we continuously improve
              our protection standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Data Retention</h2>
            <p>
              We keep your records for as long as needed to provide services, support compliance, and maintain
              operational history. We may anonymize or delete old records when they are no longer required.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Your Rights</h2>
            <p>
              You can request access, correction, or deletion of your personal information by contacting us. You may
              also request a clarification on how your data is being used for your application.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contact for Privacy Matters</h2>
            <p>
              Email: <a href="mailto:info@cardxacademia.com" className="text-blue-600 hover:underline">info@cardxacademia.com</a>
              <br />
              Phone: <a href="tel:+250788603451" className="text-blue-600 hover:underline">+250 788 603 451</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PrivacyPage;
