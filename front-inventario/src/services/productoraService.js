import apiClient from './apiClient';

export const getProductoras = () => {
  return apiClient.get('/productoras');
};

export const getProductoraById = (id) => {
  return apiClient.get(`/productoras/${id}`);
};

export const createProductora = (data) => {
  return apiClient.post('/productoras', data);
};

export const updateProductora = (id, data) => {
  return apiClient.put(`/productoras/${id}`, data);
};

export const deleteProductora = (id) => {
  return apiClient.delete(`/productoras/${id}`);
};
