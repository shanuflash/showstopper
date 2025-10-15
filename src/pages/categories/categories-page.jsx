import { useQueries } from "@tanstack/react-query";
import Nav from "../../components/nav";
import LoadingScreen from "../../components/loading-screen";
import PageContainer from "../../components/page-container";
import { qk, qfn } from "../../lib/queries";
import GenreGroup from "./genre-group";

function CategoriesPage() {
  const [movieGenres, tvGenres, popular] = useQueries({
    queries: [
      {
        queryKey: qk.genreList("movie"),
        queryFn: qfn.genreList("movie"),
        select: (r) => r.genres,
      },
      {
        queryKey: qk.genreList("tv"),
        queryFn: qfn.genreList("tv"),
        select: (r) => r.genres,
      },
      {
        queryKey: qk.popular(),
        queryFn: qfn.popular(),
        select: (r) => r.results.find((m) => m.backdrop_path)?.backdrop_path,
      },
    ],
  });

  if (!movieGenres.data || !tvGenres.data) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Nav />

      <div
        className="relative pt-32 pb-12 bg-cover bg-center"
        style={{
          backgroundImage: popular.data
            ? `url(https://image.tmdb.org/t/p/original${popular.data})`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/40 via-bg/70 to-bg" />
        <PageContainer className="relative">
          <div className="text-xs uppercase tracking-[0.25em] text-fg-subtle">
            Browse
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Categories
          </h1>
          <p className="mt-3 text-fg-muted max-w-xl">
            Explore by genre. Movies and shows organised the way you'd expect.
          </p>
        </PageContainer>
      </div>

      <GenreGroup title="Movies" items={movieGenres.data} type="m" />
      <GenreGroup title="TV Shows" items={tvGenres.data} type="t" />
      <div className="h-24" />
    </div>
  );
}

export default CategoriesPage;
