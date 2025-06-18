import axios from 'axios';

const feedbackApi = axios.create({
  baseURL: 'http://192.168.0.122:8080/api', // seu IP + porta + prefixo da API
  timeout: 5000,
});

export default feedbackApi;
