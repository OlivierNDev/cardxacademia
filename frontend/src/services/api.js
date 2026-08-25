import axios from 'axios';

// Backend API URL - use environment variable or default to localhost:8000
// Strip trailing slash to avoid double slashes in paths
const API_BASE_URL = (process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '');

// Log API URL in development (helps with debugging)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 second timeout (safe buffer for network delays)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', error.message);
      console.error('📡 API URL:', error.config?.baseURL + error.config?.url);
    }
    return Promise.reject(error);
  }
);

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

export const pilgrimageAPI = {
  // Create a new pilgrimage booking
  createPilgrimageBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/pilgrimage-bookings', bookingData);
      return response.data;
    } catch (error) {
      // Axios: error.response.data is FastAPI's JSON (e.g. {detail: "..."} or {detail: [{msg: "..."}]})
      const data = error.response?.data;
      if (data) throw data;
      throw { detail: error.message || 'Network error. Please check your connection and try again.' };
    }
  },

  // Get pilgrimage booking by ID
  getPilgrimageBooking: async (bookingId) => {
    try {
      const response = await api.get(`/api/pilgrimage-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },
};

const adminHeaders = (token) => ({
  'X-Admin-Token': token,
});

export const registrationAPI = {
  createRegistration: async (data) => {
    try {
      const response = await api.post('/api/registrations', data);
      return response.data;
    } catch (error) {
      const errData = error.response?.data;
      if (errData) throw errData;
      throw { detail: error.message || 'Network error. Please try again.' };
    }
  },

  listRegistrations: async (token, params = {}) => {
    try {
      const response = await api.get('/api/registrations', {
        headers: adminHeaders(token),
        params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  getRegistrationCount: async (token) => {
    try {
      const response = await api.get('/api/registrations/count', {
        headers: adminHeaders(token),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  getRegistration: async (token, registrationId) => {
    try {
      const response = await api.get(`/api/registrations/${registrationId}`, {
        headers: adminHeaders(token),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  downloadAllXlsx: async (token) => {
    const response = await api.get('/api/registrations/export/xlsx', {
      headers: adminHeaders(token),
      responseType: 'blob',
    });
    return response.data;
  },

  downloadAllPdf: async (token) => {
    const response = await api.get('/api/registrations/export/pdf', {
      headers: adminHeaders(token),
      responseType: 'blob',
    });
    return response.data;
  },

  downloadRegistrationXlsx: async (token, registrationId) => {
    const response = await api.get(`/api/registrations/${registrationId}/export/xlsx`, {
      headers: adminHeaders(token),
      responseType: 'blob',
    });
    return response.data;
  },

  downloadRegistrationPdf: async (token, registrationId) => {
    const response = await api.get(`/api/registrations/${registrationId}/export/pdf`, {
      headers: adminHeaders(token),
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
