import React, { useState } from 'react';
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
  Building2
} from 'lucide-react';

const IsraelTourApplicationPage = () => {
  const navigate = useNavigate();
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
      'churchName', 'emergencyContactName', 'emergencyContactPhone'
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

    // Store form data in sessionStorage to pass to confirmation page
    sessionStorage.setItem('israelTourApplication', JSON.stringify(formData));

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      navigate('/application-submitted');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Holy Land Pilgrimage Application
          </h1>
          <p className="text-white/90 text-lg">
            December 30, 2025 – January 14, 2026
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <p className="text-gray-600 mb-6">
              Please fill out all required fields. Registration deadline: <strong>December 12, 2025</strong>
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

              {/* Church Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Building2 size={24} />
                  Church Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="churchName">Church Name *</Label>
                    <Input
                      id="churchName"
                      name="churchName"
                      value={formData.churchName}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Your church name"
                    />
                    {errors.churchName && <p className="text-red-500 text-sm mt-1">{errors.churchName}</p>}
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
                      placeholder="Number of years"
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
                      placeholder="Church location"
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
                      placeholder="Pastor's name"
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
                      placeholder="Pastor's phone"
                    />
                  </div>
                </div>
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-6 text-lg"
                >
                  {submitting ? (
                    <>Submitting Application...</>
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

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default IsraelTourApplicationPage;
