import styles from "@/styles/genre.module.css";
import tmdb from "@/tmdb";
import Link from "next/link";
import ChangeType from "./changeType";

const Genre = async ({ params, searchParams }) => {
  const { genreid } = params;
  const { genre, type } = searchParams;

  switch (type) {
    case "m": {
      var Data = await tmdb.discoverMovie({
        with_genres: genreid,
        include_adult: false,
      });

      break;
    }

    case "t": {
      var Data = await tmdb.discoverTv({
        with_genres: genreid,
        include_adult: false,
      });
      break;
    }
  }

  return (
    <div>
      <div
        className={styles["page-header"]}
        style={{
          background: `linear-gradient(
                      to bottom,
                      #000000c2 0%,
                      #00000013 30%,
                      #00000000 50%,
                      #0c192133 60%,
                      #0c192169 70%,
                      var(--bg) 100%),
                      url(https://image.tmdb.org/t/p/w1280${Data[0]?.backdrop_path})`,
        }}
      >
        <div className={styles["header-title"]}>
          {genre} - {type === "m" ? "Movies" : "TV Shows"}
        </div>
        <ChangeType {...{ type, genre, genreid }} />
      </div>

      {Data?.results?.length ? (
        <div className={styles["results-container"]}>
          {Data?.results?.map((item) => {
            var path = "https://image.tmdb.org/t/p/w300" + item?.backdrop_path;
            return (
              <>
                <Link
                  key={item.id}
                  href={`/${item.id}${type}`}
                  className={styles.card}
                  style={{
                    background: `url(${path})`,
                  }}
                >
                  <div className={styles["card-info"]}>
                    <div className={styles["card-title"]}>
                      {item.original_title || item.name}
                    </div>
                    <div className={styles["card-rating"]}>
                      {item.vote_average} &#9733;
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      ) : (
        <div className={styles["no-results-container"]}>
          <div className={styles["no-results"]}>
            There are no {type === "m" ? "Movies" : "TV Shows"} available,
            related to this genre as of now. Please go through the genre list
            and select a different genre.
          </div>
          <Link href="/Categories">Categories</Link>
        </div>
      )}
    </div>
  );
};

export default Genre;
