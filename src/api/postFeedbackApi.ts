import AsyncStorage from '@react-native-async-storage/async-storage';
import feedbackApi from './feedbackApi';
import { FeedbackType } from '../models/Feedback';

interface FeedbackRequest {
  titulo: string;
  content: string;
  sector: string;
  type: FeedbackType;
  anonymous: boolean;
  tags: string[];
}

export async function postFeedback(feedback: FeedbackRequest) {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await feedbackApi.post('/feedback', feedback, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
