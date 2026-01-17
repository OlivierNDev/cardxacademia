import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  DollarSign, 
  Plane, 
  MapPin,
  Utensils,
  Bus,
  Ship,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

const IsraelPilgrimagePage = () => {
  const includedItems = [
    { icon: Plane, text: 'Round-trip international flight (Kigali ↔ Israel)' },
    { icon: MapPin, text: 'Israel entry visa' },
    { icon: Bus, text: 'Accommodation for the entire stay' },
    { icon: Utensils, text: 'Three meals daily (breakfast, lunch, dinner)' },
    { icon: Bus, text: 'Private transportation throughout the tour' },
    { icon: Ship, text: 'Visit to the Dead Sea' },
    { icon: Ship, text: 'Boat ride on the Sea of Galilee' },
    { icon: Users, text: 'Professional, certified tour guides' },
    { icon: Users, text: 'Spiritual guidance throughout the pilgrimage' }
  ];

  const sacredPlaces = [
    { name: 'Nazareth', description: 'Where Jesus grew up' },
    { name: 'Bethlehem', description: 'Birthplace of Jesus' },
    { name: 'Cana', description: 'Site of Jesus\' first miracle' },
    { name: 'Jerusalem', description: 'The heart of Christian history' },
    { name: 'The Holy Sepulchre', description: 'Tomb of Jesus' },
    { name: 'Jericho', description: 'One of the world\'s oldest cities' },
    { name: 'Jordan River', description: 'Baptism site of Jesus' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              CardX Academia & Travel Tours
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Holy Land Pilgrimage to Israel
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span className="text-lg">December 30, 2025 – January 14, 2026</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span className="text-lg">16 Days / 15 Nights</span>
            </div>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            A Spiritual Journey Through the Land of the Bible
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply-israel-tour">
              <Button 
                size="lg" 
                className="bg-white text-yellow-500 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                Apply Now
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

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              A Faith-Enriching Pilgrimage
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CardX Academia & Travel Tours invites Christians to take part in a faith-enriching pilgrimage to Israel, visiting the most sacred biblical sites connected to the life of Jesus Christ and the foundations of Christianity.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              This pilgrimage is carefully organized to offer spiritual growth, historical understanding, comfort, and safety, guided by professional and experienced tour leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-blue-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-800">Travel Dates</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Departure</p>
                  <p className="text-lg font-semibold text-gray-800">December 30, 2025</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Return</p>
                  <p className="text-lg font-semibold text-gray-800">January 14, 2026</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-gray-800">16 Days / 15 Nights</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="text-yellow-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-800">Tour Cost</h3>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-800 mb-2">USD $2,900</p>
                <p className="text-gray-600">per person</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This amount covers all major travel and pilgrimage needs, allowing participants to focus fully on prayer, reflection, and discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            What the Price Includes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-blue-500" size={20} />
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sacred Places */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Sacred Places to Be Visited
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sacredPlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{place.name}</h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-700 text-lg italic">
              This is a religious pilgrimage designed to deepen faith by walking through the lands that shaped Christian history.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Registration Information
            </h2>
            <div className="bg-blue-50 rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Registration Status</h3>
                  <p className="text-gray-600">Registration is OPEN</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">How to Register</h3>
                  <p className="text-gray-600">Registration is done through churches</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Deadline</h3>
                  <p className="text-gray-600">December 12, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Important Notes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-700">📌 Passport must be valid beyond January 2026</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-700">📌 Limited seats available</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-700">📌 Visa approval is subject to embassy regulations</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-700">📌 Early application is strongly encouraged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Contact for More Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="tel:+250788603451" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="mx-auto text-blue-500 mb-3" size={32} />
              <p className="text-gray-600 mb-1">Phone</p>
              <p className="font-semibold text-gray-800">+250 788 603 451</p>
            </a>
            <a href="mailto:tours@cardxacademia.com" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="mx-auto text-blue-500 mb-3" size={32} />
              <p className="text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-gray-800">tours@cardxacademia.com</p>
            </a>
            <a href="https://www.cardxacademia.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Globe className="mx-auto text-blue-500 mb-3" size={32} />
              <p className="text-gray-600 mb-1">Website</p>
              <p className="font-semibold text-gray-800">www.cardxacademia.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            This pilgrimage is more than travel — it is a life-changing spiritual experience. Walk where Jesus walked, pray where history was written, and strengthen your faith through fellowship and worship.
          </p>
          <Link to="/apply-israel-tour">
            <Button 
              size="lg" 
              className="bg-white text-yellow-500 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
            >
              Apply for the Holy Land Pilgrimage
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default IsraelPilgrimagePage;
