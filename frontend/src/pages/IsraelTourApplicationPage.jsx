import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Send,
  FileText,
  Building2,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { pilgrimageAPI } from '@/services/api';

const IsraelTourApplicationPage = () => {
  const navigate = useNavigate();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    placeOfBirth: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    country: '',
    
    // Church Information
    churchName: '',
    churchAddress: '',
    pastorName: '',
    pastorPhone: '',
    membershipYears: '',
    
    // Travel Information
    previousTravel: '',
    medicalConditions: '',
    dietaryRequirements: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Additional Information
    specialRequests: '',
    howDidYouHear: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 'dateOfBirth', 'gender', 'nationality', 'passportNumber',
      'passportExpiryDate', 'email', 'phone', 'address', 'city', 'country',
      'emergencyContactName', 'emergencyContactPhone'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Prepare booking data for API
      const bookingData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth || null,
          gender: formData.gender || null,
          nationality: formData.nationality || null,
          passportNumber: formData.passportNumber || null,
          passportExpiryDate: formData.passportExpiryDate || null,
          address: formData.address || null,
          city: formData.city || null,
          country: formData.country || null,
          alternatePhone: formData.alternatePhone || null,
        },
        booking: {
          tourDates: "March 29, 2026 – April 5, 2026",
          tourCost: "USD $2,900",
          churchName: formData.churchName || null,
          churchAddress: formData.churchAddress || null,
          pastorName: formData.pastorName || null,
          pastorPhone: formData.pastorPhone || null,
          membershipYears: formData.membershipYears || null,
          previousTravel: formData.previousTravel || null,
          medicalConditions: formData.medicalConditions || null,
          dietaryRequirements: formData.dietaryRequirements || null,
          emergencyContactName: formData.emergencyContactName || null,
          emergencyContactPhone: formData.emergencyContactPhone || null,
          emergencyContactRelationship: formData.emergencyContactRelationship || null,
          specialRequests: formData.specialRequests || null,
          howDidYouHear: formData.howDidYouHear || null,
        }
      };

      // Submit to backend
      const result = await pilgrimageAPI.createPilgrimageBooking(bookingData);
      
      setBookingId(result.id);
      setSubmitted(true);
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
    } catch (err) {
      console.error('Error submitting pilgrimage booking:', err);
      // FastAPI returns { detail: "msg" } or { detail: [{ loc: [], msg: "..." }] } for 422
      let errorMessage = 'Failed to submit booking. Please try again.';
      if (err?.detail) {
        errorMessage = Array.isArray(err.detail) 
          ? err.detail.map(d => d?.msg || JSON.stringify(d)).join('. ') 
          : String(err.detail);
      } else if (err?.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Holy Land Pilgrimage Application
          </h1>
          <p className="text-gray-600 text-lg">
            March 29, 2026 – April 5, 2026
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Registration Deadline: March 15, 2026
          </p>
        </div>
      </section>

      {/* Success Message */}
      {submitted && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-green-600" size={28} />
                <h3 className="text-2xl font-semibold text-green-800">✅ Booking Submitted Successfully</h3>
              </div>
              
              <div className="space-y-4 text-green-800">
                <p className="text-lg">
                  Thank you for registering for the Israel Pilgrimage Travel Program.
                </p>
                <p>
                  Your booking has been successfully submitted and is currently under review.
                  Our team will verify your details and contact you shortly with the next steps.
                </p>

                <div className="mt-6 pt-6 border-t border-green-300">
                  <h4 className="text-xl font-bold text-green-900 mb-4">💳 Payment Options</h4>
                  <p className="mb-4">You may complete your payment using any of the options below:</p>
                  
                  <div className="bg-white rounded-lg p-5 mb-4 border border-green-200">
                    <h5 className="font-bold text-green-900 mb-2">Option 1: Bank Transfer</h5>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-semibold">Account Name:</span> Cardx Academia</p>
                      <p><span className="font-semibold">Account Number:</span> XXXXXXXXXX</p>
                      <p><span className="font-semibold">Bank Name:</span> [Bank Name]</p>
                      <p><span className="font-semibold">Reference:</span> Your Full Name – Israel Pilgrimage</p>
                    </div>
                    <p className="mt-3 text-sm">
                      After payment, please email your proof of payment to<br />
                      <a href="mailto:info@cardxacademia.com" className="text-blue-600 hover:underline font-semibold">
                        📧 info@cardxacademia.com
                      </a>
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-200">
                    <h5 className="font-bold text-green-900 mb-2">Option 2: Office Payment</h5>
                    <p className="text-sm">
                      You may also bring your payment directly to our office.<br />
                      Please come with your booking confirmation details.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-green-300">
                  <p className="mb-2">
                    If you have any questions or need assistance, feel free to contact us at
                  </p>
                  <p>
                    <a href="mailto:info@cardxacademia.com" className="text-blue-600 hover:underline font-semibold">
                      📧 info@cardxacademia.com
                    </a>
                  </p>
                </div>

                <p className="mt-6 text-lg font-medium">
                  We look forward to accompanying you on this meaningful journey.
                </p>
                <p className="text-right text-green-700 font-semibold">
                  — Cardx Academia Team
                </p>
              </div>

              {bookingId && (
                <div className="mt-6 pt-4 border-t border-green-300">
                  <p className="text-sm text-green-600">Booking ID: <strong className="font-mono">{bookingId}</strong></p>
                </div>
              )}

              <div className="mt-6">
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setBookingId(null);
                    setError(null);
                    // Reset form
                    setFormData({
                      fullName: '',
                      dateOfBirth: '',
                      gender: '',
                      nationality: '',
                      passportNumber: '',
                      passportIssueDate: '',
                      passportExpiryDate: '',
                      placeOfBirth: '',
                      email: '',
                      phone: '',
                      alternatePhone: '',
                      address: '',
                      city: '',
                      country: '',
                      churchName: '',
                      churchAddress: '',
                      pastorName: '',
                      pastorPhone: '',
                      membershipYears: '',
                      previousTravel: '',
                      medicalConditions: '',
                      dietaryRequirements: '',
                      emergencyContactName: '',
                      emergencyContactPhone: '',
                      emergencyContactRelationship: '',
                      specialRequests: '',
                      howDidYouHear: ''
                    });
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Submit Another Booking
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && !submitted && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="text-red-600" size={24} />
                <h3 className="text-lg font-semibold text-red-800">Error</h3>
              </div>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      {!submitted && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <p className="text-gray-600 mb-6">
                Please fill out all required fields. Registration deadline: <strong>March 15, 2026</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User size={24} />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="As it appears on passport"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Your nationality"
                    />
                    {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number *</Label>
                    <Input
                      id="passportNumber"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Passport number"
                    />
                    {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>}
                  </div>
                  <div>
                    <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
                    <Input
                      id="passportIssueDate"
                      name="passportIssueDate"
                      type="date"
                      value={formData.passportIssueDate}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passportExpiryDate">Passport Expiry Date *</Label>
                    <Input
                      id="passportExpiryDate"
                      name="passportExpiryDate"
                      type="date"
                      value={formData.passportExpiryDate}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                    {errors.passportExpiryDate && <p className="text-red-500 text-sm mt-1">{errors.passportExpiryDate}</p>}
                  </div>
                  <div>
                    <Label htmlFor="placeOfBirth">Place of Birth</Label>
                    <Input
                      id="placeOfBirth"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Phone size={24} />
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="+250 788 123 456"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Your city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Street address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Your country"
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Church Information (Optional) */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Building2 size={24} />
                  Church Information (Optional)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="churchName">Church Name</Label>
                    <Input
                      id="churchName"
                      name="churchName"
                      value={formData.churchName}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Your church name (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="membershipYears">Years of Membership</Label>
                    <Input
                      id="membershipYears"
                      name="membershipYears"
                      type="number"
                      value={formData.membershipYears}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Number of years (optional)"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="churchAddress">Church Address</Label>
                    <Input
                      id="churchAddress"
                      name="churchAddress"
                      value={formData.churchAddress}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Church location (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pastorName">Pastor Name</Label>
                    <Input
                      id="pastorName"
                      name="pastorName"
                      value={formData.pastorName}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Pastor's name (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pastorPhone">Pastor Phone</Label>
                    <Input
                      id="pastorPhone"
                      name="pastorPhone"
                      value={formData.pastorPhone}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Pastor's phone (optional)"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Note: Registration is done at the CardX Academia & Travel Tours office. Church information is optional.
                </p>
              </div>

              {/* Travel & Medical Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText size={24} />
                  Additional Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="previousTravel">Previous Travel Experience</Label>
                    <Textarea
                      id="previousTravel"
                      name="previousTravel"
                      value={formData.previousTravel}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1"
                      placeholder="List countries visited (if any)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1"
                      placeholder="Any medical conditions we should know about"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                    <Input
                      id="dietaryRequirements"
                      name="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Vegetarian, allergies, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="howDidYouHear">How did you hear about this pilgrimage?</Label>
                    <Select value={formData.howDidYouHear} onValueChange={(value) => handleSelectChange('howDidYouHear', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="church">Church</SelectItem>
                        <SelectItem value="friend">Friend/Family</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="specialRequests">Special Requests or Comments</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1"
                      placeholder="Any special requests or additional information"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Phone size={24} />
                  Emergency Contact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Full name"
                    />
                    {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="+250 788 123 456"
                    />
                    {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                    <Input
                      id="emergencyContactRelationship"
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Spouse, Parent, Sibling, etc."
                    />
                    {errors.emergencyContactRelationship && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelationship}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default IsraelTourApplicationPage;
