export type Role = 'ADMIN' | 'EMPLOYEE';

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: Role;
}
