import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: connect to password recovery endpoint when available
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">{t('auth.forgotTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('auth.forgotDescription')}</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label={t('common.email')}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {t('common.submit')}
          </Button>
        </form>
        {submitted && (
          <p className="mt-4 text-sm text-green-600">
            {/* TODO: replace with response message */}
            {t('common.loading')}
          </p>
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
