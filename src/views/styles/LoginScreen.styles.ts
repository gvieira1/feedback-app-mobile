// src/views/styles/RegisterScreen.styles.ts
import { StyleSheet } from 'react-native';

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  illustration: {
    height: 370,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linkText: {
    color: '#333',
    fontSize: 16,
  },
  linkButton: {
    color: '#3242A7', 
    fontWeight: 'bold',
    fontSize: 16,
  },
});
