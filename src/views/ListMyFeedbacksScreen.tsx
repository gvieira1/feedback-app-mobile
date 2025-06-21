import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { useListMyFeedbacksViewModel } from '../viewmodels/ListMyFeedbacksViewModel';
import PrimaryButton from '../components/PrimaryButton';

const ListMyFeedbacksScreen = () => {
  const { username, feedbacks, loading, error } = useListMyFeedbacksViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {feedbacks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Você não possui feedbacks ainda.</Text>
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Escrever Feedback"
              onPress={() => navigation.navigate('WriteFeedback')}
            />
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={feedbacks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.feedbackItem}>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text>{item.content}</Text>
                <Text style={styles.author}>Enviado por: {item.authorName}</Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1 }}
          />
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Escrever Feedback"
              onPress={() => navigation.navigate('WriteFeedback')}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  feedbackItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    fontStyle: 'italic',
    marginTop: 4,
    color: '#555',
  },
  date: {
    marginTop: 2,
    color: '#999',
    fontSize: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    paddingVertical: 10,
     paddingBottom: 60,
  },
});

export default ListMyFeedbacksScreen;
