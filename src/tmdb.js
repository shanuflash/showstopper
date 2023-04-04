import { MovieDb } from "moviedb-promise";
export default new MovieDb(import.meta.env.VITE_TMDB_KEY);
