import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/moviesApi";
import type { Movie } from "../../data/movies/types";
import { MovieHero } from "../../components/MovieHero/MovieHero";
import "./MoviePage.scss";

export function MoviePage() {
  const { id } = useParams();
  return <MoviePageContent key={id} id={id} />;
}

function MoviePageContent({ id }: { id?: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getMovieById(Number(id)).then((result) => {
      if (active) setMovie(result);
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : "Не удалось загрузить фильм");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  if (loading) {
    return (
      <section className="movie-page-loading" aria-busy="true">
        <p className="visually-hidden" role="status">Загружаем фильм…</p>
        <div className="movie-page-loading__content" aria-hidden="true">
          <div className="movie-page-loading__info">
            <span className="movie-page-loading__line movie-page-loading__line--meta" />
            <span className="movie-page-loading__line movie-page-loading__line--title" />
            <span className="movie-page-loading__line movie-page-loading__line--description" />
            <span className="movie-page-loading__line movie-page-loading__line--description-short" />
            <span className="movie-page-loading__line movie-page-loading__line--button" />
          </div>
          <div className="movie-page-loading__image" />
        </div>
        <div className="movie-page-loading__facts" aria-hidden="true">
          <span className="movie-page-loading__line movie-page-loading__line--heading" />
          <span className="movie-page-loading__line movie-page-loading__line--fact" />
          <span className="movie-page-loading__line movie-page-loading__line--fact" />
          <span className="movie-page-loading__line movie-page-loading__line--fact" />
        </div>
      </section>
    );
  }
  if (error || !movie) return <section role="alert"><p>{error || "Фильм не найден."}</p></section>;
  return <MovieHero key={movie.id} movie={movie} />;
}
