import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  roles: string[];
  orgId?: string;
}

interface AuthState {
  tokens?: AuthTokens;
  user?: AuthUser;
  setTokens: (tokens?: AuthTokens) => void;
  setUser: (user?: AuthUser) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
  hasRole: (roles: string | string[]) => boolean;
}

const initialState = {
  tokens: undefined,
  user: undefined,
};

const normalizeRole = (role: string) => role.replace(/^ROLE_/i, '').toUpperCase();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setTokens: (tokens) => set({ tokens }),
      setUser: (user) => set({ user }),
      clear: () => set(initialState),
      isAuthenticated: () => Boolean(get().tokens?.accessToken),
      hasRole: (roles) => {
        const currentRoles = get().user?.roles ?? [];
        const normalized = currentRoles.map(normalizeRole);
        const requiredRoles = Array.isArray(roles) ? roles : [roles];
        if (!requiredRoles.length) {
          return true;
        }
        return requiredRoles.some((role) => normalized.includes(normalizeRole(role)));
      },
    }),
    {
      name: 'skillframe-auth',
      partialize: ({ tokens, user }) => ({ tokens, user }),
    }
  )
);
