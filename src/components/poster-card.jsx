import { Link } from "react-router-dom";

function PosterCard({ to, image, title, rating, portrait = false }) {
  const aspect = portrait ? "aspect-3/4" : "aspect-video";
  return (
    <Link to={to} className="poster-card block group">
      <div
        className={`${aspect} w-full rounded-xl bg-surface-2 bg-cover bg-center ring-1 ring-white/5 group-hover:ring-white/20 transition-all`}
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      />
      <div className="pt-3 px-0.5">
        <div className="text-fg text-sm font-medium truncate">{title}</div>
        {rating != null && (
          <div className="text-fg-subtle text-xs mt-1">
            {Number(rating).toFixed(1)} ★
          </div>
        )}
      </div>
    </Link>
  );
}

export default PosterCard;
