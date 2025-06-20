import axios from 'axios';
import { UserRegistration } from '../models/UserRegistration';

const publicRegisterApi = axios.create({
  baseURL: 'http://192.168.0.122:8080/api',
  timeout: 5000,
});

export async function registerPublicUser(data: UserRegistration): Promise<void> {
  await publicRegisterApi.post('/users/public-register', data);
}