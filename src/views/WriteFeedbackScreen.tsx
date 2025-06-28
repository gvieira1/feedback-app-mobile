import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useWriteFeedbackViewModel } from '../viewmodels/WriteFeedbackViewModel';
import PrimaryButton from '../components/PrimaryButton';

export default function WriteFeedbackScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    titulo, setTitulo,
    content, setContent,
    sector, setSector,
    type, setType,
    anonymous, setAnonymous,
    tags, setTags,
    isLoading, error,
    submitFeedback,
  } = useWriteFeedbackViewModel();

  const handleSubmit = async () => {
    const success = await submitFeedback();
    if (success) {
      navigation.navigate('ListMyFeedbacks', { feedbackSent: true });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Setor"
        value={sector}
        onChangeText={setSector}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags separadas por vírgula"
        onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
      />

      <Text style={styles.label}>Tipo:</Text>
      <View style={styles.buttonGroup}>
        {['ELOGIO', 'SUGESTAO', 'CRITICA', 'RECLAMACAO'].map((t) => (
          <Button
            key={t}
            title={t}
            onPress={() => setType(t as any)}
            color={type === t ? '#1E88E5' : '#888'}
          />
        ))}
      </View>

      <View style={styles.switchContainer}>
        <Text>Enviar como anônimo?</Text>
        <Switch value={anonymous} onValueChange={setAnonymous} />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <PrimaryButton title="Enviar Feedback" onPress={handleSubmit} loading={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    padding: 8,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
  },
  error: { color: 'red', marginTop: 8 },
});
