import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const groupedLinks = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Services', href: '/services' },
      { label: 'Appointment', href: '/appointment' }
    ]
  },
  {
    title: 'Visa Services',
    links: [
      { label: 'All Visa Services', href: '/visa' },
      { label: 'Student Visa', href: '/visa/student' },
      { label: 'Work Visa', href: '/visa/work' },
      { label: 'Visitor Visa', href: '/visa/visitor' }
    ]
  },
  {
    title: 'Israel Pilgrimage',
    links: [
      { label: 'Israel Pilgrimage 2026', href: '/israel-pilgrimage-2026' },
      { label: 'Apply for Israel Tour', href: '/apply-israel-tour' },
      { label: 'Application Submitted', href: '/application-submitted' }
    ]
  },
  {
    title: 'Legal and SEO',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms Of Policy', href: '/terms' },
      { label: 'HTML Sitemap', href: '/sitemap' },
      { label: 'XML Sitemap', href: '/sitemap.xml', external: true }
    ]
  }
];

const SitemapPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gradient-to-r from-brand-sky-50 to-brand-gold-50 py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Site Map</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse all key pages across CardX Academia. This deep sitemap helps visitors and search engines discover
            services, application flows, and legal pages quickly.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {groupedLinks.map((group) => (
              <div key={group.title} className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{group.title}</h2>
                <ul className="space-y-2">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          className="text-brand-blue-600 hover:text-brand-blue-700 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link to={item.href} className="text-brand-blue-600 hover:text-brand-blue-700 hover:underline">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default SitemapPage;
