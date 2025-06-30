// src/views/RegisterScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useRegisterViewModel } from '../viewmodels/RegisterViewModel';

export default function RegisterScreen() {
  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    handleRegister,
    isLoading // opcional, caso queira controlar loading
  } = useRegisterViewModel();

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="Confirme a senha"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />

      {error && <FeedbackMessage message={error} type="error" />}
      {success && <FeedbackMessage message={success} type="success" />}

      <PrimaryButton
        title="Cadastrar"
        onPress={handleRegister}
        disabled={isLoading} // desabilita se estiver carregando
        loading={isLoading}  // mostra spinner se estiver carregando
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
