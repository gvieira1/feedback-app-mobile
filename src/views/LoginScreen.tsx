// src/views/LoginScreen.tsx
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Entrar" onPress={login} />
      {token && <Text style={styles.success}>Token recebido!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 10
  },
  error: { color: 'red', marginBottom: 10 },
  success: { color: 'green', marginTop: 10 }
});
