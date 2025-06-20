import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/PublicRegisterScreen';
import ListMyFeedbacksScreen from '../views/ListMyFeedbacksScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
        name="Registro"
        component={RegisterScreen}
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ListMyFeedbacks"
        component={ListMyFeedbacksScreen}
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
