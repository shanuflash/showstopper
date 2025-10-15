import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

const ITEMS = [
  {
    to: "/Categories",
    label: "Categories",
    match: (p) => p.startsWith("/Categories") || p.startsWith("/genre"),
  },
  {
    to: "/Search",
    label: "Search",
    icon: FaSearch,
    match: (p) => p === "/Search",
  },
  {
    to: "/Activity",
    label: "Library",
    icon: FiBookmark,
    match: (p) => p === "/Activity",
  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60"
          : "bg-linear-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-360 flex items-center justify-between px-6 md:px-10 h-16">
        <Link
          to="/"
          className="font-semibold tracking-tight text-xl md:text-2xl text-fg"
        >
          ShowStopper
        </Link>

        <nav className="flex items-center gap-2 md:gap-1 text-sm">
          {ITEMS.map(({ to, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-colors ${
                  active
                    ? "bg-white/15 text-fg"
                    : "text-fg-muted hover:text-fg hover:bg-white/8"
                }`}
              >
                {Icon && <Icon className="text-xs" />}
                <span className={Icon ? "hidden sm:inline" : ""}>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
