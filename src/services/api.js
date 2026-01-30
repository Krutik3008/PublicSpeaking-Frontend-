import axios from 'axios';

// API URL - uses environment variable for production, localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Enable cookies
});

// Add request interceptor to attach token from localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/profile')
};

// Scenarios API
export const scenariosAPI = {
    getAll: (params) => api.get('/scenarios', { params }),
    getById: (id) => api.get(`/scenarios/${id}`),
    getByCategory: (category) => api.get(`/scenarios/category/${category}`),
    search: (query) => api.get('/scenarios/search', { params: { q: query } }),
    getCategories: () => api.get('/scenarios/categories'),
    create: (data) => api.post('/scenarios', data)
};

// Stories API
export const storiesAPI = {
    getAll: (params) => api.get('/stories', { params }),
    add: (data) => api.post('/stories', data),
    like: (id) => api.post(`/stories/${id}/like`),
    getFeelings: () => api.get('/stories/feelings')
};

// Scripts API
export const scriptsAPI = {
    getAll: (params) => api.get('/scripts', { params }),
    getForScenario: (scenarioId) => api.get(`/scripts/scenario/${scenarioId}`),
    generate: (data) => api.post('/scripts/generate', data),
    save: (scriptId) => api.post(`/scripts/save/${scriptId}`),
    unsave: (scriptId) => api.delete(`/scripts/save/${scriptId}`),
    getSaved: () => api.get('/scripts/saved')
};

// Tips API
export const tipsAPI = {
    getAll: (params) => api.get('/tips', { params }),
    getByCategory: (category) => api.get(`/tips/category/${category}`),
    add: (data) => api.post('/tips', data),
    like: (id) => api.post(`/tips/${id}/like`),
    getCategories: () => api.get('/tips/categories')
};

// Tools API
export const toolsAPI = {
    getPhrases: () => api.get('/tools/phrases'),
    getAffirmations: () => api.get('/tools/affirmations'),
    getScripts: () => api.get('/tools/scripts')
};

// Stats API
export const statsAPI = {
    getStats: () => api.get('/stats')
};

export default api;
