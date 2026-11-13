import { useContext } from "react";
import { AuthContext } from "../context/authState";
import type { AuthContextValue } from "../context/authState";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth должен использоваться внутри AuthProvider");
  return context;
}
