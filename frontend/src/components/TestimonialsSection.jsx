import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testimonials } from '../data/mockData';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

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

  // Filter video testimonials for home page
  const videoTestimonials = testimonials.filter(t => t.type === 'video').slice(0, 3);
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Clients' Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch and read how our personalized services have helped clients secure admissions, visas, and travel, making their journeys smooth and successful.
          </p>
        </div>

        {/* Video Testimonials Grid - Instagram Format */}
        {videoTestimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {videoTestimonials.map((testimonial) => (
              <Link
                key={testimonial.id}
                to="/testimonials"
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                  {/* Video Container - Instagram format (9:16) */}
                  <div className="relative aspect-[9/16] bg-black">
                    {testimonial.thumbnail ? (
                      <>
                        <img
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={24} className="text-gray-800 ml-1" />
                          </div>
                        </div>
                        {/* Instagram-style badge */}
                        <div className="absolute top-3 left-3">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Video
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                    )}
                  </div>
                  {/* Testimonial Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-blue-500">{testimonial.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Text Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 overflow-hidden">
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
                    <h3 className="text-2xl font-bold text-blue-500 mb-6">
                      {testimonial.country}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                      />
                      <div className="text-left">
                        <p className="font-bold text-gray-800">{testimonial.name}</p>
                        <p className="text-blue-500">{testimonial.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
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
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-300 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* See All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/testimonials"
            className="inline-block border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
