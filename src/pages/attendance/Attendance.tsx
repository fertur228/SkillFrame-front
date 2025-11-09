import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '../../services/api/attendance';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../app/store/auth.store';

export const AttendancePage = () => {
  const { t } = useTranslation();
  const roles = useAuthStore((state) => state.user?.roles ?? []);
  const canUpdate = roles.some((role) => ['TEACHER', 'STAFF'].includes(role));

  const attendanceQuery = useQuery({
    queryKey: ['attendance', 'list'],
    queryFn: () => attendanceApi.list({ size: 50 }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.attendance')}</h1>
        {canUpdate && <Button>{t('common.submit')}</Button>}{/* TODO: connect to edit modal */}
      </div>
      <div>
        {attendanceQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : attendanceQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>{t('navigation.lessons')}</TableHeaderCell>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceQuery.data.content.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.lessonId ?? '—'}</TableCell>
                  <TableCell>{record.studentId ?? '—'}</TableCell>
                  <TableCell>{record.status ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-slate-500">{t('common.noData')}</p>
        )}
      </div>
    </div>
  );
};
