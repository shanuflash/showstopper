import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/home-page";
import SearchPage from "../pages/search/search-page";
import ActivityPage from "../pages/activity/activity-page";
import CategoriesPage from "../pages/categories/categories-page";
import GenrePage from "../pages/genre/genre-page";
import MovieInfoPage from "../pages/movie-info/movie-info-page";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Search", element: <SearchPage /> },
  { path: "/Activity", element: <ActivityPage /> },
  { path: "/Categories", element: <CategoriesPage /> },
  { path: "/:movieid", element: <MovieInfoPage /> },
  { path: "/genre/:genreid", element: <GenrePage /> },
]);

export default router;
