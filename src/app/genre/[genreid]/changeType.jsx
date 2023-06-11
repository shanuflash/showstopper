"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/genre.module.css";
import React from "react";

const changeType = ({ type, genre, genreid }) => {
  const router = useRouter();
  const handleTypeChange = () => {
    if (type === "m") {
      const genreList = {
        28: 10759,
        12: 10759,
        878: 10765,
        10752: 10768,
        14: 10765,
      };
      var newgenreid = genreList[genreid];
      if (newgenreid === undefined) {
        newgenreid = genreid;
      }
      type = "t";
    } else {
      const genreList = {
        10759: 28,
        10759: 12,
        10765: 878,
        10768: 10752,
      };
      var newgenreid = genreList[genreid];
      if (newgenreid === undefined) {
        newgenreid = genreid;
      }
      type = "m";
    }
    router.replace(
      "/genre/" + newgenreid + "?genre=" + genre + "&type=" + type
    );
  };

  return (
    <div onClick={handleTypeChange} className={styles["genre-type-change"]}>
      Looking for {type === "m" ? "TV Shows" : "movies"}? Click here
    </div>
  );
};

export default changeType;
