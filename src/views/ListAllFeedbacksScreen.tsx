import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { useListAllFeedbacksViewModel } from '../viewmodels/ListAllFeedbacksViewModel';
import { Feedback } from '../models/Feedback';
import AdminBottomNavigationBar from '../components/AdminBottomNavigationBar';

const ListAllFeedbacksScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { feedbacks, loading, error, reloadFeedbacks } = useListAllFeedbacksViewModel();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Todos os Feedbacks',
      headerBackVisible: false,
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('authToken');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
          style={{ marginRight: 12 }}
        >
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      reloadFeedbacks();
    }, [reloadFeedbacks])
  );

  const handlePressFeedback = (feedback: Feedback) => {
    navigation.navigate('FeedbackDetailAdmin', { feedback });
  };

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
        <View style={styles.centered}>
          <Text>Nenhum feedback foi enviado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressFeedback(item)}>
              <View style={styles.feedbackItem}>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text numberOfLines={2}>{item.content}</Text>
                <Text style={styles.author}>
                  Enviado por: {item.anonymous ? 'Anônimo' : item.authorName}
                </Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ flex: 1 }}
        />
      )}
      <AdminBottomNavigationBar />
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
});

export default ListAllFeedbacksScreen;
