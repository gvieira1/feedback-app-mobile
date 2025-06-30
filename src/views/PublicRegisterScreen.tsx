// src/views/PublicRegisterScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useRegisterViewModel } from '../viewmodels/PublicRegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { publicRegisterStyles as styles } from './styles/PublicRegisterScreen.styles';


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
      <View>
        <Text style={styles.title}>Cadastre-se</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/cad.png')}
          style={styles.illustration}
        />
      </View>

      <View>
        <Text style={styles.inputLabel}>Usuário</Text>
        <InputField
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}>Email</Text>
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}>Senha</Text>
        <InputField
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.inputLabel}>Confirme sua senha</Text>
        <InputField
          placeholder="Confirme sua senha"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />

        {error && <FeedbackMessage message={error} type="error" />}
        {success && <FeedbackMessage message={success} type="success" />}

        <PrimaryButton
          title="Cadastrar"
          onPress={handleRegister}
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
}
