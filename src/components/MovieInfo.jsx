import { useEffect, useState, useContext } from "react";
import {
  ScrollRestoration,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import UseAnimations from "react-useanimations";
import bookmark from "react-useanimations/lib/bookmark";
import { DataContext } from "../context/DataProvider";
import tmdb from "../tmdb";
import Nav from "./Nav";
import YoutubeEmbed from "./Youtube";
import supabase from "../supabase";
import logodefault from "../../public/logodefault.svg";
import castdefault from "../../public/castdefault.svg";

function MovieInfo() {
  const { movieid } = useParams();
  const navigate = useNavigate();
  const { User, WatchList, setWatchList, History, setHistory, Session } =
    useContext(DataContext);
  const type = movieid.charAt(movieid.length - 1);
  const [Movie, setMovie] = useState({});
  const [Credit, setCredit] = useState({});
  const [Similar, setSimilar] = useState([]);
  const [Video, setVideo] = useState({});
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    switch (type) {
      case "m": {
        tmdb
          .movieInfo({ id: movieid })
          .then((res) => {
            setMovie(res);
          })
          .catch(console.error);

        tmdb
          .movieCredits({ id: movieid })
          .then((res) => {
            setCredit(res);
          })
          .catch(console.error);

        tmdb
          .movieSimilar({ id: movieid })
          .then((res) => {
            setSimilar(res.results.filter((a) => a.backdrop_path !== null));
          })
          .catch(console.error);
        tmdb
          .movieVideos({ id: movieid })
          .then((res) => {
            setVideo(
              res.results.find(
                (item) => item.type === "Trailer" && item.official === true
              )
            );
          })
          .catch(console.error);

        setLoading(false);
        break;
      }
      case "t": {
        tmdb
          .tvInfo({ id: movieid })
          .then((res) => {
            setMovie(res);
            console.log(res);
          })
          .catch(console.error);

        tmdb
          .tvCredits({ id: movieid })
          .then((res) => {
            setCredit(res);
          })
          .catch(console.error);

        tmdb
          .tvSimilar({ id: movieid })
          .then((res) => {
            setSimilar(res.results.filter((a) => a.poster_path !== null));
          })
          .catch(console.error);
        tmdb
          .tvVideos({ id: movieid })
          .then((res) => {
            setVideo(res.results.find((item) => item.type === "Trailer"));
          })
          .catch(console.error);

        setLoading(false);
        break;
      }
      case "p": {
        tmdb
          .personInfo({ id: movieid })
          .then((res) => {
            console.log(res);
            setMovie(res);
          })
          .catch(console.error);
        break;
      }

      default:
        break;
    }
  }, [movieid]);

  const handleWatchList = (movieid) => {
    if (WatchList.includes(movieid.toString())) {
      setWatchList(WatchList.filter((item) => item !== movieid.toString()));
    } else {
      setWatchList([...WatchList, movieid.toString()]);
    }
  };

  const handleUpdate = async () => {
    if (WatchList.length > 0 || History.length > 0) {
      const { data, error } = await supabase
        .from("netflix")
        .update({ history: History, watch_list: WatchList })
        .eq("userid", User);

      if (!data) {
        const { error } = await supabase
          .from("netflix")
          .insert({ userid: User, history: History, watch_list: WatchList });
        if (error) console.log(error);
        else console.log(data);
      }
    }
  };

  useEffect(() => {
    if (Session) {
      if (User === null) navigate("/Login");
    }
  }, [User]);

  useEffect(() => {
    handleUpdate();
  }, [WatchList, History]);

  const [revealed, setRevealed] = useState(false);

  const handleReveal = (movieid) => {
    if (!History.includes(movieid.toString())) {
      setHistory([...History, movieid.toString()]);
    }
    if (!revealed) window.scrollTo({ top: 500, behavior: "smooth" });
    setRevealed(!revealed);
  };

  if (Loading) {
    return (
      <div>
        <Nav />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <ScrollRestoration />
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
          <div className="featured-left">
            <div className="featured-icon">
              {type == "m" ? "Movie" : "TV Show"}
            </div>
            <div className="featured-title">
              {type == "m" ? Movie.title : Movie.name}
            </div>
            <div className="featured-desc">{Movie.overview}</div>
            <div className="genres">
              {Movie.genres?.map((item) => (
                <>
                  <div className="genre-item">{item.name}</div>
                </>
              ))}
            </div>
          </div>
          <div className="featured-right">
            {Movie.vote_average?.toFixed(1)} &#9733;
            <UseAnimations
              onClick={() => handleWatchList(Movie.id + type)}
              reverse={WatchList?.includes(Movie?.id?.toString())}
              fillColor="white"
              strokeColor="white"
              style={{ cursor: "pointer" }}
              animation={bookmark}
              size={56}
            />
          </div>
        </div>
      </div>
      <div className="movie-card-container">
        <div
          className="movie-card"
          data-color="1"
          onClick={() => handleReveal(Movie.id + type)}
        >
          <div className="movie-card-info">
            <BsFillPlayFill className="movie-info-play" />
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-card-info">
            <div className="movie-card-title" data-style="capital">
              {Movie.original_language}
            </div>
            <div className="movie-card-desc">Language</div>
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-card-info">
            <div className="movie-card-title">
              {type == "m" ? Movie.release_date : Movie.first_air_date}
            </div>
            <div className="movie-card-desc">Release</div>
          </div>
        </div>
        <div className="movie-card">
          {type == "m" ? (
            <div className="movie-card-info">
              <div className="movie-card-title">
                {(Movie.runtime / 60)?.toFixed(1)} hrs
              </div>
              <div className="movie-card-desc">Runtime</div>
            </div>
          ) : (
            <div className="movie-card-info">
              <div className="movie-card-title">
                S{Movie?.last_episode_to_air?.episode_number} E
                {Movie?.last_episode_to_air?.season_number}
              </div>
              <div className="movie-card-desc">Latest Episode</div>
            </div>
          )}
        </div>
      </div>
      <div className={`video-container ${revealed && "revealed"}`}>
        <YoutubeEmbed embedId={Video?.key} />
      </div>

      <div className="movie-info-container">
        <div className="movie-info-title title">Featured Cast:</div>
        <div className="movie-info-desc">
          {Credit.cast?.slice(0, 5).map((item) => (
            <>
              <div className="movie-info-item">
                {item.profile_path ? (
                  <img
                    className="movie-info-item-img"
                    src={"https://image.tmdb.org/t/p/w92" + item.profile_path}
                    alt="test"
                  />
                ) : (
                  <div className="  " style={{ textAlign: "center" }}>
                    <img
                      src={castdefault}
                      alt=""
                      style={{ maxWidth: "92px", maxHeight: "115px" }}
                    />
                  </div>
                )}
                <div className="movie-info-item-title">{item.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="movie-info-container">
        <div className="movie-info-title title">Production Companies:</div>
        <div className="movie-info-desc">
          {Movie.production_companies?.slice(0, 5).map((item) => (
            <>
              <div className="movie-info-item">
                {item.logo_path ? (
                  <img
                    className="movie-info-item-img company-logo"
                    src={"https://image.tmdb.org/t/p/w92" + item.logo_path}
                    alt="not-found"
                  />
                ) : (
                  <div className="  " style={{ textAlign: "center" }}>
                    <img
                      src={logodefault}
                      alt=""
                      style={{ maxHeight: "4rem" }}
                    />
                  </div>
                )}
                <div className="movie-info-item-title">{item.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="movie-info-container">
        <div className="movie-info-title title">
          {type === "t" ? "Similar TV shows" : "Similar Movies:"}
        </div>
        <div className="popular">
          {Similar?.slice(0, 3).map((item) => (
            <>
              <Link
                to={`/${item.id}${type == "t" ? "t" : "m"}`}
                className="card"
                style={{
                  background: `url(${
                    "https://image.tmdb.org/t/p/w300" + item.backdrop_path
                  })`,
                }}
              >
                <div className="card-info">
                  <div className="card-title">
                    {type == "t" ? item.name : item.title}
                  </div>
                  <div className="card-rating">{item.vote_average} &#9733;</div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
