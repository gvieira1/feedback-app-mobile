export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  // role não precisa enviar no registro público, será definido no backend como EMPLOYEE
}