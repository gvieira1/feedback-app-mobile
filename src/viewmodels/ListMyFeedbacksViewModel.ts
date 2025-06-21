// src/viewmodels/ListMyFeedbacksViewModel.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getMyFeedbacks } from '../api/getMyFeedbacksApi';
import { Feedback } from '../models/Feedback';

interface DecodedToken {
  sub?: string;
  username?: string;
}

export const useListMyFeedbacksViewModel = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        setUsername(decoded.username || decoded.sub || 'Usuário');
      }
    };

    loadUsername();
  }, []);

  useEffect(() => {
    const loadFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyFeedbacks();
        setFeedbacks(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar feedbacks');
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  return { username, feedbacks, loading, error };
};
