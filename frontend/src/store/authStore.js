import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isDoctor: false,
  token: null,

  registerPatient: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/patients/register',
        data
      );

      set({
        user: res.data.patient,
        error: null,
        isLoading: false,
        isDoctor: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  loginPatient: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/patients/login',
        data
      );

      set({
        user: res.data.patient,
        error: null,
        isLoading: false,
        isDoctor: false,
        token: res.data.token,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  loginDoctor: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/doctors/login',
        data
      );

      set({
        user: res.data.doctor,
        error: null,
        isLoading: false,
        isDoctor: true,
        token: res.data.token,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isDoctor: false,
      token: null,
    });
  },

  getDoctors: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get('http://localhost:5000/api/doctors');

      set({
        error: null,
        isLoading: false,
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  getPatient: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`http://localhost:5000/api/patients/${id}`);

      set({
        error: null,
        isLoading: false,
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  getDoctor: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);

      set({
        error: null,
        isLoading: false,
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },
}));
