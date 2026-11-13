import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout/MainLayout";

import { HomePage } from "../pages/HomePage/HomePage";
import { GenrePage } from "../pages/GenrePage/GenrePage";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { GenreMoviesPage } from "../pages/GenreMoviesPage/GenreMoviesPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/genres",
        element: <GenrePage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
      {
        path: "/genres/:genre",
        element: <GenreMoviesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
