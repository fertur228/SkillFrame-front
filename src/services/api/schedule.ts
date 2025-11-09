import http from './http';
import { ApiPagedResponse, ScheduleItemDto } from '../types/api';

export const scheduleApi = {
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<ScheduleItemDto>>('/schedule', { params });
    return data;
  },
  get: async (id: string) => {
    const { data } = await http.get<ScheduleItemDto>(`/schedule/${id}`);
    return data;
  },
  create: async (payload: Partial<ScheduleItemDto>) => {
    const { data } = await http.post<ScheduleItemDto>('/schedule', payload);
    return data;
  },
  update: async (id: string, payload: Partial<ScheduleItemDto>) => {
    const { data } = await http.put<ScheduleItemDto>(`/schedule/${id}`, payload);
    return data;
  },
  remove: async (id: string) => {
    await http.delete(`/schedule/${id}`);
  },
};
