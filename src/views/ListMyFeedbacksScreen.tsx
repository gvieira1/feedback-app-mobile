import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { useListMyFeedbacksViewModel } from '../viewmodels/ListMyFeedbacksViewModel';
import PrimaryButton from '../components/PrimaryButton';
import { Feedback } from '../models/Feedback';

type ListMyFeedbacksRouteProp = RouteProp<RootStackParamList, 'ListMyFeedbacks'>;

const ListMyFeedbacksScreen = () => {
  const route = useRoute<ListMyFeedbacksRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { username, feedbacks, loading, error } = useListMyFeedbacksViewModel();

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

  // Mostrar alerta de sucesso se veio parâmetro feedbackSent
  React.useEffect(() => {
    if (route.params?.feedbackSent) {
      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
      // Limpa o param para não mostrar alerta de novo quando voltar para essa tela
      navigation.setParams({ feedbackSent: undefined });
    }
  }, [route.params, navigation]);

  const handlePressFeedback = (feedback: Feedback) => {
    navigation.navigate('FeedbackDetail', { feedback });
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
