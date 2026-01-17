import React, { useState } from 'react';
import { contactInfo } from '../data/mockData';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Quick Contact
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              If you have any enquires, email us using the form and we will get back.
            </p>

            <div className="space-y-4">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="block text-blue-600 hover:text-blue-700 transition-colors p-3 border border-gray-200 rounded-lg hover:bg-blue-50"
              >
                <span className="text-sm font-semibold text-gray-700">Email:</span>
                <span className="text-lg ml-2">{contactInfo.email}</span>
              </a>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="block text-blue-600 hover:text-blue-700 transition-colors p-3 border border-gray-200 rounded-lg hover:bg-blue-50"
              >
                <span className="text-sm font-semibold text-gray-700">Phone:</span>
                <span className="text-lg ml-2">{contactInfo.phone}</span>
              </a>
              <div className="text-gray-600 p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-semibold text-gray-700">Address:</span>
                <span className="text-lg ml-2">{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Leave A Message
            </h3>
            <p className="text-gray-500 mb-6">And we will get back to you soon!</p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="Message"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
