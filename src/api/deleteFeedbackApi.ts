import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.122:8080/api/feedback', // ajuste baseURL
  timeout: 5000,
});

export async function deleteFeedbackById(feedbackId: number): Promise<void> {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('Usuário não autenticado');

  await api.delete(`/${feedbackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
