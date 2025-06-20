// src/viewmodels/RegisterViewModel.ts
import { useState } from 'react';
import { registerPublicUser } from '../api/registerApi';
import { UserRegistration } from '../models/UserRegistration';

export const useRegisterViewModel = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }

    const data: UserRegistration = {
      username,
      email,
      password,
      passwordConfirmation,
    };

    try {
      await registerPublicUser(data);
      setSuccess('Usuário registrado com sucesso!');
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    handleRegister
  };
};
