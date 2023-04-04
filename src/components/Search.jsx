import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";

function Search() {
  const {
    Result,
    setResult,
    SearchItem,
    setSearchItem,
    handleMouseEnter,
    handleMouseLeave,
    handleSearch,
    handleLogout,
    isOpen,
  } = useContext(DataContext);

  // useEffect(() => {
  //   console.log(Result);
  //   // setResult(Result.filter((a) => a.backdrop_path !== null));

  //   // const nextTodo = Result.results?.map((c) => {
  //   //   console.log(c);
  //   //   if (c.backdrop_path == null) {
  //   //     return null;
  //   //   } else {
  //   //     return c;
  //   //   }
  //   // });
  //   // console.log(nextTodo);
  // }, [Result]);

  return (
    <div className="App">
      <div className="nav">
        <div className="logo">ShowStopper</div>
        <div className="user">
          <form className="search" onSubmit={handleSearch}>
            <input
              placeholder="Search for a movie..."
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button type="submit" style={{ visibility: "hidden" }}>
              test
            </button>
          </form>
          <div
            className="user-info"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="http://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdYJV5wt63AcxNaDoqDXUhqZb55oN5Dxt1m-Zdn_z5rn_hIq9m8dA8JB2xdcPmrY3yXnlVWYKPXnOrbv2QN4aEVU28dESJg.png?r=1d4"
              alt=""
            />
          </div>

          {isOpen && (
            <div
              className="test"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/Account" className="menu-item">
                Account
              </Link>
              <div className="menu-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="search-container">
        {Result?.map((item) => (
          <>
            <div
              className="card"
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/w300" + item.backdrop_path
                })`,
              }}
            >
              <div className="card-info">
                <div className="card-title">{item.original_title}</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Search;
