import styles from "@/styles/movie.module.css";

import MovieCard from "./movieCard";
import WatchList from "./watchList.jsx";

import tmdb from "@/tmdb";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import logodefault from "@/assets/logodefault.svg";
import castdefault from "@/assets/castdefault.svg";
import Link from "next/link";

async function MovieInfo({ params }) {
  const supabase = createClientComponentClient();
  const { movieid } = params;
  // const { WatchList, setWatchList, History, setHistory } = useContext(DataContext);
  const type = movieid.charAt(movieid.length - 1);

  switch (type) {
    case "m": {
      var Movie = await tmdb.movieInfo({ id: movieid });
      var Credit = await tmdb.movieCredits({ id: movieid });
      var Similar = (await tmdb.movieSimilar({ id: movieid })).results
        .filter((item) => item.backdrop_path !== null)
        .sort((a, b) => b.popularity - a.popularity);
      var Video = (await tmdb.movieVideos({ id: movieid })).results.find(
        (item) => item.type === "Trailer" && item.official === true
      );
      break;
    }
    case "t": {
      var Movie = await tmdb.tvInfo({ id: movieid });
      var Credit = await tmdb.tvCredits({ id: movieid });
      var Similar = (await tmdb.tvSimilar({ id: movieid })).results
        .filter((item) => item.backdrop_path !== null)
        .sort((a, b) => b.popularity - a.popularity);
      var Video = (await tmdb.tvVideos({ id: movieid })).results.find(
        (item) => item.type === "Trailer" && item.official === true
      );
      break;
    }
  }



  // const handleUpdate = async () => {
  //   if (WatchList.length > 0 || History.length > 0) {
  //     const { data, error } = await supabase
  //       .from("netflix")
  //       .update({ history: History, watch_list: WatchList })
  //       .eq("userid", User);
  //     if (error) console.log(error);
  //     else console.log(data);
  //     if (data === null) {
  //       const { error } = await supabase
  //         .from("netflix")
  //         .insert({ userid: User, history: History, watch_list: WatchList });
  //       if (error) console.log(error);
  //       else console.log(data);
  //     }
  //   }
  // };

  return (
    <div>
      <div
        className={styles["movie-info"]}
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
        <div className={styles.featured}>
          <div className={styles["featured-left"]}>
            <div className={styles["featured-icon"]}>
              {type == "m" ? "Movie" : "TV Show"}
            </div>
            <div className={styles["featured-title"]}>
              {type == "m" ? Movie.title : Movie.name}
            </div>
            <div className={styles["featured-desc"]}>{Movie.overview}</div>
            <div className={styles.genres}>
              {Movie.genres?.map((item) => (
                <>
                  <Link
                    key={item.id}
                    href={`/genre/${item.id}?genre=${item.name}&type=${type}`}
                    className={styles["genre-item"]}
                  >
                    {item.name}
                  </Link>
                </>
              ))}
            </div>
          </div>
          <div className={styles["featured-right"]}>
            {Movie.vote_average?.toFixed(1)} &#9733;
            <WatchList />
          </div>
        </div>
      </div>
      <MovieCard {...{ Movie, type, Video }} />
      <div className={styles["movie-info-container"]}>
        <div className={`${styles["movie-info-title"]} ${styles.title}`}>
          Featured Cast:
        </div>
        <div className={styles["movie-info-desc"]}>
          {Credit.cast?.slice(0, 5).map((item) => (
            <>
              <div className={styles["movie-info-item"]}>
                {item.profile_path ? (
                  <img
                    className={styles["movie-info-item-img"]}
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
                <div className={styles["movie-info-item-title"]}>
                  {item.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles["movie-info-container"]}>
        <div className={`${styles["movie-info-title"]} ${styles.title}`}>
          Production Companies:
        </div>
        <div className={styles["movie-info-desc"]}>
          {Movie.production_companies?.slice(0, 5).map((item) => (
            <>
              <div className={styles["movie-info-item"]}>
                {item.logo_path ? (
                  <img
                    className={`${styles["movie-info-item-img"]} ${styles["company-logo"]}`}
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
                <div className={styles["movie-info-item-title"]}>
                  {item.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles["movie-info-container"]}>
        <div className={`${styles["movie-info-title"]} ${styles.title}`}>
          {type === "t" ? "Similar TV shows" : "Similar Movies:"}
        </div>
        <div className={styles.popular}>
          {Similar?.slice(0, 3).map((item) => (
            <>
              <Link
                href={`/${item.id}${type == "t" ? "t" : "m"}`}
                className={styles.card}
                style={{
                  background: `url(${
                    "https://image.tmdb.org/t/p/w300" + item.backdrop_path
                  })`,
                }}
              >
                <div className={styles["card-info"]}>
                  <div className={styles["card-title"]}>
                    {type == "t" ? item.name : item.title}
                  </div>
                  <div className={styles["card-rating"]}>
                    {item.vote_average} &#9733;
                  </div>
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
