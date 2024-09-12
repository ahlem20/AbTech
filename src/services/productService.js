import axios from 'axios';

const API_URL = 'https://abtechapi.onrender.com/api/products/';

export const addProduct = (data) => axios.post(`${API_URL}add`, data);
export const sellProduct = (data) => axios.post(`${API_URL}sell`, data);
export const buyProduct = (data) => axios.post(`${API_URL}buy`, data);
export const listAllProducts = () => axios.get(`${API_URL}list`);
export const listAllSells = () => axios.get(`${API_URL}lists1`);
export const listAllProducts2 = () => axios.get(`${API_URL}list2`);
export const listAllSells2 = () => axios.get(`${API_URL}lists2`);
export const deleteAllTransactions = () => axios.delete(`${API_URL}deletetransactions`);
export const getProduct = (productId) => {
  return axios.get(`${API_URL}product/${productId}`);
};
export const deleteTransaction = (productId) => {
  return axios.delete(`${API_URL}transactions/${productId}`);
};

export const PutTransaction = (productId) => {
  return axios.put(`${API_URL}transactions/${productId}`);
};

export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}deleteProduct/${productId}`);
};

export const PutProduct = (productId) => {
  return axios.put(`${API_URL}editProduct/${productId}`);
};
