// src/views/FeedbackDetailScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useFeedbackDetailViewModel } from '../viewmodels/FeedbackDetailViewModel';

type FeedbackDetailRouteProp = RouteProp<RootStackParamList, 'FeedbackDetail'>;

const FeedbackDetailScreen = () => {
  const route = useRoute<FeedbackDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const feedback = route.params.feedback;

  const {
    titulo,
    content,
    sector,
    type,
    anonymous,
    authorName,
    formattedDate,
    formattedTime,
    tags,
  } = useFeedbackDetailViewModel(feedback);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: titulo.length > 20 ? titulo.slice(0, 20) + '...' : titulo,
    });
  }, [navigation, titulo]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tipo: {type}</Text>
      <Text style={styles.label}>Setor: {sector}</Text>
      <Text style={styles.label}>Enviado por: {anonymous ? 'Anônimo' : authorName}</Text>
      <Text style={styles.label}>Data: {formattedDate} às {formattedTime}</Text>
      <Text style={styles.content}>{content}</Text>
      {tags?.length > 0 && (
        <View style={styles.tagContainer}>
          <Text style={styles.label}>Tags:</Text>
          {tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  content: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  tagContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    color: '#007BFF',
  },
});

export default FeedbackDetailScreen;
