import { useState, useContext } from "react";
import tmdb from "./tmdb";
import "./App.css";
import { DataContext } from "./context/DataProvider";
import { Link } from "react-router-dom";

/*
image url = https://image.tmdb.org/t/p/w500/

searchMovie
searchPerson
searchTv
 
discoverMovie
movieTopRated
discoverTv
tvTopRated

movieInfo
movieImages
movieKeywords
movieReleaseDates (iso_3166_1: "IN")
movieVideos
movieRecommendations
movieSimilar
movieReviews

tvInfo
tvImages
tvKeywords
tvVideos
tvRecommendations
tvSimilar
tvReviews

personInfo
personImages
personCombinedCredits
*/

function App() {
  // tmdb
  //   .personLatest({ id: "974169" })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch(console.error);

  return (
    <div className="App">
      <div className="nav">
        <div className="logo">ShowStopper</div>
      </div>
    </div>
  );
}

export default App;
