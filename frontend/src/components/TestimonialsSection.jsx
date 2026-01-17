import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { testimonials } from '../data/mockData';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Responsive: 1 on mobile, 2 on tablet, 3 on desktop
const getSlidesPerView = () => {
  if (typeof window === 'undefined') return 3;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
};

const TestimonialsSection = () => {
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
  const [videoSliderIndex, setVideoSliderIndex] = useState(0);
  const [textTestimonialIndex, setTextTestimonialIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get all video and text testimonials
  const videoTestimonials = testimonials.filter(t => t.type === 'video');
  const textTestimonials = testimonials.filter(t => t.type === 'text');

  const maxVideoSlides = Math.max(1, Math.ceil(videoTestimonials.length / slidesPerView));

  // Update slidesPerView on resize
  useEffect(() => {
    const onResize = () => {
      const next = getSlidesPerView();
      setSlidesPerView((prev) => {
        if (prev !== next) {
          setVideoSliderIndex(0);
          return next;
        }
        return prev;
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nextVideoSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVideoSliderIndex((prev) => (prev + 1) % maxVideoSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevVideoSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVideoSliderIndex((prev) => (prev - 1 + maxVideoSlides) % maxVideoSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextTextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextTestimonialIndex((prev) => (prev + 1) % textTestimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, textTestimonials.length]);

  const prevTextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextTestimonialIndex((prev) => (prev - 1 + textTestimonials.length) % textTestimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-slide video testimonials
  useEffect(() => {
    if (videoTestimonials.length > slidesPerView) {
      const interval = setInterval(() => {
        setVideoSliderIndex((prev) => (prev + 1) % maxVideoSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [videoTestimonials.length, slidesPerView, maxVideoSlides]);

  // Auto-slide text testimonials
  useEffect(() => {
    if (textTestimonials.length > 0) {
      const interval = setInterval(nextTextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [textTestimonials.length, nextTextSlide]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our Clients' Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch and read how our personalized services have helped clients secure admissions, visas, and travel, making their journeys smooth and successful.
          </p>
        </div>

        {/* Video Testimonials Slider - 1 on mobile, 2 tablet, 3 desktop */}
        {videoTestimonials.length > 0 && (
          <div className="mb-12">
            <div className="relative max-w-6xl mx-auto px-0 sm:px-4">
              {/* Video Slider Container */}
              <div className="overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    width: `${(videoTestimonials.length / slidesPerView) * 100}%`,
                    transform: `translateX(-${videoSliderIndex * (slidesPerView / videoTestimonials.length) * 100}%)` 
                  }}
                >
                  {videoTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / videoTestimonials.length}%` }}
                    >
                      <div className="group">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                          {/* Video: 9:16, max-h on mobile so it fits on phone screens */}
                          <div className="relative aspect-[9/16] max-h-[50vh] sm:max-h-none bg-black w-full">
                            {testimonial.videoUrl && testimonial.videoUrl.endsWith('.mp4') ? (
                              <>
                                <video
                                  src={testimonial.videoUrl}
                                  className="w-full h-full object-cover"
                                  loop
                                  playsInline
                                  muted
                                  preload="metadata"
                                />
                                {/* Play Overlay - Click to go to full page */}
                                <Link
                                  to="/testimonials"
                                  className="absolute inset-0 flex items-center justify-center bg-black/20 sm:bg-black/30 transition-colors"
                                >
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <Play size={22} className="text-gray-800 ml-0.5 sm:ml-1" />
                                  </div>
                                </Link>
                                {/* Video badge */}
                                <div className="absolute top-3 left-3 pointer-events-none">
                                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                    Video
                                  </div>
                                </div>
                              </>
                            ) : testimonial.instagramEmbed && testimonial.videoUrl ? (
                              <>
                                {/* Instagram Video Link */}
                                <a
                                  href={testimonial.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all"
                                >
                                  <div className="text-center text-white p-4">
                                    <svg className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                    <p className="text-sm font-semibold">Watch on Instagram</p>
                                    <p className="text-xs opacity-90">Click to view</p>
                                  </div>
                                </a>
                                {/* Instagram-style badge */}
                                <div className="absolute top-3 left-3 pointer-events-none">
                                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                    Instagram
                                  </div>
                                </div>
                              </>
                            ) : testimonial.thumbnail ? (
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
                                {/* Video badge */}
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
                            <div className="flex items-center gap-3 mb-2">
                              {testimonial.image ? (
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-500 font-bold">
                                    {testimonial.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-gray-800 text-sm">{testimonial.name}</p>
                                <p className="text-xs text-blue-500">{testimonial.country}</p>
                                {testimonial.scholarship && (
                                  <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-semibold">
                                    Scholarship
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Testimonial text: line-clamp for equal card heights */}
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 min-h-[3.25rem]">
                              {testimonial.testimonial}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - smaller on mobile, only when more than 1 page */}
              {maxVideoSlides > 1 && (
                <>
                  <button 
                    onClick={prevVideoSlide}
                    className="absolute left-0 top-[45%] sm:top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 md:-translate-x-4 lg:-translate-x-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-10"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button 
                    onClick={nextVideoSlide}
                    className="absolute right-0 top-[45%] sm:top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 md:translate-x-4 lg:translate-x-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-10"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {/* Dots for Video Slider */}
              {maxVideoSlides > 1 && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  {Array.from({ length: maxVideoSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setVideoSliderIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        videoSliderIndex === index
                          ? 'bg-blue-500 w-8' 
                          : 'bg-gray-300 hover:bg-blue-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Testimonials Slider */}
        {textTestimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto px-2 sm:px-4">
            {/* Slider Container - responsive padding */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
              <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
                {textTestimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === textTestimonialIndex 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="text-center px-2 sm:px-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-3 sm:mb-6">
                        {testimonial.country}
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-8 italic">
                        "{testimonial.testimonial}"
                      </p>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                          <p className="text-blue-500 text-sm">{testimonial.country}</p>
                          {testimonial.scholarship && (
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                              Scholarship Awarded
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - responsive size */}
            <button 
              onClick={prevTextSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 md:-translate-x-4 lg:-translate-x-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={nextTextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 md:translate-x-4 lg:translate-x-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4 sm:mt-8">
              {textTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTextTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === textTestimonialIndex 
                      ? 'bg-blue-500 w-8' 
                      : 'bg-gray-300 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* See All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            to="/testimonials"
            className="inline-block border-2 border-blue-500 text-blue-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-500 hover:text-white transition-all"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
