import tmdb from "./tmdb";

export const qk = {
  trending: (type, window) => ["trending", type, window],
  popular: () => ["popular"],
  discoverMovie: (genre) => ["discover", "movie", genre],
  discoverTv: (network, genre) => ["discover", "tv", network ?? null, genre ?? null],
  genreList: (kind) => ["genres", kind],
  movieInfo: (id) => ["movie", id, "info"],
  movieCredits: (id) => ["movie", id, "credits"],
  movieSimilar: (id) => ["movie", id, "similar"],
  movieVideos: (id) => ["movie", id, "videos"],
  tvInfo: (id) => ["tv", id, "info"],
  tvCredits: (id) => ["tv", id, "credits"],
  tvSimilar: (id) => ["tv", id, "similar"],
  tvVideos: (id) => ["tv", id, "videos"],
  personInfo: (id) => ["person", id, "info"],
  search: (kind, query) => ["search", kind, query],
};

const filterBackdrop = (results) =>
  results.filter((a) => a.backdrop_path !== null);

export const qfn = {
  trending: (type, window) => () =>
    tmdb.trending({ media_type: type, time_window: window }),
  popular: () => () => tmdb.moviePopular(),
  discoverMovie: (genre) => () =>
    tmdb
      .discoverMovie({ with_genres: genre, include_adult: false })
      .then((res) => ({ ...res, results: filterBackdrop(res.results) })),
  discoverTv: (params) => () =>
    tmdb
      .discoverTv({ include_adult: false, ...params })
      .then((res) => ({ ...res, results: filterBackdrop(res.results) })),
  genreList: (kind) => () =>
    kind === "movie" ? tmdb.genreMovieList() : tmdb.genreTvList(),
  movieInfo: (id) => () => tmdb.movieInfo({ id }),
  movieCredits: (id) => () => tmdb.movieCredits({ id }),
  movieSimilar: (id) => () =>
    tmdb.movieSimilar({ id }).then((res) =>
      [...res.results]
        .filter((a) => a.backdrop_path !== null)
        .sort((a, b) => b.popularity - a.popularity)
    ),
  movieVideos: (id) => () => tmdb.movieVideos({ id }),
  tvInfo: (id) => () => tmdb.tvInfo({ id }),
  tvCredits: (id) => () => tmdb.tvCredits({ id }),
  tvSimilar: (id) => () =>
    tmdb.tvSimilar({ id }).then((res) =>
      [...res.results]
        .filter((a) => a.backdrop_path !== null)
        .sort((a, b) => b.popularity - a.popularity)
    ),
  tvVideos: (id) => () => tmdb.tvVideos({ id }),
  personInfo: (id) => () => tmdb.personInfo({ id }),
  search: (kind, query) => () => {
    const method =
      kind === "m" ? "searchMovie" : kind === "t" ? "searchTv" : "searchPerson";
    return tmdb[method]({ query });
  },
};
