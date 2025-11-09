import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { gradesApi } from '../../services/api/grades';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';

export const GradesPage = () => {
  const { t } = useTranslation();

  const gradesQuery = useQuery({
    queryKey: ['grades', 'list'],
    queryFn: () => gradesApi.list({ size: 100 }),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.grades')}</h1>
      <div>
        {gradesQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : gradesQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Lesson</TableHeaderCell>
                <TableHeaderCell>Score</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradesQuery.data.content.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.id}</TableCell>
                  <TableCell>{grade.studentId ?? '—'}</TableCell>
                  <TableCell>{grade.lessonId ?? '—'}</TableCell>
                  <TableCell>{grade.score ?? '—'}</TableCell>
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
