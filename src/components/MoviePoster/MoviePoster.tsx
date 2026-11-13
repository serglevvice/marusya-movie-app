import { useState } from "react";
import type { Movie } from "../../data/movies/types";
import missingPoster from "../../assets/images/no-poster.svg";

type MoviePosterProps = {
  movie: Movie;
  className: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  onUnavailable?: (id: number) => void;
};

export function MoviePoster(props: MoviePosterProps) {
  return <PosterImage key={`${props.movie.id}:${props.movie.poster}`} {...props} />;
}

function PosterImage({ movie, className, width = 224, height = 336, loading = "lazy", fetchPriority, onUnavailable }: MoviePosterProps) {
  const [attempt, setAttempt] = useState(0);

  const alternative = movie.backdropUrl && movie.backdropUrl !== movie.poster
    ? movie.backdropUrl : missingPoster;
  const image = attempt === 0 ? movie.poster : attempt === 1 ? alternative : missingPoster;

  return (
    <picture className="movie-card__picture">
      {attempt === 0 && movie.posterWebp && <source type="image/webp" srcSet={movie.posterWebp} />}
      <img
        className={className}
        src={image}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        alt={movie.alt}
        onError={() => {
          if (attempt >= 1 || alternative === missingPoster) onUnavailable?.(movie.id);
          setAttempt((current) => Math.min(current + 1, 2));
        }}
      />
    </picture>
  );
}
