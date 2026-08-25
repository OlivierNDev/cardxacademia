import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gradient-to-r from-brand-sky-50 to-brand-gold-50 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Terms Of Policy</h1>
          <p className="text-gray-600">Terms and conditions for using CardX Academia services.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-brand-gold-50 border border-brand-gold-100 rounded-lg p-5">
            <p>
              Effective Date: May 27, 2026. By using our website or submitting any form, you agree to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Service Scope</h2>
            <p>
              CardX Academia provides educational consulting, visa advisory support, booking guidance, and travel
              support services. Decisions by embassies, universities, or other authorities remain outside our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Client Responsibility</h2>
            <p>
              You are responsible for submitting complete and truthful information. Inaccurate details may delay or
              affect applications, interviews, decisions, or travel arrangements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Appointments and Bookings</h2>
            <p>
              Appointment slots are subject to availability. Pilgrimage and other travel bookings are processed in
              queue order based on submission time and document readiness.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Fees and Payments</h2>
            <p>
              Service fees, package costs, and payment timelines are communicated before processing. Payments made to
              third-party institutions are governed by the receiving institution&apos;s own terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Refund and Cancellation</h2>
            <p>
              Refund eligibility depends on service stage, completed work, and third-party policies. Cancellation
              requests should be submitted in writing via our official contact channels.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
            <p>
              We provide professional guidance but cannot guarantee outcomes controlled by third parties, including visa
              approvals, admission decisions, scholarship awards, airline schedules, or border-entry policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Content and Intellectual Property</h2>
            <p>
              Website text, branding, and media are the property of CardX Academia unless otherwise stated. You may not
              copy or redistribute content for commercial use without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">8. Updates to Terms</h2>
            <p>
              We may update these terms periodically. The latest version will always be published on this page with the
              current effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">9. Contact</h2>
            <p>
              Email: <a href="mailto:info@cardxacademia.com" className="text-brand-blue-600 hover:underline">info@cardxacademia.com</a>
              <br />
              Phone (Rwanda): <a href="tel:+250788603451" className="text-brand-blue-600 hover:underline">+250 788 603 451</a>, <a href="tel:+250787420838" className="text-brand-blue-600 hover:underline">+250 787 420 838</a>
              <br />
              Phone (Burundi): <a href="tel:+25766314249" className="text-brand-blue-600 hover:underline">+257 663 142 49</a>, <a href="tel:+25769909533" className="text-brand-blue-600 hover:underline">+257 699 095 33</a>
              <br />
              Rwanda Office: 1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City
              <br />
              Burundi Branch: Bujumbura, Rohero II, White stone building/Bureau numéro 11
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TermsPage;
