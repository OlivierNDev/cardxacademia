import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const IsraelPilgrimagePage = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [registrationClosed, setRegistrationClosed] = useState(false);

  // Countdown to March 15, 2026 23:59 Kigali time (CAT - Central Africa Time, UTC+2)
  useEffect(() => {
    const updateCountdown = () => {
      // March 15, 2026 23:59:59 Kigali time (UTC+2)
      // Create date in UTC and convert to Kigali time
      const deadlineUTC = new Date('2026-03-15T21:59:59Z'); // 23:59:59 Kigali = 21:59:59 UTC
      
      // Get current time in UTC
      const nowUTC = new Date();
      
      // Calculate difference
      const difference = deadlineUTC - nowUTC;

      if (difference <= 0) {
        setRegistrationClosed(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const includedItems = [
    { text: 'Israel entry visa' },
    { text: 'Round-trip airfare (Kigali ↔ Israel)' },
    { text: 'Accommodation for the entire duration of the tour' },
    { text: 'Daily meals (breakfast, lunch, and dinner)' },
    { text: 'Private transport for all site visits in Israel' },
    { text: 'Boat ride on the Sea of Galilee' },
    { text: 'Visit to the Dead Sea' },
    { text: 'Professional licensed guides, explaining the history and biblical significance of each site' }
  ];

  const sacredPlaces = [
    'Nazareth',
    'Bethlehem',
    'Cana',
    'Jerusalem',
    'The Tomb of Jesus (Holy Sepulchre)',
    'Jericho',
    'Jordan River',
    'Dead Sea'
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4 font-medium">CardX Academia & Travel Tours Ltd</p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Holy Land Pilgrimage to Israel
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A Christian spiritual pilgrimage offering believers an opportunity to visit sacred biblical sites and strengthen their faith
            </p>
          </div>

          {/* Travel Dates & Price */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Travel Dates</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Departure:</span> March 29, 2026</p>
                <p><span className="font-semibold">Return:</span> April 5, 2026</p>
                <p><span className="font-semibold">Duration:</span> 8 Days / 7 Nights</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tour Cost</h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">USD $2,900</p>
              <p className="text-gray-600">per person</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-4xl mx-auto mb-8">
            {registrationClosed ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
                <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Registration Closed</h3>
                <p className="text-red-600">The registration deadline has passed.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Registration closes in:
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-2">
                      <div className="text-3xl font-bold text-blue-600">{countdown.days}</div>
                    </div>
                    <p className="text-sm text-gray-600">Days</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-2">
                      <div className="text-3xl font-bold text-blue-600">{countdown.hours}</div>
                    </div>
                    <p className="text-sm text-gray-600">Hours</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-2">
                      <div className="text-3xl font-bold text-blue-600">{countdown.minutes}</div>
                    </div>
                    <p className="text-sm text-gray-600">Minutes</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-2">
                      <div className="text-3xl font-bold text-blue-600">{countdown.seconds}</div>
                    </div>
                    <p className="text-sm text-gray-600">Seconds</p>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">Deadline: March 15, 2026 at 23:59 (Kigali time)</p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            {!registrationClosed && (
              <Link to="/apply-israel-tour">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-12 py-6 text-lg"
                >
                  Apply Now
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About the Pilgrimage */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            About the Pilgrimage
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            CardX Academia & Travel Tours Ltd is pleased to organize a Christian spiritual pilgrimage to Israel, offering believers an opportunity to visit sacred biblical sites and strengthen their faith through prayer, fellowship, and historical discovery.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center mt-4">
            This pilgrimage is entirely faith-based, focusing on Christian heritage, worship, and biblical history.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            What the Tour Price Includes
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {includedItems.map((item, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm">• {item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Places to Visit */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Places to Be Visited
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sacredPlaces.map((place, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-800 font-medium">{place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Information */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Registration Information
          </h2>
          <div className="bg-white rounded-lg p-8 space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Registration Status</h3>
              <p className="text-gray-600">Registration is OPEN</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">How to Register</h3>
              <p className="text-gray-600">Registration is done at the CardX Academia & Travel Tours office</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Registration Deadline</h3>
              <p className="text-gray-600">March 15, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="tel:+250788603451" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-gray-200">
              <p className="text-gray-600 mb-2 text-sm font-semibold">Phone</p>
              <p className="font-semibold text-gray-800">+250 788 603 451</p>
              <p className="font-semibold text-gray-800 mt-1">+250 787 420 838</p>
            </a>
            <a href="mailto:tours@cardxacademia.com" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-gray-200">
              <p className="text-gray-600 mb-2 text-sm font-semibold">Email</p>
              <p className="font-semibold text-gray-800 text-sm">tours@cardxacademia.com</p>
              <p className="font-semibold text-gray-800 text-sm mt-1">cardxtraveltours@gmail.com</p>
            </a>
            <a href="https://www.cardxacademia.com" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-gray-200">
              <p className="text-gray-600 mb-2 text-sm font-semibold">Website</p>
              <p className="font-semibold text-gray-800">www.cardxacademia.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {!registrationClosed && (
        <section className="py-16 bg-orange-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              This pilgrimage is more than travel — it is a life-changing spiritual experience. Walk where Jesus walked, pray where history was written, and strengthen your faith through fellowship and worship.
            </p>
            <Link to="/apply-israel-tour">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-12 py-6 text-lg"
              >
                Apply Now
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default IsraelPilgrimagePage;
