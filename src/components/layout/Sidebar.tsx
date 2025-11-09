import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../app/store/auth.store';
import { clsx } from 'clsx';

const links = [
  { to: '/dashboard', labelKey: 'navigation.dashboard', roles: [] },
  { to: '/schedule', labelKey: 'navigation.schedule', roles: [] },
  { to: '/attendance', labelKey: 'navigation.attendance', roles: ['TEACHER', 'STAFF'] },
  { to: '/lessons', labelKey: 'navigation.lessons', roles: ['TEACHER'] },
  { to: '/grades', labelKey: 'navigation.grades', roles: ['TEACHER', 'STUDENT'] },
  { to: '/users', labelKey: 'navigation.users', roles: ['ADMIN'] },
  { to: '/reports', labelKey: 'navigation.reports', roles: ['ADMIN', 'STAFF'] },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();
  const hasRole = useAuthStore((state) => state.hasRole);

  const isAllowed = (requiredRoles: string[]) => {
    if (requiredRoles.length === 0) {
      return true;
    }
    return hasRole(requiredRoles);
  };

  return (
    <aside className={clsx('bg-secondary text-secondary-foreground w-64 h-full flex flex-col shadow-xl', className)}>
      <div className="p-6 text-2xl font-semibold">SkillFrame</div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {links.filter((link) => isAllowed(link.roles)).map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-white/10 hover:text-white'
                  )
                }
              >
                {t(link.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
