import { Link } from "react-router-dom";
import type { Movie } from "../../data/movies/types";
import { MoviePoster } from "../MoviePoster/MoviePoster";

type MovieCardProps = { movie: Movie; priority?: boolean };

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  return (
    <Link className="movie-card" to={`/movie/${movie.id}`} aria-label={movie.title}>
      <MoviePoster
        movie={movie}
        className="movie-card__image"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </Link>
  );
}
