import { Link } from "react-router-dom";
import type { Movie } from "../../data/movies/types";
import { Icon } from "../Icon/Icon";
import { getRatingTone } from "../../utils/rating";

type SearchResultProps = {
  movie: Movie;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
};

export function SearchResult({ movie, active, onHover, onSelect }: SearchResultProps) {
  return (
    <Link
      className={`search__result${active ? " search__result--active" : ""}`}
      to={`/movie/${movie.id}`}
      onMouseEnter={onHover}
      onClick={onSelect}
    >
      <picture className="search__poster">
        {movie.posterWebp && <source type="image/webp" srcSet={movie.posterWebp} />}
        <img src={movie.poster} alt="" width="44" height="66" loading="lazy" />
      </picture>
      <span className="search__details">
        <span className="search__meta">
          <span className={`search__rating search__rating--${getRatingTone(movie.rating)}`}>
            <Icon name="icon-star" width={12} height={12} />
            {movie.rating}
          </span>
          <span>{movie.year || "—"}</span>
          <span>{movie.genreTitle}</span>
          <span>{movie.duration}</span>
        </span>
        <span className="search__title">{movie.title}</span>
      </span>
    </Link>
  );
}
