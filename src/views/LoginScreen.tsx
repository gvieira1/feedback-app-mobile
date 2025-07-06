import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    isLoading,
    userRole, // role do usuário
  } = useLoginViewModel();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (token && userRole) {
      if (userRole === 'EMPLOYEE') {
        navigation.navigate('ListMyFeedbacks', { feedbackSent: false });
      } else if (userRole === 'ADMIN') {
        navigation.navigate('ListAllFeedbacks');
      } else {
        //Outros Tratamentos
      }
    }
  }, [token, userRole]);

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

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.linkButton}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linkText: {
    color: '#333',
  },
  linkButton: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
});
