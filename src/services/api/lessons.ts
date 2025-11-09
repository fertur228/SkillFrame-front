import http from './http';
import { ApiPagedResponse, LessonDto } from '../types/api';

export const lessonsApi = {
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<LessonDto>>('/lessons', { params });
    return data;
  },
  get: async (id: string) => {
    const { data } = await http.get<LessonDto>(`/lessons/${id}`);
    return data;
  },
  create: async (payload: Partial<LessonDto>) => {
    const { data } = await http.post<LessonDto>('/lessons', payload);
    return data;
  },
  update: async (id: string, payload: Partial<LessonDto>) => {
    const { data } = await http.put<LessonDto>(`/lessons/${id}`, payload);
    return data;
  },
};
