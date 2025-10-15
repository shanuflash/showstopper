import { useContext, useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import Nav from "../../components/nav";
import LoadingScreen from "../../components/loading-screen";
import PageHeader from "../../components/page-header";
import Section from "../../components/section";
import PosterCard from "../../components/poster-card";
import PosterGrid from "../../components/poster-grid";
import { DataContext } from "../../context/data-provider";
import { qk, qfn } from "../../lib/queries";
import LibrarySection from "./library-section";

function useEntries(ids) {
  const results = useQueries({
    queries: ids.map((suffixed) => {
      const type = suffixed.charAt(suffixed.length - 1);
      const rawId = suffixed.slice(0, -1);
      const isMovie = type === "m";
      return {
        queryKey: isMovie ? qk.movieInfo(rawId) : qk.tvInfo(rawId),
        queryFn: isMovie ? qfn.movieInfo(rawId) : qfn.tvInfo(rawId),
        select: (res) => ({ ...res, routeId: rawId + type }),
      };
    }),
  });
  return {
    data: results.map((r) => r.data).filter(Boolean),
    isLoading: results.some((r) => r.isLoading),
  };
}

function ActivityPage() {
  const { WatchList, History } = useContext(DataContext);

  const watchList = useEntries(WatchList || []);
  const history = useEntries(History || []);
  const popular = useQuery({
    queryKey: qk.popular(),
    queryFn: qfn.popular(),
  });

  const recommended = useMemo(
    () =>
      (popular.data?.results || [])
        .filter((m) => m.backdrop_path)
        .slice(0, 10),
    [popular.data]
  );

  if (watchList.isLoading || history.isLoading || popular.isLoading)
    return <LoadingScreen label="Loading your library" />;

  const isEmpty = watchList.data.length === 0 && history.data.length === 0;

  return (
    <div className="min-h-screen bg-bg">
      <Nav />

      <PageHeader
        eyebrow="Your Library"
        title="Activity"
        subtitle="Pick up where you left off and revisit titles you've saved."
      />

      <LibrarySection
        title="Watch List"
        items={watchList.data}
        empty="Bookmark a title and it'll show up here."
      />
      <LibrarySection
        title="History"
        items={history.data}
        empty="Titles you start watching will appear here."
      />

      {isEmpty && (
        <Section title="Recommended for you">
          <PosterGrid>
            {recommended.map((item) => (
              <PosterCard
                key={item.id}
                to={`/${item.id}m`}
                image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                title={item.title}
                rating={item.vote_average}
              />
            ))}
          </PosterGrid>
        </Section>
      )}

      <div className="h-24" />
    </div>
  );
}

export default ActivityPage;
