// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/PublicRegisterScreen';
import ListMyFeedbacksScreen from '../views/ListMyFeedbacksScreen';
import ListAllFeedbacksScreen from '../views/ListAllFeedbacksScreen';
import FeedbackDetailScreen from '../views/FeedbackDetailScreen';
import FeedbackDetailAdminScreen from '../views/FeedbackDetailAdminScreen';
import UserProfileScreen from '../views/UserProfileScreen';
import WriteFeedbackScreen from '../views/WriteFeedbackScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegisterScreen} />
      <Stack.Screen
        name="ListMyFeedbacks"
        component={ListMyFeedbacksScreen}
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ListAllFeedbacks"
        component={ListAllFeedbacksScreen}
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} />
      <Stack.Screen name="FeedbackDetailAdmin" component={FeedbackDetailAdminScreen} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: 'Perfil do Usuário',
        }}
      />
      <Stack.Screen name="WriteFeedback" component={WriteFeedbackScreen} />
    </Stack.Navigator>
  );
}
