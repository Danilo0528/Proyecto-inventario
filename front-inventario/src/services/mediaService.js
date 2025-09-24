import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/medias',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getMedias = () => {
  return apiClient.get('/');
};

export const getMediaById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createMedia = (data) => {
  return apiClient.post('/', data);
};

export const updateMedia = (id, data) => {
  return apiClient.put(`/${id}`, data);
};

export const deleteMedia = (id) => {
  return apiClient.delete(`/${id}`);
};
