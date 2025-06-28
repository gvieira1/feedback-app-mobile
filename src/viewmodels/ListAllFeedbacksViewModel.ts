import { useEffect, useState, useCallback } from 'react';
import { getAllFeedbacks } from '../api/getAllFeedbacksApi';
import { Feedback } from '../models/Feedback';

export const useListAllFeedbacksViewModel = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllFeedbacks();
      setFeedbacks(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar feedbacks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  return { feedbacks, loading, error, reloadFeedbacks: loadFeedbacks };
};
