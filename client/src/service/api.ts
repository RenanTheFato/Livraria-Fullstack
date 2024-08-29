import axios from 'axios'

export const api = axios.create({
  baseURL: "http://localhost:3333"
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      alert('Você não está autenticado. Por favor, faça login.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);