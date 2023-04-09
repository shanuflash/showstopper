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
      <div className="page-header">
        <div className="header-title">Categories</div>
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
