import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/generos',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getGeneros = () => {
  return apiClient.get('/');
};

export const getGeneroById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createGenero = (data) => {
  return apiClient.post('/', data);
};

export const updateGenero = (id, data) => {
  return apiClient.put(`/${id}`, data);
};

export const deleteGenero = (id) => {
  return apiClient.delete(`/${id}`);
};
