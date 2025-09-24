import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/productoras',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProductoras = () => {
  return apiClient.get('/');
};

export const getProductoraById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createProductora = (data) => {
  return apiClient.post('/', data);
};

export const updateProductora = (id, data) => {
  return apiClient.put(`/${id}`, data);
};

export const deleteProductora = (id) => {
  return apiClient.delete(`/${id}`);
};
