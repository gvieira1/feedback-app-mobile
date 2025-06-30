// src/components/InputField.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {}

export default function InputField(props: InputFieldProps) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 13.5,
    marginBottom: 10,
  },
});
