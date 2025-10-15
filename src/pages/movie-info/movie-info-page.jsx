import { useState, useEffect, useContext } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { DataContext } from "../../context/data-provider";
import Nav from "../../components/nav";
import LoadingScreen from "../../components/loading-screen";
import { qk, qfn } from "../../lib/queries";
import MovieInfoHero from "./movie-info-hero";
import TrailerReveal from "./trailer-reveal";
import CastRow from "./cast-row";
import StudiosList from "./studios-list";
import SimilarGrid from "./similar-grid";

function buildQueries(type, rawId) {
  if (type === "m") {
    return [
      { queryKey: qk.movieInfo(rawId), queryFn: qfn.movieInfo(rawId) },
      { queryKey: qk.movieCredits(rawId), queryFn: qfn.movieCredits(rawId) },
      { queryKey: qk.movieSimilar(rawId), queryFn: qfn.movieSimilar(rawId) },
      { queryKey: qk.movieVideos(rawId), queryFn: qfn.movieVideos(rawId) },
    ];
  }
  if (type === "t") {
    return [
      { queryKey: qk.tvInfo(rawId), queryFn: qfn.tvInfo(rawId) },
      { queryKey: qk.tvCredits(rawId), queryFn: qfn.tvCredits(rawId) },
      { queryKey: qk.tvSimilar(rawId), queryFn: qfn.tvSimilar(rawId) },
      { queryKey: qk.tvVideos(rawId), queryFn: qfn.tvVideos(rawId) },
    ];
  }
  return [
    { queryKey: qk.personInfo(rawId), queryFn: qfn.personInfo(rawId) },
    { queryKey: ["noop", "credits", rawId], queryFn: async () => ({}) },
    { queryKey: ["noop", "similar", rawId], queryFn: async () => [] },
    { queryKey: ["noop", "videos", rawId], queryFn: async () => ({ results: [] }) },
  ];
}

function pickTrailer(results, prefOfficial) {
  if (!results) return null;
  if (prefOfficial) {
    return (
      results.find((item) => item.type === "Trailer" && item.official) ||
      results.find((item) => item.type === "Trailer") ||
      null
    );
  }
  return results.find((item) => item.type === "Trailer") || null;
}

function MovieInfoPage() {
  const { movieid } = useParams();
  const { WatchList, setWatchList, History, setHistory } =
    useContext(DataContext);
  const type = movieid.charAt(movieid.length - 1);
  const rawId = movieid.slice(0, -1);
  const [revealed, setRevealed] = useState(false);

  const queries = useQueries({ queries: buildQueries(type, rawId) });
  const [movieQ, creditQ, similarQ, videosQ] = queries;
  const movie = movieQ.data;
  const credit = creditQ.data || {};
  const similar = similarQ.data || [];
  const video = pickTrailer(videosQ.data?.results, type === "m");

  useEffect(() => {
    setRevealed(false);
  }, [movieid]);

  const isSaved = WatchList?.includes(movieid);
  const handleWatchList = () => {
    if (isSaved) setWatchList(WatchList.filter((item) => item !== movieid));
    else setWatchList([...WatchList, movieid]);
  };

  const handlePlay = () => {
    if (!History.includes(movieid)) setHistory([...History, movieid]);
    if (!revealed) window.scrollTo({ top: 500, behavior: "smooth" });
    setRevealed((r) => !r);
  };

  if (!movie) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <ScrollRestoration />
      <Nav />

      <MovieInfoHero
        movie={movie}
        type={type}
        isSaved={isSaved}
        revealed={revealed}
        onTogglePlay={handlePlay}
        onToggleWatchList={handleWatchList}
      />

      <TrailerReveal video={video} revealed={revealed} />

      <CastRow cast={credit?.cast} />
      <StudiosList companies={movie.production_companies} />
      <SimilarGrid items={similar} type={type} />
    </div>
  );
}

export default MovieInfoPage;
