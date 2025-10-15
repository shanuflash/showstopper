import { Link } from "react-router-dom";
import Section from "../../components/section";

function GenreGroup({ title, items, type }) {
  return (
    <Section title={title}>
      <div className="flex flex-wrap gap-3">
        {items.map((g) => (
          <Link
            key={g.id}
            to={`/genre/${g.id}?genre=${g.name}&type=${type}`}
            className="px-5 py-2.5 rounded-full bg-surface hover:bg-surface-2 border border-white/8 hover:border-white/25 text-sm text-fg-muted hover:text-fg transition-colors"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default GenreGroup;
