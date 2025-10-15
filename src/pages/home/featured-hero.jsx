import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { FiInfo, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PageContainer from "../../components/page-container";

function FeaturedHero({ pool, index, onGoTo }) {
  const featured = pool[index];
  const routeId = `${featured.id}${featured.mediaType}`;
  const bg = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`;
  const title = featured.title || featured.name;

  return (
    <div
      key={featured.id}
      className="relative h-[72vh] min-h-130 max-h-190 w-full bg-cover bg-center transition-[background-image] duration-700"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 via-30% to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 via-25% to-transparent" />

      <PageContainer className="relative h-full flex flex-col justify-end pb-14">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-fg-muted mb-4">
            Featured · {featured.mediaType === "m" ? "Movie" : "Series"}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {title}
          </h1>
          <p className="mt-4 text-fg-muted text-base md:text-lg leading-relaxed line-clamp-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {featured.overview}
          </p>
          <div className="mt-7 flex gap-3">
            <Link
              to={`/${routeId}`}
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="inline-flex items-center gap-2 rounded-full font-semibold px-7 py-3 hover:opacity-90 transition-opacity shadow-lg"
            >
              <BsFillPlayFill
                style={{ fill: "#000000", color: "#000000" }}
                className="text-2xl -ml-1"
              />
              <span style={{ color: "#000000" }}>Play</span>
            </Link>
            <Link
              to={`/${routeId}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 text-fg font-medium px-6 py-3 backdrop-blur-md border border-white/10 transition-colors"
            >
              <FiInfo className="text-lg" />
              More info
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex gap-2">
            {pool.map((_, i) => (
              <button
                key={i}
                onClick={() => onGoTo(i)}
                aria-label={`Show featured ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => onGoTo(index - 1)}
              aria-label="Previous featured"
              className="h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => onGoTo(index + 1)}
              aria-label="Next featured"
              className="h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default FeaturedHero;
