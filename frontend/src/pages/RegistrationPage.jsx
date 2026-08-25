import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  User,
  FileText,
  MapPin,
  Users,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { registrationAPI } from '@/services/api';
import {
  REGISTRATION_STEPS,
  FIELD_CONFIG,
  INITIAL_FORM_DATA,
  YES_NO_FIELDS,
} from '../constants/registrationFields';

const STEP_ICONS = [User, FileText, MapPin, Users];

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentStep]);

  const step = REGISTRATION_STEPS[currentStep];
  const StepIcon = STEP_ICONS[currentStep];
  const progress = ((currentStep + 1) / REGISTRATION_STEPS.length) * 100;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    step.fields.forEach((fieldName) => {
      const config = FIELD_CONFIG[fieldName];
      const value = formData[fieldName];
      if (config.required && !String(value || '').trim()) {
        newErrors[fieldName] = `${config.label} is required`;
      }
      if (fieldName === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[fieldName] = 'Please enter a valid email address';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, REGISTRATION_STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload = { ...formData };
      YES_NO_FIELDS.forEach((field) => {
        if (payload[field]) payload[field] = payload[field].toLowerCase();
      });
      Object.keys(payload).forEach((key) => {
        if (payload[key] === '') payload[key] = null;
      });

      const result = await registrationAPI.createRegistration(payload);
      sessionStorage.setItem(
        'tourRegistration',
        JSON.stringify({
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          telephone_number: result.telephone_number,
          email: result.email,
        })
      );
      navigate('/registration-submitted');
    } catch (err) {
      const detail = err?.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(', '));
      } else if (typeof detail === 'string') {
        setError(detail);
      } else {
        setError(err?.message || 'Failed to submit registration. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (fieldName) => {
    const config = FIELD_CONFIG[fieldName];
    const value = formData[fieldName];
    const hasError = errors[fieldName];

    if (config.type === 'yesno') {
      return (
        <div key={fieldName} className="space-y-2">
          <Label className="text-gray-700 font-medium">
            {config.label}
            {config.required && <span className="text-brand-gold-500 ml-1">*</span>}
          </Label>
          <RadioGroup
            value={value}
            onValueChange={(v) => handleChange(fieldName, v)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${fieldName}-yes`} />
              <Label htmlFor={`${fieldName}-yes`} className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${fieldName}-no`} />
              <Label htmlFor={`${fieldName}-no`} className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
          {hasError && <p className="text-sm text-brand-gold-600">{hasError}</p>}
        </div>
      );
    }

    if (config.type === 'select') {
      return (
        <div key={fieldName} className="space-y-2">
          <Label className="text-gray-700 font-medium">
            {config.label}
            {config.required && <span className="text-brand-gold-500 ml-1">*</span>}
          </Label>
          <Select value={value} onValueChange={(v) => handleChange(fieldName, v)}>
            <SelectTrigger className={hasError ? 'border-brand-gold-500' : ''}>
              <SelectValue placeholder={`Select ${config.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasError && <p className="text-sm text-brand-gold-600">{hasError}</p>}
        </div>
      );
    }

    if (config.type === 'textarea') {
      return (
        <div key={fieldName} className="space-y-2">
          <Label className="text-gray-700 font-medium">
            {config.label}
            {!config.required && <span className="text-gray-400 ml-1 text-sm">(optional)</span>}
          </Label>
          <Textarea
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            placeholder={config.placeholder}
            rows={3}
            className={hasError ? 'border-brand-gold-500' : ''}
          />
          {hasError && <p className="text-sm text-brand-gold-600">{hasError}</p>}
        </div>
      );
    }

    return (
      <div key={fieldName} className="space-y-2">
        <Label className="text-gray-700 font-medium">
          {config.label}
          {config.required ? (
            <span className="text-brand-gold-500 ml-1">*</span>
          ) : (
            <span className="text-gray-400 ml-1 text-sm">(optional)</span>
          )}
        </Label>
        <Input
          type={config.type}
          value={value}
          onChange={(e) => handleChange(fieldName, e.target.value)}
          placeholder={config.placeholder}
          className={hasError ? 'border-brand-gold-500' : ''}
        />
        {hasError && <p className="text-sm text-brand-gold-600">{hasError}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-brand-blue-500 font-semibold text-sm uppercase tracking-wider mb-2">
            CardX Academia & Travel Tours
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Tour Registration
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Complete your registration in a few quick steps. Fields marked with * are required.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {REGISTRATION_STEPS.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-brand-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step pills — hidden on very small screens */}
        <div className="hidden sm:flex gap-2 mb-8 overflow-x-auto pb-1">
          {REGISTRATION_STEPS.map((s, i) => {
            const Icon = STEP_ICONS[i];
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-blue-500 text-white'
                    : isDone
                    ? 'bg-brand-blue-50 text-brand-blue-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                <span>{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={currentStep === REGISTRATION_STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-blue-50 rounded-lg flex items-center justify-center">
                  <StepIcon className="text-brand-blue-500" size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{step.title}</h2>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {step.fields.map((fieldName) => {
                  const config = FIELD_CONFIG[fieldName];
                  const fullWidth = config.type === 'textarea' || config.type === 'yesno';
                  return (
                    <div key={fieldName} className={fullWidth ? 'sm:col-span-2' : ''}>
                      {renderField(fieldName)}
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mt-6 p-4 bg-brand-sky-50 border border-brand-blue-200 rounded-lg text-brand-gold-800 text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="border-gray-300 text-gray-700"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    Back
                  </Button>
                )}
                <div className="flex-1" />
                {currentStep < REGISTRATION_STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold px-8"
                  >
                    Continue
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-semibold px-8"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RegistrationPage;
