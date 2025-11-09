import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: integrate with password reset endpoint using token
    setConfirmed(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">{t('auth.resetTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('auth.resetDescription')}</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label={t('common.password')}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {!token && <p className="text-xs text-red-600">Reset token is missing.</p>}
          <Button type="submit" className="w-full" disabled={!token}>
            {t('common.submit')}
          </Button>
        </form>
        {confirmed && (
          <p className="mt-4 text-sm text-green-600">{t('common.loading')}</p>
        )}
        <div className="mt-6 text-sm">
          <Link to="/login" className="text-primary hover:underline">
            {t('common.login')}
          </Link>
        </div>
      </div>
    </div>
  );
};
