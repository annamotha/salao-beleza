import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useDataManager } from "../hooks/useDataManager";
import { TipoUsuario, Usuario } from "../types/Usuario";
import { usuariosTeste } from "../modules/Usuario/types/usuarios-test";

export type AuthContextType = {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  hasRole: (roles: TipoUsuario[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "salao_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: usuarios } = useDataManager<Usuario>({
    initialData: usuariosTeste,
    storageKey: "salao_usuarios",
  });

  const [user, setUser] = useState<Usuario | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? (JSON.parse(stored) as Usuario) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Usuario;
      const matched = usuarios.find((u) => u.email === parsed.email && u.senha === parsed.senha);
      if (matched) {
        setUser(matched);
        return;
      }
    }
    setUser(null);
  }, [usuarios]);

  const login = useCallback((email: string, senha: string) => {
    const foundUser = usuarios.find(
      (usuario) => usuario.email === email.trim() && usuario.senha === senha.trim()
    );
    if (!foundUser) {
      return false;
    }

    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return true;
  }, [usuarios]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }, []);

  const hasRole = useCallback((roles: TipoUsuario[]) => {
    if (!user) return false;
    return roles.includes(user.tipo);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      hasRole,
    }),
    [user, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
