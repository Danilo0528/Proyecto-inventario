import apiClient from './apiClient';

export const getDirectores = () => {
  return apiClient.get('/directores');
};

export const getDirectorById = (id) => {
  return apiClient.get(`/directores/${id}`);
};

export const createDirector = (data) => {
  return apiClient.post('/directores', data);
};

export const updateDirector = (id, data) => {
  return apiClient.put(`/directores/${id}`, data);
};

export const deleteDirector = (id) => {
  return apiClient.delete(`/directores/${id}`);
};
