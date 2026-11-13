import { createContext } from "react";
import type { UserProfile, LoginDetails, RegistrationDetails } from "../api/authApi";

export type { LoginDetails, RegistrationDetails } from "../api/authApi";

export type AuthContextValue = {
  user: UserProfile | null;
  loading: boolean;
  sessionError: string | null;
  login: (details: LoginDetails) => Promise<void>;
  register: (details: RegistrationDetails) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
