// src/viewmodels/LoginViewModel.ts
import { useState, useEffect } from 'react';
import { AuthDTO } from '../models/AuthDTO';
import { authenticateUser } from '../api/authApi';
import { getLoggedUser } from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLoginViewModel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Armazena role

  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const credentials: AuthDTO = { username, password };
      const receivedToken = await authenticateUser(credentials);
      setToken(receivedToken);
      await AsyncStorage.setItem('authToken', receivedToken);

      // Agora pega o usuário com a role usando o token
      const user = await getLoggedUser();
      setUserRole(user.role); // setar a role
      setError(null);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Usuário ou senha inválidos');
      setIsLoggedIn(false);
      setToken(null);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setUserRole(null);
    setIsLoggedIn(false);
  };

  // Se já tiver token no armazenamento, pegar a role do usuário para manter login
  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const user = await getLoggedUser();
          setUserRole(user.role);
          setIsLoggedIn(true);
        } catch {
          // token inválido ou erro
          setUserRole(null);
          setIsLoggedIn(false);
          setToken(null);
          await AsyncStorage.removeItem('authToken');
        }
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
    logout,
    userRole,  // expose role
  };
};
