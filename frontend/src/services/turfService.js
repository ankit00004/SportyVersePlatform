import axios from '../utils/axiosConfig';

const turfService = {
  getAllTurfs: async () => {
    const response = await axios.get('/turfs');
    return response.data;
  },

  getTurfById: async (id) => {
    const response = await axios.get(`/turfs/${id}`);
    return response.data;
  },

  createTurf: async (turfData) => {
    const response = await axios.post('/turfs', turfData);
    return response.data;
  },

  updateTurf: async (id, turfData) => {
    const response = await axios.put(`/turfs/${id}`, turfData);
    return response.data;
  },

  deleteTurf: async (id) => {
    const response = await axios.delete(`/turfs/${id}`);
    return response.data;
  },
};

export default turfService;