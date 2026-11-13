import { useState } from "react";
import type { Movie } from "../../data/movies/types";
import { Icon } from "../Icon/Icon";
import { FavoriteHeart } from "../FavoriteHeart/FavoriteHeart";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import { LoginModal } from "../LoginModal/LoginModal";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { getTrailerSource } from "../TrailerModal/trailerUrls";
import { getRatingTone } from "../../utils/rating";
import "./MovieHero.scss";

type MovieHeroProps = {
  className?: string;
  movie: Movie;
};

export function MovieHero({ movie, className = "" }: MovieHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const trailerSource = getTrailerSource(movie.trailerUrl);
  const { isFavorite, toggleFavorite, busy, loading: favoritesLoading, error: loadError } = useFavorites();
  const movieIsFavorite = isFavorite(movie);

  const handleFavorite = async () => {
    setFavoriteError(null);
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    try {
      await toggleFavorite(movie);
    } catch (cause) {
      setFavoriteError(cause instanceof Error ? cause.message : "Не удалось обновить избранное.");
    }
  };
  const previews = movie.previews ?? [];
  const hasMultiplePreviews = previews.length > 1;

  const currentIndex = activeIndex < previews.length ? activeIndex : 0;
  const activePreview = previews[currentIndex];

  const imageJpg = activePreview?.image ?? movie.poster;
  const imageWebp = activePreview ? activePreview.imageWebp : movie.posterWebp;
  const imageAlt = activePreview?.alt ?? movie.alt;

  const facts = [
    ["Язык оригинала", movie.details?.originalLanguage],
    ["Бюджет", movie.details?.budget],
    ["Выручка", movie.details?.revenue],
    ["Режиссёр", movie.details?.director],
    ["Продакшен", movie.details?.production],
    ["Награды", movie.details?.awards],
  ];

  const switchPreview = (step: number) => {
    if (!hasMultiplePreviews) return;
    setActiveIndex((index) => (index + step + previews.length) % previews.length);
  };

  return (
    <section className={`movie-hero ${className}`}>
      <div className="movie-hero__content">
        <div className="movie-hero__info">
          <div className="movie-hero__meta">
            <div className={`movie-hero__rating movie-hero__rating--${getRatingTone(movie.rating)}`}>
              <Icon
                name="icon-star"
                className="movie-hero__rating-icon"
                width={16}
                height={16}
              />
              <span>{movie.rating}</span>
            </div>
            <div className="movie-hero__meta-list">
              <span className="movie-hero__meta-item">{movie.year}</span>
              <span className="movie-hero__meta-item">{movie.genreTitle}</span>
              <span className="movie-hero__meta-item">{movie.duration}</span>
            </div>
          </div>

          <div className="movie-hero__text">
            <h1 className="movie-hero__title">{movie.title}</h1>
            <p className="movie-hero__description">{movie.description}</p>
          </div>

          <div className="movie-hero__actions">
            <button
              className="movie-hero__button movie-hero__button--primary"
              type="button"
              disabled={!trailerSource}
              title={trailerSource ? "Посмотреть трейлер" : "Трейлер пока не добавлен"}
              onClick={() => setIsTrailerOpen(true)}
            >
              Трейлер
            </button>

            <button
              className={`movie-hero__button movie-hero__button--icon${movieIsFavorite ? " movie-hero__button--selected" : ""}`}
              type="button"
              aria-label={movieIsFavorite ? "Удалить из избранного" : "Добавить в избранное"}
              aria-pressed={movieIsFavorite}
              onClick={handleFavorite}
              disabled={busy || authLoading || (Boolean(user) && favoritesLoading)}
            >
              <FavoriteHeart className="movie-hero__icon" />
            </button>
          </div>
          {(favoriteError || loadError) && (
            <p role="alert" className="movie-hero__favorite-error" style={{ color: "#ffb4ab", marginTop: 12 }}>
              {favoriteError || loadError}
            </p>
          )}
        </div>

        <div className="movie-hero__gallery">
          <div className="movie-hero__gallery-main">
            <picture className="movie-hero__picture">
              {imageWebp && <source type="image/webp" srcSet={imageWebp} />}
              <img
                className={`movie-hero__image${activePreview?.kind === "poster" ? " movie-hero__image--poster" : ""}`}
                src={imageJpg}
                width="680"
                height="552"
                loading="eager"
                fetchPriority="high"
                alt={imageAlt}
              />
            </picture>

            {hasMultiplePreviews && (
              <>
                <button
                  className="movie-hero__gallery-nav movie-hero__gallery-nav--prev"
                  type="button"
                  onClick={() => switchPreview(-1)}
                  aria-label="Предыдущий кадр"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  className="movie-hero__gallery-nav movie-hero__gallery-nav--next"
                  type="button"
                  onClick={() => switchPreview(1)}
                  aria-label="Следующий кадр"
                >
                  <span aria-hidden="true">›</span>
                </button>
                <div className="movie-hero__gallery-counter" aria-live="polite">
                  {currentIndex + 1} / {previews.length}
                </div>
              </>
            )}
          </div>

          {hasMultiplePreviews && (
            <div className="movie-hero__thumbnails" role="group" aria-label="Кадры фильма">
              {previews.map((preview, index) => (
                <button
                  className={`movie-hero__thumbnail${currentIndex === index ? " movie-hero__thumbnail--active" : ""}`}
                  type="button"
                  key={`${movie.id}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Показать кадр ${index + 1} из ${previews.length}`}
                  aria-pressed={currentIndex === index}
                >
                  <picture>
                    {preview.imageWebp && (
                      <source type="image/webp" srcSet={preview.imageWebp} />
                    )}
                    <img src={preview.image} alt="" loading="lazy" />
                  </picture>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <section className="movie-about" aria-labelledby="movie-about-title">
        <h2 className="movie-about__title" id="movie-about-title">О фильме</h2>
        <dl className="movie-about__list">
          {facts.map(([label, value]) => (
            <div className="movie-about__row" key={label}>
              <dt className="movie-about__label">{label}</dt>
              <dd className="movie-about__value">{value || "Не указано"}</dd>
            </div>
          ))}
        </dl>
      </section>
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isTrailerOpen && trailerSource && (
        <TrailerModal
          title={movie.title}
          source={trailerSource}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </section>
  );
}
