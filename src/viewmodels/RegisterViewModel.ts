import feedbackApi from '../api/feedbackApi';
import { UserRegistration } from '../models/UserRegistration';

export const registerPublicUser = async (data: UserRegistration) => {
  try {
    const response = await feedbackApi.post('/users/public-register', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
  }
};
