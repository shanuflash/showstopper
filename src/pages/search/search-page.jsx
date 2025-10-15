import { useState } from "react";
import { ScrollRestoration } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Nav from "../../components/nav";
import PageContainer from "../../components/page-container";
import Section from "../../components/section";
import PosterCard from "../../components/poster-card";
import PosterGrid from "../../components/poster-grid";
import { qk, qfn } from "../../lib/queries";
import SearchForm from "./search-form";
import PersonGrid from "./person-grid";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState(null);
  const [tab, setTab] = useState("m");

  const trending = useQuery({
    queryKey: qk.popular(),
    queryFn: qfn.popular(),
    select: (data) => data.results.filter((m) => m.backdrop_path).slice(0, 10),
  });

  const search = useQuery({
    queryKey: activeQuery
      ? qk.search(activeQuery.tab, activeQuery.query)
      : ["search", "idle"],
    queryFn: activeQuery
      ? qfn.search(activeQuery.tab, activeQuery.query)
      : () => null,
    enabled: !!activeQuery,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setActiveQuery({ query: q, tab });
  };

  const results = search.data?.results || [];
  const imgKey = activeQuery?.tab === "p" ? "profile_path" : "backdrop_path";
  const filtered = activeQuery
    ? results.filter((a) => a[imgKey] !== null)
    : [];
  const hasResults = activeQuery && filtered.length > 0 && !search.isFetching;
  const noResults =
    activeQuery && filtered.length === 0 && !search.isFetching;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <ScrollRestoration />
      <Nav />

      <PageContainer className="pt-32">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-center">
          Find something to watch
        </h1>
        <SearchForm
          query={query}
          onQueryChange={setQuery}
          tab={tab}
          onTabChange={setTab}
          onSubmit={handleSubmit}
        />
      </PageContainer>

      {hasResults && (
        <Section title={`Results (${filtered.length})`}>
          {activeQuery.tab === "p" ? (
            <PersonGrid items={filtered} />
          ) : (
            <PosterGrid>
              {filtered.map((item) => (
                <PosterCard
                  key={item.id}
                  to={`/${item.id}${activeQuery.tab}`}
                  image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  title={item.original_title || item.name}
                  rating={item.vote_average}
                />
              ))}
            </PosterGrid>
          )}
        </Section>
      )}

      {noResults && (
        <PageContainer className="mt-16 text-center">
          <p className="text-fg-muted">
            No results for{" "}
            <span className="text-fg">"{activeQuery.query}"</span>. Try another
            search.
          </p>
        </PageContainer>
      )}

      {!activeQuery && trending.data && (
        <Section title="Trending now">
          <PosterGrid>
            {trending.data.map((item) => (
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

export default SearchPage;
