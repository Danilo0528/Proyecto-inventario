import apiClient from './apiClient';

export const getMedias = () => {
  return apiClient.get('/medias');
};

export const getMediaById = (id) => {
  return apiClient.get(`/medias/${id}`);
};

export const createMedia = (data) => {
  return apiClient.post('/medias', data);
};

export const updateMedia = (id, data) => {
  return apiClient.put(`/medias/${id}`, data);
};

export const deleteMedia = (id) => {
  return apiClient.delete(`/medias/${id}`);
};
