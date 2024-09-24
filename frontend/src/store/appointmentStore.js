import { create } from 'zustand';
import axios from 'axios';

export const useAppointmentStore = create((set) => ({
  isLoading: false,
  error: null,

  createAppointment: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/appointments',
        data
      );

      set({
        isLoading: false,
        error: null,
      });
      return res;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  updateStatus: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/appointments/${id}/status`,
        data
      );

      set({
        isLoading: false,
        error: null,
      });
      return res;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },
}));
