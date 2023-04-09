import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import tmdb from "../tmdb";
import Nav from "./Nav";

function Categories() {
  const { User, SessionCheck } = useContext(DataContext);
  const navigate = useNavigate();
  const [MovieGenre, setMovieGenre] = useState([]);
  const [TvGenre, setTvGenre] = useState([]);

  useEffect(() => {
    tmdb
      .genreMovieList()
      .then((res) => {
        setMovieGenre(res.genres);
      })
      .catch(console.error);

    tmdb
      .genreTvList()
      .then((res) => {
        setTvGenre(res.genres);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (SessionCheck) {
      if (!User) {
        navigate("/Login");
      }
    }
  }, [SessionCheck, User]);

  return (
    <div>
      <Nav />
      <div
        className="page-header"
        style={
          {
            // background: `linear-gradient(
            //             to bottom,
            //             #000000c2 0%,
            //             #00000013 30%,
            //             #00000000 50%,
            //             #0c192133 60%,
            //             #0c192169 70%,
            //             var(--bg) 100%),
            //             url(https://image.tmdb.org/t/p/w1280${Data[0]?.backdrop_path})`,
          }
        }
      >
        Categories
      </div>

      <div className="category">
        <div className="title">Movies</div>
        <div className="genres">
          {MovieGenre.map((item) => (
            <>
              <Link
                to={`/genre/${item.id}?genre=${item.name}&type=m`}
                className="genre-item"
              >
                {item.name}
              </Link>
            </>
          ))}
        </div>
      </div>
      <div className="category">
        <div className="title">TV Shows</div>
        <div className="genres">
          {TvGenre.map((item) => (
            <>
              <Link
                to={`/genre/${item.id}?genre=${item.name}&type=t`}
                className="genre-item"
              >
                {item.name}
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
