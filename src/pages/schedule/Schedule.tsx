import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { scheduleApi } from '../../services/api/schedule';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../app/store/auth.store';

export const SchedulePage = () => {
  const { t } = useTranslation();
  const roles = useAuthStore((state) => state.user?.roles ?? []);
  const canEdit = roles.some((role) => ['ADMIN', 'STAFF'].includes(role));

  const scheduleQuery = useQuery({
    queryKey: ['schedule', 'list'],
    queryFn: () => scheduleApi.list({ size: 50 }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.schedule')}</h1>
        {canEdit && <Button>{t('common.submit')}</Button>}{/* TODO: replace with modal trigger */}
      </div>
      <div>
        {scheduleQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : scheduleQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>{t('navigation.lessons')}</TableHeaderCell>
                <TableHeaderCell>Start</TableHeaderCell>
                <TableHeaderCell>End</TableHeaderCell>
                <TableHeaderCell>Location</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleQuery.data.content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title ?? '—'}</TableCell>
                  <TableCell>{item.startTime ?? '—'}</TableCell>
                  <TableCell>{item.endTime ?? '—'}</TableCell>
                  <TableCell>{item.location ?? '—'}</TableCell>
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
