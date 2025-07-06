import { useState } from 'react';
import { registerAdminUser } from '../api/adminRegisterApi';
import { UserRegistration, Role } from '../models/UserRegistration';

export const useAdminRegisterViewModel = (token: string) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const role: Role = 'ADMIN';

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);

    if (!username || !email || !password || !passwordConfirmation) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError('O nome de usuário deve ter entre 3 e 20 caracteres.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('E-mail inválido.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }

    const data: UserRegistration = {
      username,
      email,
      password,
      passwordConfirmation,
      role,
    };

    setIsLoading(true);
    try {
      await registerAdminUser(data, token);
      setSuccess('Usuário ADMIN registrado com sucesso!');

      // Reset dos campos
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    isLoading,
    handleRegister,
  };
};
