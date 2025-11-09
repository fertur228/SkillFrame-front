import http from './http';
import { LoginRequestDto, LoginResponseDto, UserProfileDto } from '../types/api';

export const authApi = {
  login: async (payload: LoginRequestDto) => {
    const { data } = await http.post<LoginResponseDto>('/auth/login', payload);
    return data;
  },
  fetchProfile: async () => {
    const { data } = await http.get<UserProfileDto>('/users/me');
    return data;
  },
  refresh: async () => {
    // TODO: confirm refresh endpoint and payload contract
    const { data } = await http.post<LoginResponseDto>('/auth/refresh');
    return data;
  },
  logout: async () => {
    await http.post('/auth/logout');
  },
};
