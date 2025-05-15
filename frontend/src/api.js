
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://smartdine.onrender.com/api',
  withCredentials: true,
});

export default API;
