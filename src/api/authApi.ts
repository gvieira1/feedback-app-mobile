// src/api/authApi.ts
import axios from 'axios';
import { AuthDTO } from '../models/AuthDTO';

const API_URL = 'http://192.168.0.122:8080/api/auth';

export const authenticateUser = async (credentials: AuthDTO): Promise<string> => {
  const response = await axios.post(`${API_URL}/authenticate`, credentials);
  return response.data; // retorna o token (string)
};
