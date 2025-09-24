import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/tipos',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTipos = () => {
  return apiClient.get('/');
};

export const getTipoById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createTipo = (data) => {
  return apiClient.post('/', data);
};

export const updateTipo = (id, data) => {
  return apiClient.put(`/${id}`, data);
};

export const deleteTipo = (id) => {
  return apiClient.delete(`/${id}`);
};
