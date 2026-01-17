import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@cardxacademia.com',
      link: 'mailto:info@cardxacademia.com',
      color: 'bg-blue-50 text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+250 787 420 838',
      link: 'tel:+250787420838',
      country: '🇷🇼',
      color: 'bg-yellow-50 text-yellow-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (343) 999-2932',
      link: 'tel:+13439992932',
      country: '🇨🇦',
      color: 'bg-yellow-50 text-yellow-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+972 53-481-0764',
      link: 'tel:+972534810764',
      country: '🇮🇱',
      color: 'bg-yellow-50 text-yellow-500'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Town Center Building (TCB), 1st Floor, Door F1B-013D, Kigali City',
      link: '#',
      color: 'bg-blue-50 text-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get in touch with our team. We're here to help you with all your visa and education needs.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions about our services? Want to schedule a consultation? Reach out to us through any of the contact methods below. Our team is ready to assist you.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          {info.country && <span>{info.country}</span>}
                          <span>{info.value}</span>
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">Office Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 9:00 AM - 1:00 PM</p>
                  <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="+250 788 123 456"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-6 text-lg"
                >
                  {submitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Visit Our Office
          </h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-600 font-medium">
                Town Center Building (TCB)
              </p>
              <p className="text-gray-500 text-sm">
                1st Floor, Door F1B-013D, Kigali City
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ContactPage;
