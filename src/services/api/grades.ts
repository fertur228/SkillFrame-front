import http from './http';
import { ApiPagedResponse, GradeRecordDto } from '../types/api';

export const gradesApi = {
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<GradeRecordDto>>('/grades', { params });
    return data;
  },
  update: async (id: string, payload: Partial<GradeRecordDto>) => {
    const { data } = await http.put<GradeRecordDto>(`/grades/${id}`, payload);
    return data;
  },
};
