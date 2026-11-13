import "./GenrePage.scss";
import { genres } from "../../data/genres";
import { Link } from "react-router-dom";

export function GenrePage() {
  return (
    <section className="genre-page">
      <h1 className="genre-page__title">Жанры фильмов</h1>

      <ul className="genre-page__list">
        {genres.map((genre, index) => (
          <li className="genre-page__item" key={genre.id}>
            <Link className="genre-card" to={`/genres/${genre.slug}`}>
              <picture className="genre-card__picture">
                <source
                  type="image/webp"
                  srcSet={`${genre.imageWebp} 1x, ${genre.imageWebp2x} 2x`}
                />

                <img
                  className="genre-card__image"
                  src={genre.image}
                  srcSet={`${genre.image2x} 2x`}
                  width="290"
                  height="220"
                  alt={genre.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </picture>

              <div className="genre-card__content">
                <h2 className="genre-card__title">{genre.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
