import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import tmdb from "../tmdb";
import Nav from "./Nav";

function MovieInfo() {
  const { movieid } = useParams();
  const [Movie, setMovie] = useState({});
  useEffect(() => {
    tmdb
      .movieInfo({ id: movieid })
      .then((res) => {
        console.log(res);
        setMovie(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <Nav />
      <div
        className="movie-info"
        style={{
          background: `linear-gradient(to bottom,
          #000000c2 0%,
          #00000013 30%,
          #00000000 50%,
          #0c192133 60%,
          #0c192169 70%,
          var(--bg) 100%), url(${
            "https://image.tmdb.org/t/p/w1280" + Movie.backdrop_path
          })`,
        }}
      >
        <div className="featured">
          {/* <div className="featured-icon">Featured</div> */}
          <div className="featured-title">{Movie.original_title}</div>
          <div className="featured-desc">{Movie.overview}</div>
          <div className="genres">
            {Movie.genres?.map((item) => (
              <>
                <div className="genre-item">{item.name}</div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="movie-card" data-color="1">
        <div className="movie-card-info"></div>
      </div>
      <div className="movie-card">
        <div className="movie-card-info"></div>
      </div>
      <div className="movie-card">
        <div className="movie-card-info"></div>
      </div>
    </div>
  );
}

export default MovieInfo;
