// src/components/AdminBottomNavigationBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminBottomNavigationBar() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.linkText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ListAllFeedbacks')}>
        <Text style={styles.linkText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AdminRegister')}>
        <Text style={styles.linkText}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2C2C',
    borderRadius: 30,
    paddingVertical: 12,
    elevation: 5,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
