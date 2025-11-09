export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface UserProfileDto {
  id: string;
  email: string;
  fullName?: string;
  roles: string[];
  orgId?: string;
  [key: string]: unknown;
}

export interface ApiPagedResponse<T> {
  content: T[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface ScheduleItemDto {
  id: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  [key: string]: unknown;
}

export interface AttendanceRecordDto {
  id: string;
  lessonId?: string;
  studentId?: string;
  status?: string;
  [key: string]: unknown;
}

export interface LessonDto {
  id: string;
  subject?: string;
  description?: string;
  [key: string]: unknown;
}

export interface GradeRecordDto {
  id: string;
  studentId?: string;
  lessonId?: string;
  score?: number;
  [key: string]: unknown;
}

export interface UserDto {
  id: string;
  email: string;
  fullName?: string;
  roles: string[];
  [key: string]: unknown;
}

export interface ReportDto {
  id: string;
  name: string;
  description?: string;
  downloadUrl?: string;
  [key: string]: unknown;
}
