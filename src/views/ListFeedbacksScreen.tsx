import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLoginViewModel } from '../viewmodels/LoginViewModel';

export default function ListFeedbacks() {
  const { logout } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de ListFeedbacks (Admin)</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});
