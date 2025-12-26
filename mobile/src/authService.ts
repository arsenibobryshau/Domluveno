import { api } from './apiClient';
import { saveToken, clearToken } from './token';

export async function register(email: string, password: string, firstName: string, lastName: string) {
  const { token } = await api.register({ email, password, firstName, lastName });
  await saveToken(token);
  return token;
}

export async function login(email: string, password: string) {
  const { token } = await api.login({ email, password });
  await saveToken(token);
  return token;
}

export async function logout() {
  await clearToken();
}

