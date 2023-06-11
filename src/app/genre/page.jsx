import styles from "@/styles/genre.module.css";

import tmdb from "@/tmdb";

import Link from "next/link";

const Categories = async () => {
  const MovieGenre = await tmdb.genreMovieList();
  const TvGenre = await tmdb.genreTvList();

  console.log("test", MovieGenre, TvGenre);

  return (
    <div>
      <div className={styles["page-header"]}>
        <div className={styles["header-title"]}>Categories</div>
      </div>
      <div className={styles.category}>
        <div className={styles.title}>Movies</div>
        <div className={styles.genres}>
          {MovieGenre?.genres.map((item) => (
            <Link
              key={item.id}
              href={`/genre/${item.id}?genre=${item.name}&type=m`}
              className={styles["genre-item"]}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.category}>
        <div className={styles.title}>TV Shows</div>
        <div className={styles.genres}>
          {TvGenre?.genres?.map((item) => (
            <>
              <Link
                key={item.id}
                href={`/genre/${item.id}?genre=${item.name}&type=t`}
                className={styles["genre-item"]}
              >
                {item.name}
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
