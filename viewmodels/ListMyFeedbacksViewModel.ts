// src/viewmodels/ListMyFeedbacksViewModel.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub?: string;        // padrão do Spring Security
  username?: string;   // se você customizou seu token
  // adicione outros campos se necessário
}

export const useListMyFeedbacksViewModel = () => {
  const [username, setUsername] = useState<string | null>(null);

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

  return { username };
};
