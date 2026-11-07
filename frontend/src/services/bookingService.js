import axios from '../utils/axiosConfig';

const bookingService = {
  createBooking: async (bookingData) => {
    const response = await axios.post('/bookings', bookingData);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await axios.get('/bookings/all');
    return response.data;
  },

  getCustomerBookings: async (customerId) => {
    const response = await axios.get(`/bookings/customer/${customerId}`);
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await axios.get(`/bookings/${id}`);
    return response.data;
  },

  updateBooking: async (id, bookingData) => {
    const response = await axios.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  deleteBooking: async (id) => {
    const response = await axios.delete(`/bookings/${id}`);
    return response.data;
  },
};

export default bookingService;