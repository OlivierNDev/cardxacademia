import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppointmentPage from "./pages/AppointmentPage";
import ServicesPage from "./pages/ServicesPage";
import VisaPage from "./pages/VisaPage";
import StudentVisaPage from "./pages/StudentVisaPage";
import WorkVisaPage from "./pages/WorkVisaPage";
import VisitorVisaPage from "./pages/VisitorVisaPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import IsraelPilgrimagePage from "./pages/IsraelPilgrimagePage";
import IsraelTourApplicationPage from "./pages/IsraelTourApplicationPage";
import ApplicationSubmittedPage from "./pages/ApplicationSubmittedPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SitemapPage from "./pages/SitemapPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/visa" element={<VisaPage />} />
          <Route path="/visa/student" element={<StudentVisaPage />} />
          <Route path="/visa/work" element={<WorkVisaPage />} />
          <Route path="/visa/visitor" element={<VisitorVisaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/israel-pilgrimage-2026" element={<IsraelPilgrimagePage />} />
          <Route path="/israel-pilgrimage-2025" element={<Navigate to="/israel-pilgrimage-2026" replace />} />
          <Route path="/apply-israel-tour" element={<IsraelTourApplicationPage />} />
          <Route path="/application-submitted" element={<ApplicationSubmittedPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
