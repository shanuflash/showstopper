import { useState, useEffect, useRef, useMemo } from "react";
import { ScrollRestoration } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import Nav from "../../components/nav";
import MovieRow from "../../components/movie-row";
import LoadingScreen from "../../components/loading-screen";
import { qk, qfn } from "../../lib/queries";
import FeaturedHero from "./featured-hero";

const ROTATE_MS = 12000;

function HomePage() {
  const [movies, tv] = useQueries({
    queries: [
      {
        queryKey: qk.trending("movie", "week"),
        queryFn: qfn.trending("movie", "week"),
      },
      {
        queryKey: qk.trending("tv", "week"),
        queryFn: qfn.trending("tv", "week"),
      },
    ],
  });

  const pool = useMemo(() => {
    if (!movies.data || !tv.data) return [];
    const items = [
      ...movies.data.results
        .filter((m) => m.backdrop_path && m.overview)
        .map((m) => ({ ...m, mediaType: "m" })),
      ...tv.data.results
        .filter((m) => m.backdrop_path && m.overview)
        .map((m) => ({ ...m, mediaType: "t" })),
    ].sort((a, b) => b.popularity - a.popularity);
    return items.slice(0, 6);
  }, [movies.data, tv.data]);

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(pool.length, 1));
    }, ROTATE_MS);
  };

  useEffect(() => {
    if (pool.length === 0) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [pool.length]);

  const goTo = (i) => {
    setIndex(((i % pool.length) + pool.length) % pool.length);
    startTimer();
  };

  if (pool.length === 0) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <ScrollRestoration />
      <Nav />

      <FeaturedHero pool={pool} index={index} onGoTo={goTo} />

      <div className="relative z-10 pb-24 -mt-12">
        <MovieRow type="pop" />
        <MovieRow genre={37} type="tv" title="ShowStopper Originals" />
        <MovieRow genre={16} title="Animated" />
        <MovieRow genre={28} title="Action" />
        <MovieRow genre={35} title="Comedy" />
        <MovieRow genre={878} title="Sci-Fi" />
        <MovieRow genre={80} title="Crime" />
        <MovieRow genre={12} title="Adventure" />
        <MovieRow genre={37} title="Western" />
      </div>
    </div>
  );
}

export default HomePage;
