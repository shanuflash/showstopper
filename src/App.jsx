import { useState, useEffect, useContext } from "react";
import tmdb from "./tmdb";
import "./App.css";
import { DataContext } from "./context/DataProvider";
import supabase from "./supabase";

import { toast } from "react-toastify";
import { useNavigate, Link, ScrollRestoration } from "react-router-dom";
import Nav from "./components/Nav";

/*
image url = https://image.tmdb.org/t/p/w500/

searchMovie
searchPerson
searchTv
 
discoverMovie
movieTopRated
discoverTv
tvTopRated

movieInfo
movieImages
movieKeywords
movieReleaseDates (iso_3166_1: "IN")
movieVideos
movieRecommendations
movieSimilar
movieReviews

tvInfo
tvImages
tvKeywords
tvVideos
tvRecommendations
tvSimilar
tvReviews

personInfo
personImages
personCombinedCredits

"backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],
"still_sizes": [
  "w92",
  "w185",
  "w300",
  "original"
]
*/

function App() {
  const {
    setEmail,
    User,
    setUser,
    SearchItem,
    setSearchItem,
    setResult,
    isOpen,
    handleMouseEnter,
    handleMouseLeave,
  } = useContext(DataContext);
  const [Bg, setBg] = useState(
    "http://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZgSZPxY1IqlyGClEuxnnzKH3cwcfhdz2Qj6HAwnYK1JVzOfrHNijT-XmTnVwpsT3lVv_Q7nY9PljiAIxz4rLxvbe8hRoaShSh2x.jpg?r=18a"
  );
  const [Popular, setPopular] = useState({});
  const [Upcoming, setUpcoming] = useState({});

  useEffect(() => {
    tmdb
      .movieInfo({ id: "603692" })
      .then((res) => {
        if (res.backdrop_path) {
          setBg("https://image.tmdb.org/t/p/w1280" + res.backdrop_path);
        }
      })
      .catch(console.error);

    tmdb
      .moviePopular()
      .then((res) => {
        setPopular(res);
      })
      .catch(toast.error);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!User) navigate("/Login");
  }, [User]);

  return (
    <div className="App">
      <ScrollRestoration />
      <Nav />
      <div
        className="master"
        style={{
          background: `linear-gradient(to bottom,
                      #000000c2 0%,
                      #00000013 30%,
                      #00000000 50%,
                      #0c192133 60%,
                      #0c192169 70%,
                      var(--bg) 100%), url(${Bg})`,
        }}
      >
        <div className="featured">
          <div className="featured-icon">Featured</div>
          <div className="featured-title">John Wick: Chapter 4</div>
          <div className="featured-desc">
            With the price on his head ever increasing, John Wick uncovers a
            path to defeating The High Table. But before he can earn his
            freedom, Wick must face off against a new enemy with powerful
            alliances across the globe and forces that turn old friends into
            foes.
          </div>
        </div>
      </div>
      <div className="popular">
        {Popular.results?.map((movie) => (
          <>
            <Link
              to={`/${movie.id}`}
              className="card"
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                })`,
              }}
            >
              <div className="card-info">
                <div className="card-title">{movie.title}</div>
                <div className="card-rating">{movie.vote_average} &#9733;</div>
              </div>
            </Link>
          </>
        ))}
      </div>
      <div className="test1"></div>
    </div>
  );
}

export default App;
