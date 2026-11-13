import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { FavoritesContext } from "./favoritesState";
import { useAuth } from "../hooks/useAuth";
import type { Movie } from "../data/movies/types";
import { addServerFavorite, getServerFavorites, removeServerFavorite } from "../api/favoritesApi";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return <FavoritesSession key={user?.email ?? "guest"} email={user?.email}>
    {children}
  </FavoritesSession>;
}

function FavoritesSession({ children, email }: { children: ReactNode; email?: string }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(Boolean(email));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!email) { setFavorites([]); return; }
    setFavorites(await getServerFavorites());
  }, [email]);

  useEffect(() => {
    let active = true;
    if (!email) return;
    getServerFavorites()
      .then((list) => { if (active) setFavorites(list); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Не удалось получить избранное.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [email]);

  const favoriteIds = useMemo(() => favorites.map((movie) => movie.id), [favorites]);
  const isFavorite = useCallback(
    (movie: Movie) => movie.source === "api" && favoriteIds.includes(movie.id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(async (movie: Movie) => {
    if (!email || busy) return;
    if (movie.source !== "api") throw new Error("Сохранить можно только фильм из CinemaGuide.");

    const wasFavorite = favoriteIds.includes(movie.id);
    const previous = favorites;
    setBusy(true);
    setError(null);

    setFavorites((current) => wasFavorite
      ? current.filter((item) => item.id !== movie.id)
      : current.some((item) => item.id === movie.id) ? current : [...current, movie],
    );

    try {
      if (wasFavorite) await removeServerFavorite(movie.id);
      else await addServerFavorite(movie.id);

    } catch (cause) {
      setFavorites(previous);
      const message = cause instanceof Error ? cause.message : "Не удалось обновить избранное.";
      setError(message);
      throw cause;
    } finally {
      setBusy(false);
    }
  }, [email, busy, favoriteIds, favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteIds, loading, busy, error, isFavorite, toggleFavorite, refresh }}>
      {children}
    </FavoritesContext.Provider>
  );
}
