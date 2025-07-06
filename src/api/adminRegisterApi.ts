import axios from 'axios';
import { UserRegistration } from '../models/UserRegistration';

const adminRegisterApi = axios.create({
  baseURL: 'http://192.168.0.122:8080/api/users',
  timeout: 5000,
});

export async function registerAdminUser(
  data: UserRegistration,
  token: string
): Promise<void> {
  await adminRegisterApi.post('/admin-register', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
