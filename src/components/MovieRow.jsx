"use client";
import styles from "@/styles/movierow.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import tmdb from "../tmdb";

function MovieRow({ index, genre = 80, title = null, type = "gen" }) {
  const containerRef = useRef(null);

  const handleScroll = (index, scrollOffset) => {
    const newScrollLeft = containerRef.current.scrollLeft + scrollOffset;
    containerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

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
    <div className={styles["movie-container"]}>
      {(type == "gen" || type == "tv") && (
        <div className={styles.title}>{title}</div>
      )}
      <div className={styles["arrow-container"]}>
        <button
          className={`${styles.arrow} ${styles["left-arrow"]}`}
          onClick={() => handleScroll(index, -664)}
        >
          &lt;
        </button>

        <button
          className={`${styles.arrow} ${styles["right-arrow"]}`}
          onClick={() => handleScroll(index, 664)}
        >
          &gt;
        </button>
      </div>
      <div ref={containerRef} className={styles.popular}>
        {Data.map((movie) => (
          <>
            <Link
              key={movie.id}
              href={`/${movie.id}` + (type == "tv" ? "t" : "m")}
              className={styles.card}
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                })`,
              }}
            >
              <div className={styles["card-info"]}>
                <div className={styles["card-title"]}>
                  {type == "tv" ? movie.name : movie.title}
                </div>
                <div className={styles["card-rating"]}>
                  {movie.vote_average} &#9733;
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
