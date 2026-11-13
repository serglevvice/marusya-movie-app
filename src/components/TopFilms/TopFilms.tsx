import { useEffect, useMemo, useState } from "react";
import "./TopFilms.scss";
import { Link } from "react-router-dom";
import { getMovies, getTopMovies } from "../../api/moviesApi";
import type { Movie } from "../../data/movies/types";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import missingPoster from "../../assets/images/no-poster.svg";

type TopFilmsProps = { className?: string };

const TOP_COUNT = 10;

function getRating(movie: Movie): number {
  return Number(movie.rating.replace(",", "."));
}

function eligible(movie: Movie): boolean {
  const rating = getRating(movie);

  return Number.isFinite(rating) && rating > 0 && rating < 9.95
    && (movie.poster !== missingPoster || Boolean(movie.backdropUrl));
}

async function loadTopSelection(): Promise<Movie[]> {
  const top = await getTopMovies();
  const usableTop = top.filter(eligible);
  const extra: Movie[] = usableTop.length < TOP_COUNT
    ? await getMovies({ page: 1, count: 80 }).catch(() => [])
    : [];

  const distinct = new Map<number, Movie>();
  [...usableTop, ...extra].filter(eligible).forEach((movie) => {
    distinct.set(movie.id, movie);
  });
  return [...distinct.values()].sort((a, b) => getRating(b) - getRating(a));
}

export function TopFilms({ className = "" }: TopFilmsProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const ranked = await loadTopSelection();
        if (active) setMovies(ranked);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Ошибка загрузки топа");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  const visible = useMemo(
    () => movies.filter((movie) => !failed.includes(movie.id)).slice(0, TOP_COUNT),
    [movies, failed],
  );

  return (
    <section className={`top-films ${className}`}>
      <div className="top-films__container">
        <h2 className="top-films__title">Топ 10 фильмов</h2>
        {loading && (
          <p className="visually-hidden" role="status">Загружаем рейтинг…</p>
        )}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && visible.length === 0 && <p>Фильмы не найдены.</p>}
        <ul className="top-films__list">
          {loading && Array.from({ length: TOP_COUNT }, (_, index) => (
            <li className="top-films__item top-films__item--loading" key={`placeholder-${index}`} aria-hidden="true">
              <span className="top-films__skeleton-card" />
            </li>
          ))}
          {visible.map((movie, index) => (
            <li className="top-films__item" key={movie.id}>
              <Link className="top-films__card movie-card" to={`/movie/${movie.id}`} aria-label={movie.title}>
                <span className="movie-card__position">{index + 1}</span>
                <MoviePoster
                  movie={movie}
                  className="movie-card__image"
                  onUnavailable={(id) => {
                    setFailed((current) => current.includes(id) ? current : [...current, id]);
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
