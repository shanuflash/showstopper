import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Nav from "../../components/nav";
import LoadingScreen from "../../components/loading-screen";
import PageContainer from "../../components/page-container";
import Section from "../../components/section";
import PosterCard from "../../components/poster-card";
import PosterGrid from "../../components/poster-grid";
import { qk, qfn } from "../../lib/queries";

function GenrePage() {
  const { genreid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const genre = new URLSearchParams(location.search).get("genre");
  const type = new URLSearchParams(location.search).get("type");

  const isMovie = type === "m";
  const { data } = useQuery({
    queryKey: isMovie
      ? qk.discoverMovie(genreid)
      : qk.discoverTv(null, genreid),
    queryFn: isMovie
      ? qfn.discoverMovie(genreid)
      : qfn.discoverTv({ with_genres: genreid }),
    select: (res) => res.results,
  });

  const handleTypeChange = () => {
    if (type === "m") {
      const xref = { 28: 10759, 12: 10759, 878: 10765, 10752: 10768, 14: 10765 };
      const newId = xref[genreid] ?? genreid;
      navigate(`/genre/${newId}?genre=${genre}&type=t`);
    } else {
      const xref = { 10759: 28, 10765: 878, 10768: 10752 };
      const newId = xref[genreid] ?? genreid;
      navigate(`/genre/${newId}?genre=${genre}&type=m`);
    }
  };

  if (!data) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Nav />

      <div
        className="relative pt-32 pb-12 bg-cover bg-center"
        style={{
          backgroundImage: data[0]?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${data[0].backdrop_path})`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/40 via-bg/70 to-bg" />
        <PageContainer className="relative">
          <div className="text-xs uppercase tracking-[0.25em] text-fg-muted">
            {type === "m" ? "Movies" : "TV Shows"}
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            {genre}
          </h1>
          <button
            onClick={handleTypeChange}
            className="mt-4 inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
          >
            View {type === "m" ? "TV Shows" : "Movies"} in this genre →
          </button>
        </PageContainer>
      </div>

      {data.length ? (
        <Section
          title={`All ${type === "m" ? "Movies" : "Shows"}`}
          className="pb-24"
        >
          <PosterGrid>
            {data.map((item) => (
              <PosterCard
                key={item.id}
                to={`/${item.id}${type}`}
                image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                title={item.original_title || item.name}
                rating={item.vote_average}
              />
            ))}
          </PosterGrid>
        </Section>
      ) : (
        <PageContainer className="py-20 text-center">
          <p className="text-fg-muted max-w-md mx-auto">
            No {type === "m" ? "movies" : "shows"} available for this genre.
          </p>
          <Link
            to="/Categories"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black font-medium px-5 py-2.5 hover:bg-white/90 transition-colors"
          >
            Browse categories
          </Link>
        </PageContainer>
      )}
    </div>
  );
}

export default GenrePage;
