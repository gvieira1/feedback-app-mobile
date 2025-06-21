// src/api/getMyFeedbacksApi.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feedback } from '../models/Feedback';

const api = axios.create({
  baseURL: 'http://192.168.0.122:8080/api/feedback',
  timeout: 5000,
});

export async function getMyFeedbacks(): Promise<Feedback[]> {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await api.get<Feedback[]>('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
