import { apiRequest, ApiError } from "./apiClient";
import { getMovieById, normalizeFilm } from "./moviesApi";
import type { Movie } from "../data/movies/types";

export async function getServerFavorites(): Promise<Movie[]> {
  const payload: unknown = await apiRequest<unknown>("/favorites");
  const items = Array.isArray(payload) ? payload :
    payload && typeof payload === "object" && "favorites" in payload && Array.isArray(payload.favorites)
      ? payload.favorites : null;
  if (!items) throw new ApiError("Неожиданный ответ списка избранного", 0);

  const movies = await Promise.all(items.map(async (item: unknown) => {
    try {
      if (typeof item === "string" || typeof item === "number") {
        return await getMovieById(Number(item));
      }
      if (!item || typeof item !== "object" || !("id" in item)) return null;
      return normalizeFilm(item as Parameters<typeof normalizeFilm>[0]);
    } catch {

      return null;
    }
  }));
  return movies.filter((movie): movie is Movie => movie !== null);
}

export async function addServerFavorite(id: number): Promise<void> {

  await apiRequest<unknown>("/favorites", {
    method: "POST",
    body: new URLSearchParams({ id: String(id) }),
  });
}

export async function removeServerFavorite(id: number): Promise<void> {
  await apiRequest<unknown>(`/favorites/${id}`, { method: "DELETE" });
}
