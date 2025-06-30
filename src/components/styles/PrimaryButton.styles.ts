// src/components/styles/PrimaryButton.styles.ts
import { StyleSheet } from 'react-native';

export const primaryButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#3242A7',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabled: {
    backgroundColor: '#CCC',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
