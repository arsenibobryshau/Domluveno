import { API_BASE_URL } from './config';
import { getToken } from './token';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    request<{ token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  getCategories: () => request<any[]>('/categories'),
  getRequests: () => request<any[]>('/requests'),
  getRequest: (id: string) => request<any>(`/requests/${id}`),

  createRequest: (data: {
    title: string;
    description?: string;
    location?: string;
    budget?: number;
    currency?: string;
    categoryId: number;
  }) => request<any>('/requests', { method: 'POST', body: JSON.stringify(data) }),
};

