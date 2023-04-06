import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import tmdb from "../tmdb";

function MovieRow({
  index,
  genre = 80,
  title = null,
  type = "gen",
  handleScroll,
  setContainerRef,
}) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (type === "pop") {
      tmdb
        .moviePopular()
        .then((res) => {
          setData(res.results.filter((a) => a.backdrop_path !== null));
          // console.log(res.results.filter((a) => a.backdrop_path !== null));
        })
        .catch(toast.error);
    } else if (type === "gen") {
      tmdb
        .discoverMovie({ with_genres: genre, include_adult: false })
        .then((res) => {
          setData(res.results.filter((a) => a.backdrop_path !== null));
          // console.log(res.results.filter((a) => a.backdrop_path !== null));
        })
        .catch(toast.error);
    } else if (type === "tv") {
      tmdb
        .discoverTv({ with_networks: 213 })
        .then((res) => {
          setData(res.results.filter((a) => a.backdrop_path !== null));
          // console.log(res.results.filter((a) => a.backdrop_path !== null));
        })
        .catch(toast.error);
    }
  }, []);

  return (
    <div className="movie-container">
      {(type == "gen" || type == "tv") && <div className="title">{title}</div>}
      <div className="arrow-container">
        <button
          className="arrow left-arrow"
          onClick={() => handleScroll(index, -664)}
        >
          &lt;
        </button>

        <button
          className="arrow right-arrow"
          onClick={() => handleScroll(index, 664)}
        >
          &gt;
        </button>
      </div>
      <div ref={setContainerRef(index)} className="popular">
        {Data.map((movie) => (
          <>
            <Link
              to={`/${movie.id}` + (type == "tv" ? "t" : "m")}
              className="card"
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                })`,
              }}
            >
              <div className="card-info">
                <div className="card-title">
                  {type == "tv" ? movie.name : movie.title}
                </div>
                <div className="card-rating">{movie.vote_average} &#9733;</div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
