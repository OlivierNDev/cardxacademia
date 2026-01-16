import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import AirTicketSection from '../components/AirTicketSection';
import CTABanner from '../components/CTABanner';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyChooseUs />
        <AirTicketSection />
        <CTABanner />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
