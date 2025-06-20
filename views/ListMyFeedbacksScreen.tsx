// src/views/ListMyFeedbacksView.tsx
import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT CORRETO PARA useNavigation:
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { useListMyFeedbacksViewModel } from '../viewmodels/ListMyFeedbacksViewModel';

const ListMyFeedbacksScreen = () => {
  const { username } = useListMyFeedbacksViewModel();

  // Tipando navigation com o stack param list
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          Olá{username ? `, ${username}!` : '!'}
        </Text>
      ),
      headerBackVisible: false,
      headerRight: () => (
        <Button
          title="Sair"
          onPress={async () => {
            await AsyncStorage.removeItem('authToken');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        />
      ),
    });
  }, [navigation, username]);

  return <View style={styles.container}>{/* conteúdo se quiser */}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListMyFeedbacksScreen;
