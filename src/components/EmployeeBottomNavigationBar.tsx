// src/components/EmployeeBottomNavigationBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EmployeeBottomNavigationBar() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.linkText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ListMyFeedbacks', { feedbackSent: false })}>
        <Text style={styles.linkText}>MyFeed</Text>
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
