// src/views/PublicRegisterScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useRegisterViewModel } from '../viewmodels/PublicRegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // ajuste conforme seu projeto

export default function PublicRegisterScreen() {
  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    handleRegister,
    isLoading
  } = useRegisterViewModel();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Redireciona para a tela de login após sucesso
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigation.navigate('Login'); // ajuste o nome conforme sua rota de login
      }, 1500); // tempo para mostrar a mensagem de sucesso

      return () => clearTimeout(timeout); // limpa timeout se o componente desmontar
    }
  }, [success]);

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

      <PrimaryButton
        title="Registrar"
        onPress={handleRegister}
        disabled={isLoading}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
});
