import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../../services/api/reports';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';

export const ReportsPage = () => {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState<string | null>(null);

  const reportsQuery = useQuery({
    queryKey: ['reports', 'list'],
    queryFn: () => reportsApi.list({ size: 50 }),
  });

  const handleExport = async (reportId: string) => {
    try {
      setDownloading(reportId);
      const blob = await reportsApi.export(reportId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.reports')}</h1>
      <div>
        {reportsQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : reportsQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell className="text-center">Export</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportsQuery.data.content.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.description ?? '—'}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      onClick={() => handleExport(report.id)}
                      disabled={downloading === report.id}
                    >
                      {downloading === report.id ? t('common.loading') : 'PDF'}
                    </Button>
                  </TableCell>
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
