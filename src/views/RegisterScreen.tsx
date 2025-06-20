// src/views/RegisterScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import { useRegisterViewModel } from '../viewmodels/RegisterViewModel';

export default function RegisterScreen() {
  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    handleRegister
  } = useRegisterViewModel();

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Username"
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
      
      <Button title="Registrar" onPress={handleRegister} />
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
