import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import feedbackApi from '../api/feedbackApi'; // ajuste o caminho se necessário

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    
    try {
      await feedbackApi.post('/users/public-register', {
        username,
        email,
        password,
        passwordConfirmation,
      });
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      // limpar campos
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao registrar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirme a senha"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        style={styles.input}
        secureTextEntry
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
});
