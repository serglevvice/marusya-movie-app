import { dramaMovies } from "./drama";
import { comedyMovies } from "./comedy";
import { detectiveMovies } from "./detective";
import { familyMovies } from "./family";
import { historyMovies } from "./history";
import { thrillerMovies } from "./thriller";
import { fantasticMovies } from "./fantastic";
import { adventuresMovies } from "./adventures";
import type { Movie } from "./types";

export const movies: Movie[] = [
  ...dramaMovies,
  ...comedyMovies,
  ...detectiveMovies,
  ...familyMovies,
  ...historyMovies,
  ...thrillerMovies,
  ...fantasticMovies,
  ...adventuresMovies,
];

export type { Movie, MovieGenre, MoviePreview } from "./types";
