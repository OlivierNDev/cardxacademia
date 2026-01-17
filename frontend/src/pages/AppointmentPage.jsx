import React, { useState, useEffect, useCallback } from 'react';
import { Calendar } from '@/components/ui/calendar';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, XCircle, Loader2, Calendar as CalendarIcon, Clock, MapPin, Video, User } from 'lucide-react';
import { appointmentAPI } from '@/services/api';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from 'date-fns';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // Scroll to top when form is submitted successfully
  useEffect(() => {
    if (submitted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [submitted]);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: 'in_person',
    location: '1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City',
    worker: 'any',
    serviceType: 'visa_consultation',
    duration: 30,
    description: '',
  });

  // Workers/Consultants list - removed, using "Any Available Consultant" only

  // Service types
  const serviceTypes = [
    { value: 'visa_consultation', label: 'Visa Consultation' },
    { value: 'admission_guidance', label: 'Admission Guidance' },
    { value: 'work_permit', label: 'Work Permit Application' },
    { value: 'express_entry', label: 'Express Entry for Canada' },
    { value: 'general_inquiry', label: 'General Inquiry' },
  ];

  const loadAvailableSlots = useCallback(async () => {
    if (!selectedDate) return;
    
    setLoadingSlots(true);
    setError(null);
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const data = await appointmentAPI.getAvailableSlots(dateStr, formData.serviceType, formData.appointmentType);
      setAvailableSlots(data.available_slots || []);
      
      // If selected time is no longer available, clear it
      if (selectedTime && !data.available_slots?.includes(selectedTime)) {
        setSelectedTime('');
      }
    } catch (err) {
      console.error('Error loading slots:', err);
      console.error('Error details:', err.response || err.message);
      
      // Extract more detailed error message
      let errorMessage = 'Failed to load time slots';
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. The backend server may be starting up (Render free tier can take 30-60 seconds). Please wait a moment and try again.';
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to backend server. Please check if the backend is deployed and the API URL is configured correctly.';
      } else if (err.message?.includes('localhost')) {
        errorMessage = 'Backend API URL not configured. Please set REACT_APP_API_URL environment variable in Vercel.';
      }
      
      setError(errorMessage);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate, formData.serviceType, formData.appointmentType, selectedTime]);

  // Load available slots when date or service type changes
  useEffect(() => {
    if (selectedDate && formData.serviceType) {
      loadAvailableSlots();
    }
  }, [selectedDate, formData.serviceType, loadAvailableSlots]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(''); // Reset time when date changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Validation
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      setSubmitting(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    try {
      const appointmentData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: 'Rwanda',
        },
        appointment: {
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          appointment_type: formData.appointmentType,
          location: formData.appointmentType === 'in_person' ? formData.location : null,
          worker: formData.worker && formData.worker !== 'any' ? formData.worker : null,
          service_type: formData.serviceType,
          duration: formData.duration,
          notes: formData.description,
        },
      };

      const result = await appointmentAPI.createAppointment(appointmentData);
      setAppointmentId(result.id);
      setSubmitted(true);
      
      // Store email for success message
      const submittedEmail = formData.email;
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentType: 'in_person',
        location: '1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City',
        worker: 'any',
        serviceType: 'visa_consultation',
        duration: 30,
        description: '',
      });
      setSelectedDate(new Date());
      setSelectedTime('');
      setAvailableSlots([]);
    } catch (err) {
      console.error('Error creating appointment:', err);
      const errorMessage = err?.detail || err?.message || err?.error || 'Failed to create appointment. Please try again.';
      setError(errorMessage);
      
      // If it's a time slot conflict, reload available slots
      if (errorMessage.includes('already booked') || errorMessage.includes('time slot')) {
        loadAvailableSlots();
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Disable past dates
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule a consultation with our expert team</p>
        </div>

        {submitted && (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-green-800">Appointment Booked Successfully! 🎉</h3>
            </div>
            <p className="text-green-700 mb-2">
              Your appointment has been confirmed. A confirmation email has been sent to your email address.
            </p>
            <p className="text-green-700 mb-2">
              Our team has been notified and will confirm your appointment shortly.
            </p>
            {appointmentId && (
              <p className="text-sm text-green-600 mb-4">Appointment ID: <strong>{appointmentId}</strong></p>
            )}
            <Button
              onClick={() => {
                setSubmitted(false);
                setAppointmentId(null);
                setError(null);
              }}
              variant="outline"
              className="mt-4"
            >
              Book Another Appointment
            </Button>
          </div>
        )}

        {error && !submitted && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <XCircle className="text-red-600" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Date, Time, Location Selection */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Date & Time</h2>
                
                {/* Calendar */}
                <div className="mb-6">
                  <Label className="mb-2 block">Select Date *</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    className="rounded-md border"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="mb-2 block">Select Time *</Label>
                  {loadingSlots ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="animate-spin" size={16} />
                      <span>Loading available slots...</span>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-2 text-sm rounded border transition-all ${
                            selectedTime === slot
                              ? 'bg-yellow-400 text-white border-yellow-400'
                              : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No available slots for this date</p>
                  )}
                </div>
              </div>

              {/* Appointment Type */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Type</h2>
                <RadioGroup
                  value={formData.appointmentType}
                  onValueChange={(value) => handleInputChange('appointmentType', value)}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="in_person" id="in_person" />
                    <Label htmlFor="in_person" className="flex items-center gap-2 cursor-pointer">
                      <MapPin size={16} />
                      In-Person Meeting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="virtual" id="virtual" />
                    <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                      <Video size={16} />
                      Virtual Meeting (Online)
                    </Label>
                  </div>
                </RadioGroup>

                {formData.appointmentType === 'in_person' && (
                  <div className="mt-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Meeting location"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Worker Selection */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Label htmlFor="worker" className="mb-2 block">Select Consultant (Optional)</Label>
                <Select
                  value={formData.worker}
                  onValueChange={(value) => handleInputChange('worker', value)}
                >
                  <SelectTrigger id="worker">
                    <SelectValue placeholder="Select a consultant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Available Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column - Personal Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <p className="text-sm text-gray-500 mb-4">Fields with * are required</p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+250788123456"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleInputChange('serviceType', value)}
                    >
                      <SelectTrigger id="serviceType" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      value={formData.duration.toString()}
                      onValueChange={(value) => handleInputChange('duration', parseInt(value))}
                    >
                      <SelectTrigger id="duration" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description / Notes</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Any additional information or questions..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Overview */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Overview</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-gray-400" />
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime || 'Not selected'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {formData.appointmentType === 'in_person' ? (
                      <MapPin size={16} className="text-gray-400" />
                    ) : (
                      <Video size={16} className="text-gray-400" />
                    )}
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">
                      {formData.appointmentType === 'in_person' ? 'In-Person' : 'Virtual'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="submit"
                    disabled={submitting || !selectedDate || !selectedTime}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={16} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Appointment'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        appointmentType: 'in_person',
                        location: '1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City',
                        worker: 'any',
                        serviceType: 'visa_consultation',
                        duration: 30,
                        description: '',
                      });
                      setSelectedDate(new Date());
                      setSelectedTime('');
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AppointmentPage;
