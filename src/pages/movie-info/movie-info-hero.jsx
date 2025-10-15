import { Link } from "react-router-dom";
import { BsFillPlayFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import PageContainer from "../../components/page-container";

function MovieInfoHero({
  movie,
  type,
  isSaved,
  revealed,
  onTogglePlay,
  onToggleWatchList,
}) {
  const title = type === "m" ? movie.title : movie.name;
  const releaseDate = type === "m" ? movie.release_date : movie.first_air_date;
  const year = releaseDate?.slice(0, 4);

  return (
    <div
      className="relative min-h-[85vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : undefined,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 via-30% to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 via-25% to-transparent" />

      <PageContainer className="relative pt-40 pb-16 flex flex-col justify-end min-h-[85vh]">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-fg-muted mb-4">
            {type === "m" ? "Movie" : type === "t" ? "Series" : "Person"}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-muted">
            {movie.vote_average ? (
              <span className="flex items-center gap-1 text-fg">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
            ) : null}
            {year && <span>{year}</span>}
            {type === "m" && movie.runtime ? (
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            ) : null}
            {type === "t" && movie.number_of_seasons ? (
              <span>
                {movie.number_of_seasons} Season
                {movie.number_of_seasons > 1 ? "s" : ""}
              </span>
            ) : null}
            {movie.original_language && (
              <span className="uppercase">{movie.original_language}</span>
            )}
          </div>

          <p className="mt-5 text-base md:text-lg text-fg-muted max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {movie.overview}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onTogglePlay}
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="inline-flex items-center gap-2 rounded-full font-semibold px-7 py-3 hover:opacity-90 transition-opacity shadow-lg"
            >
              <BsFillPlayFill
                style={{ fill: "#000000", color: "#000000" }}
                className="text-2xl -ml-1"
              />
              <span style={{ color: "#000000" }}>
                {revealed ? "Hide trailer" : "Play trailer"}
              </span>
            </button>
            <button
              onClick={onToggleWatchList}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 text-fg font-medium px-6 py-3 backdrop-blur-md hover:bg-white/25 transition-colors"
            >
              {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
              {isSaved ? "In Watch List" : "Add to Watch List"}
            </button>
          </div>

          {movie.genres?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/genre/${g.id}?genre=${g.name}&type=${type}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-fg-muted hover:text-fg border border-white/5 transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}

export default MovieInfoHero;
