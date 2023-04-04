import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { Link, ScrollRestoration } from "react-router-dom";
import Nav from "./Nav";

function Search() {
  const { Result } = useContext(DataContext);

  return (
    <div className="App">
      <ScrollRestoration />
      <Nav />
      <div
        className="search-container"
        style={{
          background: `linear-gradient( to bottom, #000000c2 0%, #00000054 30%, #00000024 50%, #0c1921 60%, #0c1921 70%, var(--bg) 100% )
                      , url(${
                        "https://image.tmdb.org/t/p/w780" +
                        Result[0].backdrop_path
                      })`,
        }}
      >
        {Result?.map((item) => (
          <>
            <Link
              to={`/${item.id}`}
              className="card"
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/w300" + item?.backdrop_path
                })`,
              }}
            >
              <div className="card-info">
                <div className="card-title">{item.original_title}</div>
                <div className="card-rating">{item.vote_average} &#9733;</div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default Search;
