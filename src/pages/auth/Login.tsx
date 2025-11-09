import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../services/api/auth';
import { useAuthStore } from '../../app/store/auth.store';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { usersApi } from '../../services/api/users';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const loginResponse = await authApi.login({ username, password });
      setTokens({ accessToken: loginResponse.accessToken, refreshToken: loginResponse.refreshToken });
      const profile = await usersApi.me();
      setUser(profile);
    },
    onSuccess: () => {
      const redirectTo = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    },
    onError: (mutationError: unknown) => {
      console.error('Login error', mutationError);
      const message = mutationError instanceof Error ? mutationError.message : 'Unknown error';
      setError(`${t('common.login')}: ${message}`);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    loginMutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">{t('auth.title')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('auth.loginSubtitle')}</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label={t('common.email')}
            type="email"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <Input
            label={t('common.password')}
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? t('common.loading') : t('common.login')}
          </Button>
        </form>
        <div className="mt-4 text-right text-sm">
          <Link to="/forgot" className="text-primary hover:underline">
            {t('auth.forgotLink')}
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">{t('auth.noAccount')}</p>
      </div>
    </div>
  );
};
