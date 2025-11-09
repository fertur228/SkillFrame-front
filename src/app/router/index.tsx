import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import { RequireAuth } from '../guards/RequireAuth';
import { RequireRole } from '../guards/RequireRole';
import { LoginPage } from '../../pages/auth/Login';
import { ForgotPasswordPage } from '../../pages/auth/Forgot';
import { ResetPasswordPage } from '../../pages/auth/Reset';
import { DashboardPage } from '../../pages/dashboard/Dashboard';
import { SchedulePage } from '../../pages/schedule/Schedule';
import { AttendancePage } from '../../pages/attendance/Attendance';
import { LessonsPage } from '../../pages/lessons/Lessons';
import { GradesPage } from '../../pages/grades/Grades';
import { UsersPage } from '../../pages/users/Users';
import { ReportsPage } from '../../pages/reports/Reports';
import { ForbiddenPage } from '../../pages/errors/Forbidden';
import { NotFoundPage } from '../../pages/errors/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'schedule',
            element: <SchedulePage />,
          },
          {
            path: 'attendance',
            element: <AttendancePage />,
          },
          {
            path: 'lessons',
            element: <LessonsPage />,
          },
          {
            path: 'grades',
            element: <GradesPage />,
          },
          {
            path: 'users',
            element: <RequireRole roles={['ADMIN']} />,
            children: [
              {
                index: true,
                element: <UsersPage />,
              },
            ],
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset',
    element: <ResetPasswordPage />,
  },
  {
    path: '/errors/403',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
