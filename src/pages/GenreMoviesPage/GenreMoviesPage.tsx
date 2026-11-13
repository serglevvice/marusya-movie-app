import { Icon } from "../../components/Icon/Icon";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMovieGenres,
  findApiGenre,
  getMovies,
  genreLabels,
} from "../../api/moviesApi";
import type { Movie, MovieGenre } from "../../data/movies/types";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import "./GenreMoviesPage.scss";

const PAGE_SIZE = 10;

type GenreSnapshot = {
  apiGenre: string;
  movies: Movie[];
  page: number;
  hasMore: boolean;
  scrollY: number;
};

// Kept only while this SPA tab is open. Returning from a film doesn't refetch old pages.
const genreSnapshots = new Map<MovieGenre, GenreSnapshot>();

export function GenreMoviesPage() {
  const { genre } = useParams();
  const slug = genre as MovieGenre;

  return <GenreMoviesContent key={slug} slug={slug} />;
}

function GenreMoviesContent({ slug }: { slug: MovieGenre }) {
  const [restored] = useState<GenreSnapshot | null>(() => genreSnapshots.get(slug) ?? null);
  const [apiGenre, setApiGenre] = useState<string | null>(restored?.apiGenre ?? null);
  const [movies, setMovies] = useState<Movie[]>(restored?.movies ?? []);
  const [page, setPage] = useState(restored?.page ?? 1);
  const [hasMore, setHasMore] = useState(restored?.hasMore ?? true);
  const [loading, setLoading] = useState(!restored);
  const [error, setError] = useState("");
  const lastLoadedPage = useRef(restored?.page ?? 0);

  const knownGenre = Object.prototype.hasOwnProperty.call(genreLabels, slug);

  // Restore scroll after the cached posters have been rendered, not before.
  useLayoutEffect(() => {
    if (!restored) return;

    const scrollY = restored.scrollY;
    window.scrollTo(0, scrollY);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, scrollY));
    return () => window.cancelAnimationFrame(frame);
  }, [restored]);

  useEffect(() => {
    let active = true;
    if (!knownGenre || restored) return;

    getMovieGenres()
      .then((items) => {
        if (!active) return;

        const found = findApiGenre(items, slug);
        setApiGenre(found ?? null);
        if (!found) setLoading(false);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Ошибка загрузки жанров");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [slug, knownGenre, restored]);

  useEffect(() => {
    if (!apiGenre || !hasMore || page <= lastLoadedPage.current) return;

    let active = true;

    getMovies({ genre: apiGenre, count: PAGE_SIZE, page })
      .then((result) => {
        if (!active) return;

        setMovies((before) => [
          ...new Map([...before, ...result].map((m) => [m.id, m])).values(),
        ]);

        lastLoadedPage.current = page;
        setHasMore(result.length === PAGE_SIZE);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Ошибка загрузки фильмов");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [apiGenre, page, hasMore]);

  const saveListPosition = () => {
    if (!apiGenre || movies.length === 0) return;

    genreSnapshots.set(slug, {
      apiGenre,
      movies,
      // If a newer page is still loading, don't mark it as already fetched.
      page: lastLoadedPage.current,
      hasMore,
      scrollY: window.scrollY,
    });
  };

  return (
    <div className="genre-movies-page">
      <div className="genre-movies-page__heading">
        <Link
          className="genre-movies-page__back"
          to="/genres"
          aria-label="Вернуться к жанрам"
        >
          <Icon name="icon-arrow-back" width={40} height={40} />
        </Link>

        <h1 className="genre-movies-page__title">
          {genreLabels[slug] ?? "Жанр"}
        </h1>
      </div>

      {!loading && !error && !apiGenre && (
        <p>Такого жанра пока нет в каталоге CinemaGuide.</p>
      )}

      {!knownGenre && <p role="alert">Жанр не найден.</p>}

      {error && (
        <p role="alert">
          {error}{" "}
          <button type="button" onClick={() => window.location.reload()}>
            Повторить
          </button>
        </p>
      )}

      <ul className="genre-movies-page__list" aria-busy={loading}>
        {loading && movies.length === 0 && knownGenre &&
          Array.from({ length: PAGE_SIZE }, (_, index) => (
            <li
              className="genre-movies-page__item"
              key={`skeleton-${index}`}
              aria-hidden="true"
            >
              <span className="genre-movies-page__skeleton-poster" />
            </li>
          ))}
        {movies.map((movie, index) => (
          <li
            className="genre-movies-page__item"
            key={movie.id}
            onClickCapture={(event) => {
              // Only save on movie navigation, not on clicks in empty grid space.
              if (event.target instanceof Element && event.target.closest("a.movie-card")) {
                saveListPosition();
              }
            }}
          >
            <MovieCard movie={movie} priority={index === 0} />
          </li>
        ))}
      </ul>

      {loading && knownGenre && (
        <p className="visually-hidden" role="status">Загружаем фильмы…</p>
      )}
      {loading && movies.length === 0 && knownGenre && (
        <div className="genre-movies-page__loading-action" aria-hidden="true" />
      )}

      {!loading && !error && apiGenre && movies.length === 0 && (
        <p>Фильмов пока нет.</p>
      )}

      {!loading && !error && hasMore && apiGenre && (
        <button
          className="genre-movies-page__more"
          type="button"
          onClick={() => {
            setLoading(true);
            setPage((x) => x + 1);
          }}
        >
          Показать ещё
        </button>
      )}
    </div>
  );
}
