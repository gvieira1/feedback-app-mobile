// src/views/styles/RegisterScreen.styles.ts
import { StyleSheet } from 'react-native';

export const publicRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  illustration: {
    width: 340,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 28,
  },
  inputLabel: {
    fontSize: 15.5,
    marginBottom: 4,
    color: '#333',
  },
});
