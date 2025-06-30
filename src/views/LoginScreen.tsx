import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { loginScreenStyles as styles } from './styles/LoginScreen.styles';

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
        navigation.navigate('ListMyFeedbacks');
      } else if (userRole === 'ADMIN') {
        navigation.navigate('ListAllFeedbacks');
      } else {
        //Outros Tratamentos
      }
    }
  }, [token, userRole]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/login.png')}
          style={styles.illustration}
        />
      </View>

      <View>
        <Text style={styles.title}>Login</Text>
      </View>

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
        <Text style={styles.linkText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.linkButton}> Cadastre-se</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
}

