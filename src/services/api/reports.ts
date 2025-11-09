import http from './http';
import { ApiPagedResponse, ReportDto } from '../types/api';

export const reportsApi = {
  list: async (params?: Record<string, unknown>) => {
    const { data } = await http.get<ApiPagedResponse<ReportDto>>('/reports', { params });
    return data;
  },
  export: async (reportId: string, params?: Record<string, unknown>) => {
    const response = await http.get(`/reports/${reportId}/export`, {
      params,
      responseType: 'blob',
    });
    return response.data as Blob;
  },
};
