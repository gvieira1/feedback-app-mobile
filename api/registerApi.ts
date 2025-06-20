import axios from 'axios';
import { UserRegistration } from '../models/UserRegistration';

const registerApi = axios.create({
  baseURL: 'http://192.168.0.122:8080/api',
  timeout: 5000,
});

export async function registerPublicUser(data: UserRegistration): Promise<void> {
  await registerApi.post('/users/public-register', data);
}