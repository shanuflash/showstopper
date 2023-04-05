import { useEffect, useState, useContext } from "react";
import { ScrollRestoration, useParams, useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import UseAnimations from "react-useanimations";
import bookmark from "react-useanimations/lib/bookmark";
import { DataContext } from "../context/DataProvider";
import tmdb from "../tmdb";
import Nav from "./Nav";
import YoutubeEmbed from "./Youtube";
import supabase from "../supabase";

function MovieInfo() {
  const { movieid } = useParams();
  const navigate = useNavigate();
  const { User, WatchList, setWatchList } = useContext(DataContext);
  const type = movieid.charAt(movieid.length - 1);
  const [Movie, setMovie] = useState({});
  const [Credit, setCredit] = useState({});
  const [Similar, setSimilar] = useState({});
  const [Video, setVideo] = useState({});
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    switch (type) {
      case "m": {
        tmdb
          .movieInfo({ id: movieid })
          .then((res) => {
            console.log(res);
            setMovie(res);
          })
          .catch(console.error);

        tmdb
          .movieCredits({ id: movieid })
          .then((res) => {
            console.log(res);
            setCredit(res);
          })
          .catch(console.error);

        tmdb
          .movieSimilar({ id: movieid })
          .then((res) => {
            console.log(res);
            setSimilar(res);
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
            console.log(res);
            setMovie(res);
          })
          .catch(console.error);
        tmdb
          .tvCredits({ id: movieid })
          .then((res) => {
            console.log(res);
          })
          .catch(console.error);
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
  }, []);

  // useEffect(() => {
  //   if (!User) navigate("/Login");
  // }, [User]);
  const handleUpdate = async () => {
    if (WatchList.length > 0) {
      const { data, error } = await supabase
        .from("netflix")
        .update({ watch_list: WatchList })
        .eq("userid", User);
      if (error) console.log(error);
      else console.log(data);
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [WatchList]);

  if (Loading) {
    return <div>Loading...</div>;
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
            <div className="featured-title">{Movie.title}</div>
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
              onClick={() => setWatchList((prev) => [...prev, Movie.id])}
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
        <div className="movie-card" data-color="1">
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
            <div className="movie-card-title">{Movie.release_date}</div>
            <div className="movie-card-desc">Release</div>
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-card-info">
            <div className="movie-card-title">
              {(Movie.runtime / 60)?.toFixed(1)} hrs
            </div>
            <div className="movie-card-desc">Runtime</div>
          </div>
        </div>
      </div>
      <div className="movie-info-container">
        <div className="movie-info-title title">Featured Cast:</div>
        <div className="movie-info-desc">
          {Credit.cast?.slice(0, 5).map((item) => (
            <>
              <div className="movie-info-item">
                <img
                  className="movie-info-item-img"
                  src={"https://image.tmdb.org/t/p/w92" + item.profile_path}
                  alt="test"
                />
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
                <img
                  className="movie-info-item-img company-logo"
                  src={"https://image.tmdb.org/t/p/w92" + item.logo_path}
                  alt="not-found"
                />
                <div className="movie-info-item-title">{item.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="movie-info-container">
        <div className="movie-info-title title">Similar Movies:</div>
        <div className="movie-info-desc">
          {Similar.results?.slice(0, 8).map((item) => (
            <>
              <div className="movie-info-item">
                <img
                  className="movie-info-item-img company-logo"
                  src={"https://image.tmdb.org/t/p/w92" + item.poster_path}
                  alt="logo-not-found"
                />
                <div className="movie-info-item-title">{item.title}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId={Video.key} />
    </div>
  );
}

export default MovieInfo;
