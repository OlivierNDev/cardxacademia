import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, FileText, Users, GraduationCap, MapPin, Plane, Briefcase, BookOpen, Award, Languages, Calendar, Mail, Info } from 'lucide-react';
import { services, navLinks, testimonials } from '../data/mockData';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Search across all content
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results = [];

    // Search services
    services.forEach(service => {
      const titleMatch = service.title.toLowerCase().includes(query);
      const descMatch = service.description?.toLowerCase().includes(query);
      
      if (titleMatch || descMatch) {
        results.push({
          type: 'service',
          title: service.title,
          description: service.description,
          href: service.href,
          icon: service.icon,
          relevance: titleMatch ? 2 : 1
        });
      }
    });

    // Search navigation links
    navLinks.forEach(link => {
      const nameMatch = link.name.toLowerCase().includes(query);
      
      if (nameMatch && link.href !== '#') {
        results.push({
          type: 'page',
          title: link.name,
          description: `Navigate to ${link.name} page`,
          href: link.href,
          icon: 'file-text',
          relevance: 2
        });
      }

      // Search dropdown items
      if (link.dropdown) {
        link.dropdown.forEach(item => {
          const itemMatch = item.name.toLowerCase().includes(query);
          if (itemMatch) {
            results.push({
              type: 'page',
              title: item.name,
              description: `Navigate to ${item.name} page`,
              href: item.href,
              icon: 'file-text',
              relevance: 2
            });
          }
        });
      }
    });

    // Search testimonials
    testimonials.forEach(testimonial => {
      const nameMatch = testimonial.name?.toLowerCase().includes(query);
      const countryMatch = testimonial.country?.toLowerCase().includes(query);
      const textMatch = testimonial.testimonial?.toLowerCase().includes(query);
      
      if (nameMatch || countryMatch || textMatch) {
        results.push({
          type: 'testimonial',
          title: `${testimonial.name} - ${testimonial.country}`,
          description: testimonial.testimonial?.substring(0, 100) + '...',
          href: '/testimonials',
          icon: 'users',
          relevance: nameMatch ? 3 : countryMatch ? 2 : 1
        });
      }
    });

    // Search common keywords and map to pages
    const keywordMap = {
      'appointment': { title: 'Book Appointment', href: '/appointment', icon: 'calendar' },
      'book': { title: 'Book Appointment', href: '/appointment', icon: 'calendar' },
      'schedule': { title: 'Book Appointment', href: '/appointment', icon: 'calendar' },
      'contact': { title: 'Contact Us', href: '/contact', icon: 'mail' },
      'about': { title: 'About Us', href: '/about', icon: 'info' },
      'visa': { title: 'Visa Services', href: '/visa', icon: 'passport' },
      'student visa': { title: 'Student Visa', href: '/visa/student', icon: 'graduation-cap' },
      'work visa': { title: 'Work Visa', href: '/visa/work', icon: 'briefcase' },
      'visitor visa': { title: 'Visitor Visa', href: '/visa/visitor', icon: 'map-pin' },
      'israel': { title: 'Israel Pilgrimage', href: '/israel-pilgrimage-2025', icon: 'map-pin' },
      'pilgrimage': { title: 'Israel Pilgrimage', href: '/israel-pilgrimage-2025', icon: 'map-pin' },
      'testimonials': { title: 'Testimonials', href: '/testimonials', icon: 'users' },
      'services': { title: 'Our Services', href: '/services', icon: 'briefcase' },
    };

    Object.entries(keywordMap).forEach(([keyword, page]) => {
      if (query.includes(keyword) && !results.find(r => r.href === page.href)) {
        results.push({
          type: 'page',
          title: page.title,
          description: `Go to ${page.title} page`,
          href: page.href,
          icon: page.icon,
          relevance: 3
        });
      }
    });

    // Sort by relevance and remove duplicates
    const uniqueResults = [];
    const seen = new Set();
    
    results
      .sort((a, b) => b.relevance - a.relevance)
      .forEach(result => {
        const key = `${result.type}-${result.href}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueResults.push(result);
        }
      });

    return uniqueResults.slice(0, 10); // Limit to 10 results
  }, [searchQuery]);

  // Handle result click
  const handleResultClick = (href) => {
    navigate(href);
    onClose();
    setSearchQuery('');
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Get icon component
  const getIcon = (iconName) => {
    const iconMap = {
      'graduation-cap': GraduationCap,
      'passport': MapPin,
      'briefcase': Briefcase,
      'map-pin': MapPin,
      'book-open': BookOpen,
      'plane': Plane,
      'file-text': FileText,
      'users': Users,
      'calendar': Calendar,
      'mail': Mail,
      'info': Info,
      'award': Award,
      'languages': Languages,
    };
    const Icon = iconMap[iconName] || FileText;
    return <Icon size={18} className="text-gray-400" />;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 p-4 border-b">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services, pages, testimonials..."
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.href)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <div className="mt-1">
                      {getIcon(result.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 mb-1">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {result.description}
                      </div>
                      <div className="text-xs text-blue-500 mt-1">
                        {result.type === 'service' && 'Service'}
                        {result.type === 'page' && 'Page'}
                        {result.type === 'testimonial' && 'Testimonial'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm mt-2">Try searching for services, pages, or testimonials</p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Start typing to search</p>
              <p className="text-sm mt-2">Search for services, pages, testimonials, and more</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
          Press <kbd className="px-2 py-1 bg-white border rounded">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
