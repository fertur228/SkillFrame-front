import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/auth.store';
import { useUiStore } from '../../app/store/ui.store';
import { authApi } from '../../services/api/auth';

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
];

export const Topbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clear);
  const setLanguage = useUiStore((state) => state.setLanguage);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout request failed', error);
    } finally {
      clearAuth();
      navigate('/login', { replace: true });
    }
  };

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLanguage(code);
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <span className="text-lg font-semibold text-slate-800">{t('common.welcome')}, {user?.fullName ?? user?.email ?? '—'}</span>
      </div>
      <div className="flex items-center gap-3">
        <select
          className="rounded-md border border-slate-300 px-3 py-1 text-sm"
          value={i18n.language}
          onChange={(event) => handleChangeLanguage(event.target.value)}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow hover:bg-blue-600"
        >
          {t('common.logout')}
        </button>
      </div>
    </header>
  );
};
