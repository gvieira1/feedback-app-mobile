// src/views/FeedbackDetailAdminScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useFeedbackDetailViewModel } from '../viewmodels/FeedbackDetailViewModel';
import { deleteFeedbackById } from '../api/deleteFeedbackApi'; // Importe a função que vamos criar

type FeedbackDetailAdminRouteProp = RouteProp<RootStackParamList, 'FeedbackDetailAdmin'>;

const FeedbackDetailAdminScreen = () => {
  const route = useRoute<FeedbackDetailAdminRouteProp>();
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

  const [isDeleting, setIsDeleting] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: titulo.length > 20 ? titulo.slice(0, 20) + '...' : titulo,
    });
  }, [navigation, titulo]);

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este feedback?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteFeedbackById(feedback.id);
              Alert.alert('Sucesso', 'Feedback excluído com sucesso!');
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao excluir feedback');
            } finally {
              setIsDeleting(false);
            }
          } 
        },
      ]
    );
  };

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

      <View style={styles.buttonContainer}>
        {isDeleting ? (
          <ActivityIndicator size="small" color="#d9534f" />
        ) : (
          <Button
            title="Excluir Feedback"
            color="#d9534f"
            onPress={handleDelete}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
  buttonContainer: {
    marginTop: 30,
  },
});

export default FeedbackDetailAdminScreen;
