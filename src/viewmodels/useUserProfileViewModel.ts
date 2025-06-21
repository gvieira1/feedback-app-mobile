import { useState, useEffect } from 'react';
import { getLoggedUser } from '../api/userApi';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const useUserProfileViewModel = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const userData = await getLoggedUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do usuário.');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return {
    user,
    error,
    isLoading,
    reload: loadUserProfile,
  };
};
