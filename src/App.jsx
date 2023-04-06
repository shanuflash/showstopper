import { useState, useEffect, useContext, useRef } from "react";
import tmdb from "./tmdb";
import "./App.css";
import { DataContext } from "./context/DataProvider";
import supabase from "./supabase";

import { toast } from "react-toastify";
import { useNavigate, Link, ScrollRestoration } from "react-router-dom";
import Nav from "./components/Nav";
import MovieRow from "./components/MovieRow";

function App() {
  const { User, SessionCheck } = useContext(DataContext);

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

  const containerRefs = useRef([]);

  const handleScroll = (index, scrollOffset) => {
    const newScrollLeft =
      containerRefs.current[index].scrollLeft + scrollOffset;
    containerRefs.current[index].scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const setContainerRef = (index) => (ref) => {
    containerRefs.current[index] = ref;
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (SessionCheck) {
      if (!User) {
        navigate("/Login");
      }
    }
  }, [SessionCheck, User]);

  return (
    <div className="App">
      <ScrollRestoration />
      <Nav />
      <div
        className="master"
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
        <div className="featured">
          <div className="featured-left">
            <div className="featured-icon">Featured</div>
            <div className="featured-title">
              {Featured.title || Featured.name}
            </div>
            <div className="featured-desc">{Featured.overview}</div>
          </div>
        </div>
      </div>
      <MovieRow
        {...{
          index: 0,
          type: "pop",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 1,
          genre: 37,
          type: "tv",
          title: "ShowStopper Originals",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 2,
          genre: 16,
          title: "Animated",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 3,
          genre: 28,
          title: "Action",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 4,
          genre: 35,
          title: "Comedy",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 5,
          genre: 878,
          title: "Sci-Fi",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 6,
          genre: 80,
          title: "Crime",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 7,
          genre: 12,
          title: "Adventure",
          handleScroll,
          setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 8,
          genre: 37,
          title: "Western",
          handleScroll,
          setContainerRef,
        }}
      />
      {/* <div className="test1"></div> */}
    </div>
  );
}

export default App;
