import Section from "../../components/section";
import castdefault from "../../assets/castdefault.svg";

function CastRow({ cast }) {
  if (!cast?.length) return null;
  return (
    <Section title="Cast">
      <div className="row-scroll flex gap-5 overflow-x-auto pb-2">
        {cast.slice(0, 16).map((item, i) => (
          <div key={item.id || i} className="shrink-0 w-32 text-center">
            <div className="aspect-3/4 w-full rounded-xl overflow-hidden bg-surface-2 ring-1 ring-white/5">
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                    : castdefault
                }
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 text-sm font-medium text-fg truncate">
              {item.name}
            </div>
            <div className="text-xs text-fg-subtle truncate">
              {item.character}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default CastRow;
