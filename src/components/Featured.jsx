"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/featured.module.css";
import tmdb from "../tmdb";

const Featured = () => {
  const [Bg, setBg] = useState(
    "https://image.tmdb.org/t/p/w1280/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg"
  );

  const [Featured, setFeatured] = useState({});

  const bgarray = ["603692m", "502356m", "119051t", "100088t"];
  useEffect(() => {
    for (let i = 0; i < bgarray.length; i++) {
      const method =
        bgarray[i].charAt(bgarray[i].length - 1) === "m"
          ? "movieInfo"
          : "tvInfo";

      setTimeout(
        () => {
          tmdb[method]({ id: bgarray[i] })
            .then((res) => {
              if (res.backdrop_path) {
                setFeatured(res);
                setBg("https://image.tmdb.org/t/p/w1280" + res.backdrop_path);
              }
            })
            .catch(console.error);
        },
        i === 0 ? 0 : 10000 * i
      );
    }
  }, []);
  return (
    <div
      className={styles.master}
      style={{
        background: `linear-gradient(to bottom,
                      #000000c2 0%,
                      #00000013 30%,
                      #00000000 50%,
                      #0c192133 60%,
                      #0c192169 70%,
                      var(--bg) 100%), url(${Bg})`,
      }}
    >
      <div className={styles.featured}>
        <div className={styles["featured-left"]}>
          <div className={styles["featured-icon"]}>Featured</div>
          <div className={styles["featured-title"]}>
            {Featured.title || Featured.name || "loading..."}
          </div>
          <div className={styles["featured-desc"]}>
            {Featured.overview || "loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
