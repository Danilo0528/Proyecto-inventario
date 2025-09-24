import apiClient from './apiClient';

export const getGeneros = () => {
  return apiClient.get('/generos');
};

export const getGeneroById = (id) => {
  return apiClient.get(`/generos/${id}`);
};

export const createGenero = (data) => {
  return apiClient.post('/generos', data);
};

export const updateGenero = (id, data) => {
  return apiClient.put(`/generos/${id}`, data);
};

export const deleteGenero = (id) => {
  return apiClient.delete(`/generos/${id}`);
};
