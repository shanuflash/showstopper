import Section from "../../components/section";
import PosterCard from "../../components/poster-card";
import PosterGrid from "../../components/poster-grid";

function LibrarySection({ title, items, empty }) {
  if (items.length === 0) {
    return (
      <Section title={title}>
        <div className="rounded-2xl border border-white/5 bg-surface/40 px-6 py-10 text-center">
          <p className="text-fg-muted text-sm">{empty}</p>
        </div>
      </Section>
    );
  }
  return (
    <Section title={title}>
      <PosterGrid>
        {items.map((item) => (
          <PosterCard
            key={item.routeId}
            to={`/${item.routeId}`}
            image={
              item.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                : null
            }
            title={item.title || item.name}
            rating={item.vote_average}
          />
        ))}
      </PosterGrid>
    </Section>
  );
}

export default LibrarySection;
