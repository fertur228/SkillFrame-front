import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { lessonsApi } from '../../services/api/lessons';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';

export const LessonsPage = () => {
  const { t } = useTranslation();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const lessonsQuery = useQuery({
    queryKey: ['lessons', 'list'],
    queryFn: () => lessonsApi.list({ size: 50 }),
  });

  const selectedLesson = lessonsQuery.data?.content.find((lesson) => lesson.id === selectedLessonId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">{t('navigation.lessons')}</h1>
      <div>
        {lessonsQuery.isLoading ? (
          <p>{t('common.loading')}</p>
        ) : lessonsQuery.data?.content?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Subject</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonsQuery.data.content.map((lesson) => (
                <TableRow key={lesson.id} onClick={() => setSelectedLessonId(lesson.id)} className="cursor-pointer">
                  <TableCell>{lesson.id}</TableCell>
                  <TableCell>{lesson.subject ?? lesson.title ?? '—'}</TableCell>
                  <TableCell>{lesson.description ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-slate-500">{t('common.noData')}</p>
        )}
      </div>
      <Modal open={Boolean(selectedLesson)} title={selectedLesson?.subject ?? 'Lesson details'} onClose={() => setSelectedLessonId(null)}>
        <div className="space-y-2 text-sm text-slate-700">
          <p><strong>ID:</strong> {selectedLesson?.id}</p>
          <p><strong>Subject:</strong> {selectedLesson?.subject ?? '—'}</p>
          <p><strong>Description:</strong> {selectedLesson?.description ?? '—'}</p>
        </div>
      </Modal>
    </div>
  );
};
