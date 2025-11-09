import http from './http';
import { ApiPagedResponse, UserDto, UserProfileDto } from '../types/api';

export const usersApi = {
  me: async () => {
    const { data } = await http.get<UserProfileDto>('/users/me');
    return data;
  },
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<UserDto>>('/users', { params });
    return data;
  },
  create: async (payload: Partial<UserDto>) => {
    const { data } = await http.post<UserDto>('/users', payload);
    return data;
  },
  update: async (userId: string, payload: Partial<UserDto>) => {
    const { data } = await http.put<UserDto>(`/users/${userId}`, payload);
    return data;
  },
  remove: async (userId: string) => {
    await http.delete(`/users/${userId}`);
  },
};
