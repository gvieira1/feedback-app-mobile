// src/components/FeedbackMessage.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
  type: 'error' | 'success';
}

export default function FeedbackMessage({ message, type }: Props) {
  return (
    <Text style={type === 'error' ? styles.error : styles.success}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: { color: 'red', marginBottom: 10 },
  success: { color: 'green', marginTop: 10 },
});
