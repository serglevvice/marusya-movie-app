import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authState";
import type { LoginDetails, RegistrationDetails } from "./authState";
import { ApiError } from "../api/apiClient";
import {
  getProfile, loginRequest, logoutRequest, registerRequest,
  type UserProfile,
} from "../api/authApi";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getProfile()
      .then((profile) => {
        if (active) setUser(profile);
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (!(error instanceof ApiError) || (error.status !== 401 && error.status !== 403)) {
          setSessionError("Не удалось проверить сессию. Попробуйте обновить страницу.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const login = async (details: LoginDetails) => {
    await loginRequest(details);
    const profile = await getProfile();
    setUser(profile);
    setSessionError(null);
  };

  const register = async (details: RegistrationDetails) => {
    await registerRequest(details);
    setSessionError(null);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setSessionError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, sessionError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
