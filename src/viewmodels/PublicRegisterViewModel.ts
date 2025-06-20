// src/viewmodels/PublicRegisterViewModel.ts
import { useState } from 'react';
import { registerPublicUser } from '../api/publicRegisterApi';
import { UserRegistration } from '../models/UserRegistration';

export const useRegisterViewModel = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);

    // 🔒 Validações do front-end
    if (!username || !email || !password || !passwordConfirmation) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError('O nome de usuário deve ter entre 3 e 20 caracteres.');
      return;
    }

    // Validação básica de email (poderia usar regex para ser mais rigoroso)
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

    // Se passou pelas validações, monta os dados
    const data: UserRegistration = {
      username,
      email,
      password,
      passwordConfirmation,
    };

    setIsLoading(true);
    try {
      await registerPublicUser(data);
      setSuccess('Usuário registrado com sucesso!');

      // Limpa os campos após sucesso
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err: any) {
      setError(err.message); // Mensagem vinda da API
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
    handleRegister
  };
};
