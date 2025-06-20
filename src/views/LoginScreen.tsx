// src/views/LoginScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function LoginScreen() {
  const {
    username, setUsername,
    password, setPassword,
    token, error,
    login,
    isLoading // opcional: adicione no viewmodel para controle de loading
  } = useLoginViewModel();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (token) {
      navigation.navigate('ListMyFeedbacks');
    }
  }, [token]);

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
      
      <PrimaryButton
        title="Entrar"
        onPress={login}
        disabled={isLoading}
        loading={isLoading}
      />

      {token && <FeedbackMessage message="Token recebido!" type="success" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' }
});
