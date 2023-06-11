import { MovieDb } from "moviedb-promise";
export default new MovieDb(process.env.NEXT_PUBLIC_TMDB_KEY);
