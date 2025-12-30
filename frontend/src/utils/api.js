import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    baseURL: API_URL,
});

export const predict = (data) => api.post('/api/predict', data);
export const getModelInfo = () => api.get('/api/model-info');
export const getMetrics = () => api.get('/api/metrics');
export const getDataStats = () => api.get('/api/data-stats');

export default api;
