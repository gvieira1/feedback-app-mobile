import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import FeedbackMessage from '../components/FeedbackMessage';
import PrimaryButton from '../components/PrimaryButton';
import { useAdminRegisterViewModel } from '../viewmodels/AdminRegisterViewModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function AdminRegisterScreen() {
  const [token, setToken] = React.useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    AsyncStorage.getItem('authToken').then(storedToken => {
      setToken(storedToken);
    });
  }, []);

  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    error, success,
    handleRegister,
    isLoading,
  } = useAdminRegisterViewModel(token ?? '');

  React.useEffect(() => {
    if (success) {
      Alert.alert(
        'Sucesso',
        'Usuário ADMIN cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ListAllFeedbacks')
          }
        ],
        { cancelable: false }
      );
    }
  }, [success, navigation]);

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

      <PrimaryButton
        title="Registrar Admin"
        onPress={handleRegister}
        disabled={isLoading || !token}
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