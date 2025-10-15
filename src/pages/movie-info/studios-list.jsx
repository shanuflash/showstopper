import Section from "../../components/section";
import logodefault from "../../assets/logodefault.svg";

function StudiosList({ companies }) {
  if (!companies?.length) return null;
  return (
    <Section title="Studios">
      <div className="flex flex-wrap gap-3">
        {companies.slice(0, 8).map((c, i) => (
          <div
            key={c.id || i}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-white/5"
          >
            <img
              src={
                c.logo_path
                  ? `https://image.tmdb.org/t/p/w92${c.logo_path}`
                  : logodefault
              }
              alt={c.name}
              className="h-7 max-w-20 object-contain"
            />
            <span className="text-sm text-fg-muted">{c.name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default StudiosList;
