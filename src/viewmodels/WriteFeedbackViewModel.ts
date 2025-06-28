import { useState } from 'react';
import { postFeedback } from '../api/postFeedbackApi';

export const useWriteFeedbackViewModel = () => {
  const [titulo, setTitulo] = useState('');
  const [content, setContent] = useState('');
  const [sector, setSector] = useState('');
  const [type, setType] = useState<'ELOGIO' | 'SUGESTAO' | 'CRITICA' | 'RECLAMACAO'>('SUGESTAO');
  const [anonymous, setAnonymous] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await postFeedback({ titulo, content, sector, type, anonymous, tags });
      return true;
    } catch (e: any) {
      setError(e.message || 'Erro ao enviar feedback');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    titulo, setTitulo,
    content, setContent,
    sector, setSector,
    type, setType,
    anonymous, setAnonymous,
    tags, setTags,
    isLoading, error,
    submitFeedback,
  };
};

