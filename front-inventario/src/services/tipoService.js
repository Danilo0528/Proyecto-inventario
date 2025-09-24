import apiClient from './apiClient';

export const getTipos = () => {
  return apiClient.get('/tipos');
};

export const getTipoById = (id) => {
  return apiClient.get(`/tipos/${id}`);
};

export const createTipo = (data) => {
  return apiClient.post('/tipos', data);
};

export const updateTipo = (id, data) => {
  return apiClient.put(`/tipos/${id}`, data);
};

export const deleteTipo = (id) => {
  return apiClient.delete(`/tipos/${id}`);
};
