import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { testimonials } from '../data/mockData';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const TestimonialsPage = () => {
  const videoRefs = useRef({});
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [playingVideos, setPlayingVideos] = useState({});
  const [mutedVideos, setMutedVideos] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (playingVideos[id]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingVideos(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const toggleMute = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => ({
        ...prev,
        [id]: !video.muted
      }));
    }
  };

  const videoTestimonials = testimonials.filter(t => t.type === 'video');
  const textTestimonials = testimonials.filter(t => t.type === 'text');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Client Testimonials
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Hear directly from our clients about their successful journeys with Cardx Academia
          </p>
        </div>
      </section>

      {/* Video Testimonials Section */}
      {videoTestimonials.length > 0 && (
        <section className="py-10 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Video Testimonials
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-sm sm:text-base px-2">
                Watch real stories from our clients who have successfully achieved their dreams with our support
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Showing {videoTestimonials.length} video testimonials
              </p>
            </div>

            {/* Video Grid - 1 col mobile, 2 tablet, 3 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videoTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group flex flex-col"
                >
                  {/* Video: 9:16, max-h on mobile so it fits on screen */}
                  <div className="relative aspect-[9/16] max-h-[50vh] sm:max-h-none bg-black w-full flex-shrink-0">
                    {testimonial.videoUrl && testimonial.videoUrl.endsWith('.mp4') ? (
                      <>
                        <video
                          ref={(el) => {
                            videoRefs.current[testimonial.id] = el;
                          }}
                          src={testimonial.videoUrl}
                          className="w-full h-full object-cover"
                          loop
                          playsInline
                          muted={mutedVideos[testimonial.id] === false ? false : true}
                          onPlay={() => setPlayingVideos(prev => ({ ...prev, [testimonial.id]: true }))}
                          onPause={() => setPlayingVideos(prev => ({ ...prev, [testimonial.id]: false }))}
                          onEnded={() => setPlayingVideos(prev => ({ ...prev, [testimonial.id]: false }))}
                          preload="metadata"
                        />
                        
                        {/* Play/Pause Overlay - always visible on touch (mobile), hover on desktop */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 sm:bg-black/30 transition-colors">
                          <button
                            onClick={() => togglePlay(testimonial.id)}
                            className="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
                          >
                            {playingVideos[testimonial.id] ? (
                              <Pause size={24} className="text-gray-800" />
                            ) : (
                              <Play size={24} className="text-gray-800 ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Video Controls - visible on mobile for touch */}
                        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleMute(testimonial.id)}
                            className="w-9 h-9 sm:w-10 sm:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors touch-manipulation"
                          >
                            {mutedVideos[testimonial.id] === false ? (
                              <Volume2 size={18} />
                            ) : (
                              <VolumeX size={18} />
                            )}
                          </button>
                        </div>

                        {/* Video badge */}
                        <div className="absolute top-4 left-4 pointer-events-none">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Video
                          </div>
                        </div>
                      </>
                    ) : testimonial.instagramEmbed && testimonial.videoUrl ? (
                      <>
                        {/* Instagram Video Link - Opens in new tab */}
                        <a
                          href={testimonial.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all group"
                        >
                          <div className="text-center text-white p-6">
                            <svg className="w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <p className="text-lg font-semibold mb-1">Watch on Instagram</p>
                            <p className="text-sm opacity-90">Click to view video</p>
                          </div>
                        </a>
                        {/* Instagram-style indicator */}
                        <div className="absolute top-4 left-4 pointer-events-none">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Instagram
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <p className="text-white text-sm">Video coming soon</p>
                      </div>
                    )}
                  </div>

                  {/* Testimonial Info - line-clamp for equal card heights */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-shrink-0">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-500 font-bold text-base sm:text-lg">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-blue-500 truncate">{testimonial.country}</p>
                        {testimonial.scholarship && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">
                            Scholarship
                          </span>
                        )}
                      </div>
                    </div>
                    {testimonial.testimonial && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4 min-h-[3.5rem]">
                        {testimonial.testimonial}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Text Testimonials Section */}
      {textTestimonials.length > 0 && (
        <section className="py-10 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Written Testimonials
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-sm sm:text-base px-2">
                Read about our clients' experiences in their own words
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Showing {textTestimonials.length} testimonials
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {textTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
                >
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic mb-4 line-clamp-5 min-h-[5rem] flex-1">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex-shrink-0">
                    <p className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-blue-500">{testimonial.country}</p>
                    {testimonial.scholarship && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                        Scholarship Awarded
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg px-2">
            Join thousands of successful students and professionals who have achieved their dreams with Cardx Academia
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/appointment" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white text-blue-500 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all">
                Book an Appointment
              </button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TestimonialsPage;
