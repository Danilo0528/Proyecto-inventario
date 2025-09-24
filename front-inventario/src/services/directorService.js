import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/directores',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDirectores = () => {
  return apiClient.get('/');
};

export const getDirectorById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createDirector = (data) => {
  return apiClient.post('/', data);
};

export const updateDirector = (id, data) => {
  return apiClient.put(`/${id}`, data);
};

export const deleteDirector = (id) => {
  return apiClient.delete(`/${id}`);
};
