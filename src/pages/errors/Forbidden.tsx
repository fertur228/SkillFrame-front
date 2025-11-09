import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6 text-center">
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <p className="mt-4 text-lg font-semibold text-slate-900">{t('errors.forbidden')}</p>
        <p className="mt-2 text-sm text-slate-500">{t('common.comingSoon')}</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-blue-600"
        >
          {t('navigation.dashboard')}
        </Link>
      </div>
    </div>
  );
};
