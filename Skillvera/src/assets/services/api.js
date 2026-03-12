import axios from 'axios';

// Example base URL, you would replace this with your actual backend URL
const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const submitAccessRequest = async (data) => {
  try {
    const response = await apiClient.post('/request-access', data);
    return response.data;
  } catch (error) {
    console.error('Request Access Error:', error);
    throw error;
  }
};

// Analytics Tools
export const fetchAnalytics = async () => {
  try {
    const response = await apiClient.get('/analytics');
    return response.data;
  } catch (error) {
    console.error('Fetch Analytics Error:', error);
    throw error;
  }
};

// Admin Commands
export const approveUser = async (userId) => {
  try {
    const response = await apiClient.post('/approve-user', { userId });
    return response.data;
  } catch (error) {
    console.error('Approve User Error:', error);
    throw error;
  }
};

// Reject user (example additional endpoint)
export const rejectUser = async (userId) => {
  try {
    const response = await apiClient.post('/reject-user', { userId });
    return response.data;
  } catch (error) {
    console.error('Reject User Error:', error);
    throw error;
  }
};
