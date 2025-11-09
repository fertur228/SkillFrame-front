import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { scheduleApi } from '../../services/api/schedule';
import { lessonsApi } from '../../services/api/lessons';

export const DashboardPage = () => {
  const { t } = useTranslation();

  const upcomingLessonsQuery = useQuery({
    queryKey: ['dashboard', 'upcoming-lessons'],
    queryFn: () => scheduleApi.list({ upcoming: true, size: 5 }),
  });

  const notificationsQuery = useQuery({
    queryKey: ['dashboard', 'notifications'],
    queryFn: () => lessonsApi.list({ highlighted: true, size: 5 }),
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-800">{t('dashboard.upcomingLessons')}</h2>
        <div className="mt-4 space-y-3">
          {upcomingLessonsQuery.isLoading && <p>{t('common.loading')}</p>}
          {upcomingLessonsQuery.data?.content?.length ? (
            upcomingLessonsQuery.data.content.map((lesson) => (
              <div key={lesson.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-medium text-slate-800">{lesson.title ?? '—'}</p>
                <p className="text-sm text-slate-500">{lesson.startTime} – {lesson.endTime}</p>
              </div>
            ))
          ) : (
            !upcomingLessonsQuery.isLoading && <p className="text-sm text-slate-500">{t('common.noData')}</p>
          )}
        </div>
      </section>
      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-800">{t('dashboard.notifications')}</h2>
        <div className="mt-4 space-y-3">
          {notificationsQuery.isLoading && <p>{t('common.loading')}</p>}
          {notificationsQuery.data?.content?.length ? (
            notificationsQuery.data.content.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-medium text-slate-800">{item.subject ?? item.title ?? '—'}</p>
                <p className="text-sm text-slate-500">{item.description ?? item.location ?? ''}</p>
              </div>
            ))
          ) : (
            !notificationsQuery.isLoading && <p className="text-sm text-slate-500">{t('common.noData')}</p>
          )}
        </div>
      </section>
    </div>
  );
};
