import { useState } from "react";
import tmdb from "./tmdb";
import "./App.css";

function App() {
  tmdb
    .searchMovie({ query: "One" })
    .then((res) => {
      console.log(res);
    })
    .catch(console.error);
  return (
    <div className="App">
      <div>Hello</div>
    </div>
  );
}

export default App;
