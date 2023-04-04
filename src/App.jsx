import { useState, useEffect, useContext } from "react";
import tmdb from "./tmdb";
import "./App.css";
import { DataContext } from "./context/DataProvider";
import supabase from "./supabase";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const { Email, setEmail, User, setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.info("Successfully logged out!");
    setUser(null);
    setEmail(null);
  };

  useEffect(() => {
    if (!User) navigate("/Login");
  }, [User]);

  return (
    <div className="App">
      <div className="nav">
        <div className="logo">ShowStopper</div>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
