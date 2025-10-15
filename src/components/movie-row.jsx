import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "./page-container";
import { qk, qfn } from "../lib/queries";

function buildQuery(type, genre) {
  if (type === "pop") return { key: qk.popular(), fn: qfn.popular() };
  if (type === "tv")
    return {
      key: qk.discoverTv(213, null),
      fn: qfn.discoverTv({ with_networks: 213 }),
    };
  return { key: qk.discoverMovie(genre), fn: qfn.discoverMovie(genre) };
}

function MovieRow({ genre = 80, title = null, type = "gen" }) {
  const scrollerRef = useRef(null);
  const { key, fn } = buildQuery(type, genre);
  const { data } = useQuery({ queryKey: key, queryFn: fn });
  const items = (data?.results || []).filter((a) => a.backdrop_path);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const rowTitle = type === "pop" ? "Popular Now" : title;

  if (items.length === 0) return null;

  return (
    <section className="mt-10 md:mt-14 group/row">
      <PageContainer>
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-fg">
            {rowTitle}
          </h2>
          <div className="hidden md:flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
            <button
              onClick={() => scrollByCards(-1)}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-fg flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-fg flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="row-scroll flex gap-4 md:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
        >
          {items.map((movie) => (
            <Link
              key={movie.id}
              to={`/${movie.id}${type === "tv" ? "t" : "m"}`}
              className="poster-card snap-start shrink-0 w-65 md:w-80"
            >
              <div
                className="aspect-video w-full rounded-xl bg-surface-2 bg-cover bg-center ring-1 ring-white/5"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                }}
              />
              <div className="pt-3 px-1">
                <div className="text-fg text-sm font-medium truncate">
                  {type === "tv" ? movie.name : movie.title}
                </div>
                <div className="text-fg-subtle text-xs mt-1">
                  {movie.vote_average?.toFixed(1)} ★
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export default MovieRow;
