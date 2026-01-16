import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/mockData';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Clients' Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how our personalized services have helped clients secure admissions, visas, and travel, making their journeys smooth and successful.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-8 z-10">
            <Quote size={60} className="text-yellow-400 fill-yellow-400" />
          </div>

          {/* Slider Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 overflow-hidden">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex 
                      ? 'opacity-100 relative' 
                      : 'opacity-0 absolute inset-0'
                  }`}
                >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-teal-500 mb-6">
                        {testimonial.country}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                        "{testimonial.testimonial}"
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-teal-100"
                        />
                        <div className="text-left">
                          <p className="font-bold text-gray-800">{testimonial.name}</p>
                          <p className="text-teal-500">{testimonial.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors group"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors group"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-teal-500 w-8' 
                    : 'bg-gray-300 hover:bg-teal-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* See All Button */}
        <div className="text-center mt-12">
          <a 
            href="/testimonials"
            className="inline-block border-2 border-teal-500 text-teal-500 px-8 py-3 rounded-full font-semibold hover:bg-teal-500 hover:text-white transition-all uppercase tracking-wider text-sm"
          >
            See All Testimonials
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
