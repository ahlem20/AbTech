import axios from 'axios';

const API_URL = 'https://abtechapi.onrender.com/api/products/';

const API_URL2 = 'https://abtech-api2.onrender.com/api/products/';
///1
export const addProduct = (data) => axios.post(`${API_URL}add`, data);
export const sellProduct = (data) => axios.post(`${API_URL}sell`, data);
export const buyProduct = (data) => axios.post(`${API_URL}buy`, data);
export const listAllProducts = () => axios.get(`${API_URL}list`);
export const listAllSells = () => axios.get(`${API_URL}lists1`);
export const deleteAllTransactions = () => axios.delete(`${API_URL}deletetransactions`);

///2
export const addProduct2 = (data) => axios.post(`${API_URL2}add`, data);
export const sellProduct2 = (data) => axios.post(`${API_URL2}sell`, data);
export const buyProduct2 = (data) => axios.post(`${API_URL2}buy`, data);
export const listAllProducts2 = () => axios.get(`${API_URL2}list2`);
export const listAllSells2 = () => axios.get(`${API_URL2}lists2`);
export const deleteAllTransactions2 = () => axios.delete(`${API_URL2}deletetransactions`);

///1
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

///2
export const getProduct2 = (productId) => {
  return axios.get(`${API_URL2}product/${productId}`);
};
export const deleteTransaction2 = (productId) => {
  return axios.delete(`${API_URL2}transactions/${productId}`);
};

export const PutTransaction2 = (productId) => {
  return axios.put(`${API_URL2}transactions/${productId}`);
};

export const deleteProduct2 = (productId) => {
  return axios.delete(`${API_URL2}deleteProduct/${productId}`);
};

export const PutProduct2 = (productId) => {
  return axios.put(`${API_URL2}editProduct/${productId}`);
};
