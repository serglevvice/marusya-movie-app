export type MovieGenre =
  | 'drama'
  | 'comedy'
  | 'detective'
  | 'family'
  | 'history'
  | 'thriller'
  | 'fantastic'
  | 'adventures';

export type MoviePreview = {
  image: string;
  imageWebp?: string;
  alt: string;
  kind?: "poster";
};

export type MovieDetails = {
  originalLanguage?: string;
  budget?: string;
  revenue?: string;
  director?: string;
  production?: string;
  awards?: string;
};

export type Movie = {
  id: number;
  source?: "api";
  title: string;
  genre: MovieGenre;
  genreTitle: string;
  year: number;
  duration: string;
  rating: string;
  description: string;
  poster: string;
  posterWebp: string;
  backdropUrl?: string;
  details?: MovieDetails;
  previews: MoviePreview[];
  trailerUrl: string;
  alt: string;
};
