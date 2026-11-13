import { createContext } from "react";
import type { Movie } from "../data/movies/types";

export type FavoritesContextValue = {
  favorites: Movie[];
  favoriteIds: number[];
  loading: boolean;
  busy: boolean;
  error: string | null;
  isFavorite: (movie: Movie) => boolean;
  toggleFavorite: (movie: Movie) => Promise<void>;
  refresh: () => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
