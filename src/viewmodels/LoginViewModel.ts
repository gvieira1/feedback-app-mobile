// src/viewmodels/LoginViewModel.ts
import { useState, useEffect } from 'react';
import { AuthDTO } from '../models/AuthDTO';
import { authenticateUser } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLoginViewModel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const credentials: AuthDTO = { username, password };
      const receivedToken = await authenticateUser(credentials);
      setToken(receivedToken);
      setError(null);

      await AsyncStorage.setItem('authToken', receivedToken);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Usuário ou senha inválidos');
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    };
    checkStoredToken();
  }, []);

  return {
    username,
    setUsername,
    password,
    setPassword,
    token,
    error,
    isLoggedIn,
    isLoading,
    login,
    logout
  };
};
