// src/views/LoginScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';

export default function LoginScreen() {
  const {
    username, setUsername,
    password, setPassword,
    token, error,
    login
  } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <FeedbackMessage message={error} type="error" />}
      <Button title="Entrar" onPress={login} />
      {token && <FeedbackMessage message="Token recebido!" type="success" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' }
});
