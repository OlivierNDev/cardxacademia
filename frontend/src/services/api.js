import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentAPI = {
  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/api/appointments', appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get available time slots for a date
  getAvailableSlots: async (date, serviceType, appointmentType = 'in_person') => {
    try {
      const response = await api.get('/api/appointments/available-slots', {
        params: { 
          date_str: date, 
          service_type: serviceType,
          appointment_type: appointmentType
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get appointment by ID
  getAppointment: async (appointmentId) => {
    try {
      const response = await api.get(`/api/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await api.patch(`/api/appointments/${appointmentId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },
};

export default api;
