import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { navLinks } from '../data/mockData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white py-4 px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="CardX Academia Logo" 
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-20 max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => link.dropdown && setDropdownOpen(index)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              {link.href === '#' ? (
                <span className="flex items-center gap-1 text-gray-700 hover:text-teal-500 transition-colors font-medium cursor-pointer">
                  {link.name}
                  {link.dropdown && <ChevronDown size={16} />}
                </span>
              ) : (
                <Link 
                  to={link.href}
                  className={`flex items-center gap-1 transition-colors font-medium ${
                    location.pathname === link.href 
                      ? 'text-teal-500' 
                      : 'text-gray-700 hover:text-teal-500'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={16} />}
                </Link>
              )}
              {link.dropdown && dropdownOpen === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-48 z-50">
                  {link.dropdown.map((item, idx) => (
                    <Link 
                      key={idx}
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-colors"
                    >
                      {item.name}
                    </Link>
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
                {link.href === '#' ? (
                  <span className="block py-3 text-gray-700 border-b border-gray-100">
                    {link.name}
                  </span>
                ) : (
                  <Link 
                    to={link.href}
                    className={`block py-3 transition-colors border-b border-gray-100 ${
                      location.pathname === link.href 
                        ? 'text-teal-500 font-semibold' 
                        : 'text-gray-700 hover:text-teal-500'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                {link.dropdown && (
                  <div className="pl-4">
                    {link.dropdown.map((item, idx) => (
                      <Link 
                        key={idx}
                        to={item.href}
                        className="block py-2 text-gray-600 hover:text-teal-500 transition-colors text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
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
