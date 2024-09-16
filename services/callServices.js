import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://api.gbsit.co.in',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getDashboardDetails = async () => {
  try {
    const response = await api.get('/api/dashboard/get-details');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dashboard details:', error);
    throw error;
  }
};