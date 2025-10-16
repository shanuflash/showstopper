# ShowStopper

A movie and TV show discovery app. Browse trending titles, search across movies, shows, and people, and keep a personal watch list and history — all in the browser, no account required.

**Live at [show-stopper.netlify.app](https://show-stopper.netlify.app)**

## Features

- Trending movies and shows on the homepage with a rotating featured hero
- Browse by genre across movies and TV with cross-type lookup
- Detail pages with backdrop, metadata, cast, studios, similar titles, and trailer playback
- Search across movies, shows, and people with trending suggestions before you type
- Personal watch list and watch history persisted to localStorage (no sign-in)
- Active route highlighting in the nav, route-level loading screens
- Centered, max-width layout with consistent Apple TV-style minimal aesthetic
- React Query caching to dedupe requests across pages

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Routing**: React Router v6
- **Data**: [@tanstack/react-query](https://tanstack.com/query) (5 min staleTime, dedupe across pages)
- **Styling**: Tailwind CSS 4
- **Icons**: react-icons
- **Toasts**: react-toastify
- **Movie / TV Data**: [TMDB API](https://www.themoviedb.org/documentation/api) via [moviedb-promise](https://github.com/grantholle/moviedb-promise)
- **Hosting**: Netlify

## Architecture

### Project Structure

```
src/
  app/
    main.jsx              Entry, providers (QueryClient, DataProvider, Router)
    routes.jsx            Route table only
  pages/                  One folder per route
    home/                 Featured hero + popular/genre rows
    movie-info/           Hero, trailer reveal, cast, studios, similar
    search/               Search form, results, trending fallback
    activity/             Watch list, history, recommended empty state
    categories/           Movie + TV genre groups
    genre/                Genre detail page
  components/             Shared primitives (nav, page-container, poster-card, etc.)
  context/
    data-provider.jsx     localStorage-backed library state
  lib/
    tmdb.js               TMDB client
    queries.js            React Query keys + fetcher functions
  assets/
  index.css               Tailwind import + theme tokens
```

### Data Persistence

The watch list and history live in `localStorage` under `showstopper:library:v1`. IDs are stored with a media-type suffix (`603692m` for movies, `100088t` for TV) so the same store works for both kinds.

### Caching

A single `QueryClient` with `staleTime: 5min` and `gcTime: 30min` dedupes every TMDB call. Activity's library entries share the same query keys as MovieInfo, so opening a saved title doesn't refetch its data.

### Movie / TV Data

All metadata comes from the [TMDB API](https://www.themoviedb.org/documentation/api). Backdrop and poster images are served directly from TMDB's CDN.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recommended), npm, or yarn
- A [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/shanuflash/showstopper.git
cd showstopper
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_KEY=your-tmdb-api-key
```

### Development

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
pnpm build
pnpm preview
```

The build output is written to `dist/`.

## License

MIT — see [LICENSE](./LICENSE).
