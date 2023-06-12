"use client";
import UseAnimations from "react-useanimations";
import bookmark from "react-useanimations/lib/bookmark";

//WIP//
const watchList = () => {
  // const handleWatchList = (movieid) => {
  //   if (WatchList.includes(movieid.toString())) {
  //     setWatchList(WatchList.filter((item) => item !== movieid.toString()));
  //   } else {
  //     setWatchList([...WatchList, movieid.toString()]);
  //   }
  // };
  return (
    <UseAnimations
      // onClick={() => handleWatchList(Movie.id + type)}
      // reverse={WatchList?.includes(Movie?.id?.toString() + type)}
      fillColor="white"
      strokeColor="white"
      style={{ cursor: "pointer" }}
      animation={bookmark}
      size={56}
    />
  );
};

export default watchList;
