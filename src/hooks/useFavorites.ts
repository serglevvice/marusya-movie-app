import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesState";
import type { FavoritesContextValue } from "../context/favoritesState";

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("FavoritesProvider отсутствует в дереве компонентов");
  return context;
}
