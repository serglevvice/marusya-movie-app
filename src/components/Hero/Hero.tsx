import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { FavoriteHeart } from "../FavoriteHeart/FavoriteHeart";
import { getRandomMovie } from "../../api/moviesApi";
import type { Movie } from "../../data/movies/types";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import { LoginModal } from "../LoginModal/LoginModal";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { getTrailerSource } from "../TrailerModal/trailerUrls";
import { getRatingTone } from "../../utils/rating";
import "./Hero.scss";

type HeroProps = { className?: string };

export function Hero({ className = "" }: HeroProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, busy } = useFavorites();

  const refreshMovie = async () => {
    setLoading(true);
    setError("");
    try {
      setMovie(await getRandomMovie());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Не удалось загрузить фильм");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getRandomMovie()
      .then((value) => {
        if (active) setMovie(value);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleFavorite = async () => {
    if (!movie) return;
    if (!user) {
      setLoginOpen(true);
      return;
    }
    try {
      await toggleFavorite(movie);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Не удалось сохранить фильм");
    }
  };
  const trailerSource = getTrailerSource(movie?.trailerUrl);
  const image = movie?.previews[0]?.image ?? movie?.poster;
  const webp = movie?.previews.length ? movie.previews[0]?.imageWebp : movie?.posterWebp;

  return (
    <section className={`hero ${className}`}>
      {loading && !movie && (
        <>
          <p className="visually-hidden" role="status">Подбираем случайный фильм…</p>
          <div className="hero__content hero__content--loading" aria-hidden="true">
            <div className="hero__info hero__skeleton-info">
              <span className="hero__skeleton-line hero__skeleton-line--meta" />
              <span className="hero__skeleton-line hero__skeleton-line--title" />
              <span className="hero__skeleton-line hero__skeleton-line--text" />
              <span className="hero__skeleton-line hero__skeleton-line--text-short" />
              <span className="hero__skeleton-line hero__skeleton-line--actions" />
            </div>
            <div className="hero__picture hero__skeleton-image" />
          </div>
        </>
      )}
      {error && <p role="alert">{error} <button type="button" onClick={refreshMovie}>Повторить</button></p>}
      {movie && (
        <div className="hero__content">
          <div className="hero__info">
            <div className="hero__meta">
              <div className={`hero__rating hero__rating--${getRatingTone(movie.rating)}`}>
                <Icon name="icon-star" className="hero__rating-icon" width={16} height={16}/>
                <span>{movie.rating}</span>
              </div>
              <div className="hero__meta-list">
                <span className="hero__meta-item">{movie.year || "—"}</span>
                <span className="hero__meta-item">{movie.genreTitle}</span>
                <span className="hero__meta-item">{movie.duration}</span>
              </div>
            </div>
            <div className="hero__text">
              <h1 className="hero__title">{movie.title}</h1>
              <p className="hero__description">{movie.description}</p>
            </div>
            <div className="hero__actions">
              <button className="hero__button hero__button--primary" type="button"
                disabled={!trailerSource} onClick={() => setTrailerOpen(true)}>Трейлер</button>
              <Link className="hero__button hero__button--secondary" to={`/movie/${movie.id}`}>О фильме</Link>
              <button className="hero__button hero__button--icon hero__button--favorite" type="button" onClick={handleFavorite}
                disabled={busy} aria-pressed={isFavorite(movie)}
                aria-label={isFavorite(movie) ? "Убрать из избранного" : "В избранное"}>
                <FavoriteHeart className="hero__icon" />
              </button>
              <button className="hero__button hero__button--icon" type="button" onClick={refreshMovie}
                disabled={loading} aria-label="Другой случайный фильм">
                <Icon name="icon-repeat" className="hero__icon" width={24} height={24}/>
              </button>
            </div>
          </div>
          <picture className="hero__picture">
            {webp && <source type="image/webp" srcSet={webp}/>}
            <img className="hero__image" src={image} width="680" height="552" loading="eager" fetchPriority="high" alt={movie.alt}/>
          </picture>
        </div>
      )}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)}/>}
      {trailerOpen && trailerSource && movie && <TrailerModal title={movie.title} source={trailerSource}
        onClose={() => setTrailerOpen(false)}/>}
    </section>
  );
}
