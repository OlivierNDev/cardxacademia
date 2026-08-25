import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { contactInfo } from '../data/mockData';

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
  const formRef = useRef(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // Scroll to success message when form is submitted
  useEffect(() => {
    if (submitted && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [submitted]);

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
      
      // Scroll to top to show success message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const { rwanda, burundi } = contactInfo.offices;

  const contactInfoItems = [
    {
      title: 'Email',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`
    },
    ...rwanda.phones.map((phone) => ({
      title: 'Phone',
      value: phone.display,
      link: `tel:${phone.tel}`,
      country: rwanda.country,
      branch: rwanda.label,
    })),
    {
      title: 'Phone',
      value: '+1 (343) 999-2932',
      link: 'tel:+13439992932',
      country: '🇨🇦'
    },
    {
      title: 'Phone',
      value: '+972 53-481-0764',
      link: 'tel:+972534810764',
      country: '🇮🇱'
    },
    ...burundi.phones.map((phone) => ({
      title: 'Phone',
      value: phone.display,
      link: `tel:${phone.tel}`,
      country: burundi.country,
      branch: burundi.label,
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="border-b border-gray-100 bg-brand-sky-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.18em] text-brand-blue-600 mb-3">
            Contact
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Get in touch
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Email, call, or send a message — we will respond as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reach us
              </h2>

              <div className="space-y-4 mb-8">
                {contactInfoItems.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {info.branch ? `${info.title} – ${info.branch}` : info.title}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      {info.country && <span>{info.country}</span>}
                      <span>{info.value}</span>
                    </p>
                  </a>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/people/CardX-Academia-Travel-Tours/61566607427435/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-brand-blue-50 hover:border-brand-blue-200 hover:text-brand-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/cardx_academia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-brand-gold-50 hover:border-brand-gold-200 hover:text-brand-gold-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@cardx.academia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:text-black transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    <span className="text-sm font-medium">TikTok</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/cardx-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-brand-blue-50 hover:border-brand-blue-200 hover:text-brand-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 9:00 AM - 1:00 PM</p>
                  <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-brand-gold-50 border border-brand-gold-200 rounded-lg">
                  <p className="text-brand-gold-700 font-medium">
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
                  className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold py-6 text-lg"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Visit Our Offices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
              <p className="text-gray-800 font-semibold mb-2">{rwanda.label}</p>
              <p className="text-gray-600 text-sm">{rwanda.address}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
              <p className="text-gray-800 font-semibold mb-2">{burundi.label}</p>
              <p className="text-gray-600 text-sm">{burundi.address}</p>
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
