# Netflix Clone  [![Netlify Status](https://api.netlify.com/api/v1/badges/db483b71-08a4-4a68-832a-e675f2eb4c0b/deploy-status)](https://app.netlify.com/sites/netflix-shanu/deploys)
> NextJS rewrite in progress

This is a Netflix clone built with ReactJS, Supabase for database storage and authentication, and TMDB API for movie/tvshow details. The project also utilizes Toastify for toast messages, React Icons, React-useanimations for icons, React-router-dom for routing/navigation, Youtube embed for trailer playback. The project uses Vite as a build tool and is hosted on Netlify.

>Project is hosted on https://netflix-shanu.netlify.app/  
## Table of Contents
- Getting Started
  - Prerequisites
  - Installation
  - Usage
- Features
- Built With
- Contributing
- License

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
You should have Node.js and npm installed on your machine.

### Installation
1. Clone the repository:

```
git clone https://github.com/shanuflash/netflix
```

2. Install node packages:
```
yarn install
(or)
npm install
```

3. Create a supabase table named `netflix` with fields:
```
id: int8
userid: text
history: text[]
watch_list: text[]
```

4. Create a .env file in the root directory of the project with the following variables:
```
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
VITE_TMDB_API_KEY=<YOUR_TMDB_API_KEY>
```
You can obtain your Supabase URL and API key by signing up for a free account on supabase.io and creating a new project. You can obtain your TMDB API key by signing up for a free account on themoviedb.org and creating a new API key.

Usage
To run the project locally, run the following command in the terminal:

```
yarn dev
(or)
npm run dev
```
This will start a local development server at http://localhost:5173.

To build the project for production, run the following command:

```
yarn build
(or)
npm run build
```
This will create a production-ready build in the `dist/` directory.

## Features
- User authentication using Supabase
- Search movies, TV shows, poeple
- Browse movies and TV shows in the homepage by genre
- View movie/TV show details, and play the trailer
- Add movies/TV shows to your watchlist
- View your watch history
- View profile details and change password

## Built With
- ReactJS
- Supabase
- TMDB API
- Toastify
- React Icons
- React-useanimations
- React-router-dom

## Contributing
Contributions are always welcome! If you have any ideas, bug reports, or pull requests, please feel free to open an issue or a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/shanuflash/netflix/blob/main/LICENSE) file for details.
