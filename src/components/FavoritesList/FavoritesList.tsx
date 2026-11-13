import { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";
import "../../pages/FavoritesPage/FavoritesPage.scss";

const PAGE_SIZE = 10;

export function FavoritesList() {
  const { favorites, loading, error, busy, toggleFavorite } = useFavorites();

  const [removeError, setRemoveError] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  async function removeMovie(movie: (typeof favorites)[number]) {
    setRemoveError("");
    setRemovingId(movie.id);

    try {
      await toggleFavorite(movie);
    } catch (cause) {
      setRemoveError(
        cause instanceof Error ? cause.message : "Не удалось удалить фильм.",
      );
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <>
      {loading && <p role="status">Загружаем избранное…</p>}

      {error && (
        <p role="alert" className="favorites-page__error">
          {error}
        </p>
      )}

      {removeError && (
        <p role="alert" className="favorites-page__error">
          {removeError}
        </p>
      )}

      {!loading && !error && favorites.length === 0 && (
        <p className="favorites-page__empty">Пока нет избранных фильмов.</p>
      )}

      {favorites.length > 0 && (
        <ul className="favorites-page__list">
          {favorites.map((movie, index) => (
            <li
              className={`favorites-page__item${
                index >= visibleCount ? " favorites-page__item--extra" : ""
              }`}
              key={movie.id}
            >
              <MovieCard movie={movie} priority={index === 0} />

              <button
                className="favorites-page__remove"
                type="button"
                aria-label={`Удалить «${movie.title}» из избранного`}
                title="Удалить из избранного"
                disabled={busy || removingId === movie.id}
                onClick={() => void removeMovie(movie)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {favorites.length > visibleCount && (
        <button
          type="button"
          className="favorites-page__more"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Показать ещё
        </button>
      )}
    </>
  );
}
