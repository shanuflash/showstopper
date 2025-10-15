import Section from "../../components/section";
import PosterCard from "../../components/poster-card";
import PosterGrid from "../../components/poster-grid";

function SimilarGrid({ items, type }) {
  if (!items?.length) return null;
  return (
    <Section title="More like this" className="pb-24">
      <PosterGrid>
        {items.slice(0, 10).map((item) => (
          <PosterCard
            key={item.id}
            to={`/${item.id}${type === "t" ? "t" : "m"}`}
            image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            title={type === "t" ? item.name : item.title}
            rating={item.vote_average}
          />
        ))}
      </PosterGrid>
    </Section>
  );
}

export default SimilarGrid;
