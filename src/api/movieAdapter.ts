import { movies as localMovies } from "../data/movies";
import type { Movie, MovieGenre } from "../data/movies/types";
import missingPoster from "../assets/images/no-poster.svg";
import { getLocalizedFilm, translateGenre } from "./movieLocalization";

export type ApiFilm = {
  id: number | string;
  title?: string;
  originalTitle?: string;
  imdbRating?: number | string | null;
  tmdbRating?: number | string | null;
  posterUrl?: string | null;
  backdropUrl?: string | null;
  plot?: string | null;
  genres?: string[];
  releaseYear?: number | null;
  releaseDate?: string | null;
  runtime?: number | null;
  trailerYouTubeId?: string | null;
  language?: string | null;
  budget?: string | number | null;
  revenue?: string | number | null;
  director?: string | null;
  production?: string | null;
  awards?: string | null;
};

const genreAliases: Record<MovieGenre, string[]> = {
  drama: ["драма", "drama"],
  comedy: ["комедия", "comedy"],
  detective: ["детектив", "mystery", "detective", "криминал"],
  family: ["семейный", "семейное", "family"],
  history: ["история", "исторический", "историческое", "history"],
  thriller: ["триллер", "thriller"],
  fantastic: ["фантастика", "научная фантастика", "science fiction", "sci-fi", "fantasy", "фэнтези", "science-fiction", "sci fi"],
  adventures: ["приключения", "приключение", "adventure"],
};

export const genreLabels: Record<MovieGenre, string> = {
  drama: "Драма", comedy: "Комедия", detective: "Детектив", family: "Семейное",
  history: "Историческое", thriller: "Триллер", fantastic: "Фантастика", adventures: "Приключения",
};

const clean = (value: string) => value.toLocaleLowerCase("ru").replace(/ё/g, "е").trim();

const LANGUAGE_LABELS: Record<string, string> = {
  en: "Английский", ru: "Русский", fr: "Французский", de: "Немецкий",
  es: "Испанский", ja: "Японский", ko: "Корейский", zh: "Китайский",
  hi: "Хинди", it: "Итальянский", tr: "Турецкий", pt: "Португальский",
  nl: "Нидерландский", ar: "Арабский", pl: "Польский", sv: "Шведский",
  uk: "Украинский", fa: "Персидский", id: "Индонезийский", th: "Тайский",
  vi: "Вьетнамский", el: "Греческий", he: "Иврит", fi: "Финский",
  da: "Датский", no: "Норвежский", cs: "Чешский", hu: "Венгерский",
  ro: "Румынский", sr: "Сербский", bn: "Бенгальский", ms: "Малайский",
};

const localMoviesByYearAndTitle = new Map<string, Movie>();
for (const movie of localMovies) {
  const key = `${movie.year}:${clean(movie.title)}`;
  if (!localMoviesByYearAndTitle.has(key)) localMoviesByYearAndTitle.set(key, movie);
}

export function findApiGenre(genres: string[], slug: MovieGenre): string | undefined {
  const aliases = genreAliases[slug].map(clean);
  return genres.find((genre) => aliases.includes(clean(genre)));
}

function findLocalCopy(film: ApiFilm): Movie | undefined {
  const year = film.releaseYear ?? (film.releaseDate ? Number(film.releaseDate.slice(0, 4)) : 0);
  const title = film.title ?? film.originalTitle ?? "";
  const russianTitle = getLocalizedFilm(title)?.title;
  return localMoviesByYearAndTitle.get(`${year}:${clean(title)}`)
    ?? (russianTitle ? localMoviesByYearAndTitle.get(`${year}:${clean(russianTitle)}`) : undefined);
}

function detailText(value: string | number | null | undefined): string | undefined {
  return value === null || value === undefined || value === "" ? undefined : String(value);
}

function languageInRussian(language: string | null | undefined): string | undefined {
  if (!language) return undefined;

  const code = language.trim().toLowerCase().split(/[-_]/)[0];
  return LANGUAGE_LABELS[code] ?? language;
}

function duration(minutes: number | null | undefined): string {
  if (!minutes || minutes < 1) return "Время не указано";
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} ч ${minutes % 60} мин` : `${minutes} мин`;
}

export function normalizeFilm(film: ApiFilm): Movie {
  const id = Number(film.id);
  if (!Number.isSafeInteger(id)) throw new Error("CinemaGuide вернул некорректный ID фильма");
  const originalTitle = film.title || film.originalTitle || "Без названия";
  const localized = getLocalizedFilm(originalTitle);
  const local = findLocalCopy(film);
  const title = local?.title ?? localized?.title ?? originalTitle;
  const description = local?.description ?? localized?.description ?? film.plot ?? "Описание пока отсутствует.";
  const genres = Array.isArray(film.genres) ? film.genres : [];
  const category = (Object.keys(genreAliases) as MovieGenre[])
    .find((slug) => Boolean(findApiGenre(genres, slug))) ?? "drama";
  const year = film.releaseYear ?? (film.releaseDate ? Number(film.releaseDate.slice(0, 4)) : 0);
  const rating = Number(film.imdbRating ?? film.tmdbRating ?? 0);
  const poster = local?.poster || film.posterUrl || film.backdropUrl || missingPoster;
  const posterWebp = local?.posterWebp || "";

  const images = [] as Movie["previews"];
  if (film.backdropUrl) {
    images.push({ image: film.backdropUrl, alt: `Кадр фильма «${title}»` });
  }
  if (film.posterUrl && film.posterUrl !== film.backdropUrl && !local) {
    images.push({ image: film.posterUrl, alt: `Постер фильма «${title}»`, kind: "poster" });
  }
  if (!images.length) images.push({ image: poster, imageWebp: posterWebp, alt: `Изображение фильма «${title}»` });

  return {
    id,
    source: "api",
    title,
    genre: category,
    genreTitle: genres.map(translateGenre).join(", ") || genreLabels[category],
    year: Number.isFinite(year) ? year : 0,
    duration: duration(film.runtime),
    rating: rating > 0 ? rating.toFixed(1).replace(".", ",") : "—",
    description,
    poster,
    posterWebp,
    backdropUrl: film.backdropUrl || undefined,
    details: {
      originalLanguage: languageInRussian(film.language),
      budget: detailText(film.budget),
      revenue: detailText(film.revenue),
      director: detailText(film.director),
      production: detailText(film.production),
      awards: detailText(film.awards),
    },
    previews: local?.previews?.length ? local.previews : images,
    trailerUrl: film.trailerYouTubeId ? `https://www.youtube.com/watch?v=${film.trailerYouTubeId}` : (local?.trailerUrl || ""),
    alt: `Постер фильма «${title}»`,
  };
}

export function normalizeList(payload: unknown): Movie[] {
  const list = Array.isArray(payload) ? payload :
    payload && typeof payload === "object" && "items" in payload && Array.isArray(payload.items)
      ? payload.items : [];
  return list.filter((film): film is ApiFilm => film !== null && typeof film === "object" && "id" in film)
    .map(normalizeFilm);
}

