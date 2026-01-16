import React, { useState } from 'react';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { navLinks } from '../data/mockData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className="relative w-20 h-16">
            {/* CardX Logo */}
            <svg viewBox="0 0 100 70" className="w-full h-full">
              {/* Blue circles */}
              <circle cx="25" cy="25" r="20" fill="none" stroke="#1E88E5" strokeWidth="4"/>
              <circle cx="35" cy="25" r="15" fill="none" stroke="#1E88E5" strokeWidth="3"/>
              <circle cx="42" cy="25" r="10" fill="none" stroke="#1E88E5" strokeWidth="2"/>
              {/* Yellow dots */}
              <circle cx="55" cy="15" r="5" fill="#F5A623"/>
              <circle cx="65" cy="25" r="3" fill="#F5A623"/>
              {/* Text */}
              <text x="15" y="60" fontFamily="Georgia, serif" fontSize="20" fontStyle="italic" fill="#1E88E5">Card</text>
              <text x="58" y="60" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#F5A623">X</text>
            </svg>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => link.dropdown && setDropdownOpen(index)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <a 
                href={link.href}
                className="flex items-center gap-1 text-gray-700 hover:text-teal-500 transition-colors font-medium"
              >
                {link.name}
                {link.dropdown && <ChevronDown size={16} />}
              </a>
              {link.dropdown && dropdownOpen === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-48 z-50">
                  {link.dropdown.map((item, idx) => (
                    <a 
                      key={idx}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-40">
          <div className="max-w-2xl mx-auto">
            <input 
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40">
          <div className="py-4 px-4">
            {navLinks.map((link, index) => (
              <div key={index}>
                <a 
                  href={link.href}
                  className="block py-3 text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100"
                >
                  {link.name}
                </a>
                {link.dropdown && (
                  <div className="pl-4">
                    {link.dropdown.map((item, idx) => (
                      <a 
                        key={idx}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-teal-500 transition-colors text-sm"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
