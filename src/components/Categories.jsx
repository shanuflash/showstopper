import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import tmdb from "../tmdb";
import Nav from "./Nav";

function Categories() {
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
                key={item.id}
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
                key={item.id}
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
