import { apiRequest } from "./apiClient";
import { resolveSearchTitle } from "./movieLocalization";
import { normalizeFilm, normalizeList, type ApiFilm } from "./movieAdapter";
import type { Movie } from "../data/movies/types";

export { normalizeFilm, findApiGenre, genreLabels } from "./movieAdapter";

export async function getMovieById(id: number): Promise<Movie> {
  return normalizeFilm(await apiRequest<ApiFilm>(`/movie/${id}`));
}

export async function getRandomMovie(): Promise<Movie> {
  return normalizeFilm(await apiRequest<ApiFilm>("/movie/random"));
}

export async function getTopMovies(): Promise<Movie[]> {
  return normalizeList(await apiRequest<unknown>("/movie/top10"));
}

export async function getMovieGenres(): Promise<string[]> {
  const response = await apiRequest<unknown>("/movie/genres");
  return Array.isArray(response) ? response.filter((s): s is string => typeof s === "string") : [];
}

type MovieQuery = { title?: string; genre?: string; page?: number; count?: number };
export async function getMovies(query: MovieQuery): Promise<Movie[]> {
  const params = new URLSearchParams();
  if (query.title) params.set("title", resolveSearchTitle(query.title));
  if (query.genre) params.set("genre", query.genre);
  if (query.page) params.set("page", String(query.page));
  if (query.count) params.set("count", String(query.count));
  if (query.genre) { params.set("sortBy", "imdbRating"); params.set("sortOrder", "desc"); }
  const suffix = params.size ? `?${params}` : "";
  return normalizeList(await apiRequest<unknown>(`/movie${suffix}`));
}
