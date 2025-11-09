import http from './http';
import { ApiPagedResponse, AttendanceRecordDto } from '../types/api';

export const attendanceApi = {
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<AttendanceRecordDto>>('/attendance', { params });
    return data;
  },
  updateStatus: async (id: string, payload: Partial<AttendanceRecordDto>) => {
    const { data } = await http.patch<AttendanceRecordDto>(`/attendance/${id}`, payload);
    return data;
  },
};
