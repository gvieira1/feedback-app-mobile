import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLoggedUser = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const response = await axios.get('http://192.168.0.122:8080/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
