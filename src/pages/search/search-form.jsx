import { BiMoviePlay } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { ImTv } from "react-icons/im";
import { FaSearch } from "react-icons/fa";

export const SEARCH_TYPES = [
  { key: "m", label: "Movies", icon: BiMoviePlay },
  { key: "t", label: "TV", icon: ImTv },
  { key: "p", label: "People", icon: BsFillPeopleFill },
];

function SearchForm({ query, onQueryChange, tab, onTabChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-2xl mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-fg-subtle" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search movies, shows, people…"
          className="w-full rounded-full bg-surface border border-white/10 pl-13 pr-5 py-4 text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/30 transition-colors"
          autoFocus
        />
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {SEARCH_TYPES.map(({ key, label, icon: Icon }) => (
          <button
            type="button"
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
              tab === key
                ? "bg-white text-black"
                : "bg-white/8 text-fg-muted hover:bg-white/15 hover:text-fg"
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </form>
  );
}

export default SearchForm;
