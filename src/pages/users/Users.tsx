import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../services/api/users';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';

export const UsersPage = () => {
  const { t } = useTranslation();

  const usersQuery = useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => usersApi.list({ size: 50 }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.users')}</h1>
        <Button>{t('common.submit')}</Button>{/* TODO: replace with user creation modal */}
      </div>
      <div>
        {usersQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : usersQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>{t('common.email')}</TableHeaderCell>
                <TableHeaderCell>Full name</TableHeaderCell>
                <TableHeaderCell>Roles</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersQuery.data.content.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName ?? '—'}</TableCell>
                  <TableCell>{user.roles?.join(', ') ?? '—'}</TableCell>
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
