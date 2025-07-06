import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useUserProfileViewModel } from '../viewmodels/useUserProfileViewModel';
import AdminBottomNavigationBar from '../components/AdminBottomNavigationBar';
import EmployeeBottomNavigationBar from '../components/EmployeeBottomNavigationBar';

export default function UserProfileScreen() {
  const { user, error, isLoading, reload } = useUserProfileViewModel();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E88E5" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Nenhum dado disponível.</Text>
      </View>
    );
  }

  const role = user.role.toLowerCase();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{user.username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{user.role}</Text>

      {/* Renderiza conforme a role */}
      {role === 'admin' && <AdminBottomNavigationBar />}
      {role === 'employee' && <EmployeeBottomNavigationBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});