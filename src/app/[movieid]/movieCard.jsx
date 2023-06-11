"use client";

import styles from "@/styles/movie.module.css";
import YoutubeEmbed from "@/components/Youtube";
import { BsFillPlayFill } from "react-icons/bs";
import { useState } from "react";

const movieCard = ({ Movie, type, Video }) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = (movieid) => {
    // if (!History.includes(movieid.toString())) {
    //   setHistory([...History, movieid.toString()]);
    // }
    if (!revealed) window.scrollTo({ top: 500, behavior: "smooth" });
    setRevealed(!revealed);
  };

  return (
    <>
      <div className={styles["movie-card-container"]}>
        <div
          className={styles["movie-card"]}
          data-color="1"
          onClick={() => handleReveal(Movie.id + type)}
        >
          <div className={styles["movie-card-info"]}>
            <BsFillPlayFill className={styles["movie-info-play"]} />
          </div>
        </div>
        <div className={styles["movie-card"]}>
          <div className={styles["movie-card-info"]}>
            <div className={styles["movie-card-title"]} data-style="capital">
              {Movie.original_language}
            </div>
            <div className={styles["movie-card-desc"]}>Language</div>
          </div>
        </div>
        <div className={styles["movie-card"]}>
          <div className={styles["movie-card-info"]}>
            <div className={styles["movie-card-title"]}>
              {type == "m" ? Movie.release_date : Movie.first_air_date}
            </div>
            <div className={styles["movie-card-desc"]}>Release</div>
          </div>
        </div>
        <div className={styles["movie-card"]}>
          {type == "m" ? (
            <div className={styles["movie-card-info"]}>
              <div className={styles["movie-card-title"]}>
                {(Movie.runtime / 60)?.toFixed(1)} hrs
              </div>
              <div className={styles["movie-card-desc"]}>Runtime</div>
            </div>
          ) : (
            <div className={styles["movie-card-info"]}>
              <div className={styles["movie-card-title"]}>
                S{Movie?.last_episode_to_air?.season_number} E
                {Movie?.last_episode_to_air?.episode_number}
              </div>
              <div className={styles["movie-card-desc"]}>Latest Episode</div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles["video-container"]} ${
          revealed && styles.revealed
        }`}
      >
        <YoutubeEmbed embedId={Video?.key} />
      </div>
    </>
  );
};

export default movieCard;
