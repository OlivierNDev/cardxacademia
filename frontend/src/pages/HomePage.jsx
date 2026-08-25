import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesHighlight from '../components/ServicesHighlight';
import StatsSection from '../components/StatsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import IsraelPilgrimageBanner from '../components/IsraelPilgrimageBanner';
import CTABanner from '../components/CTABanner';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <IsraelPilgrimageBanner />
        <ServicesHighlight />
        <StatsSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
