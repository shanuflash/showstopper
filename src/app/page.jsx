import Featured from "@/components/Featured";
import MovieRow from "@/components/MovieRow";

function App() {
  return (
    <div className="App">
      <Featured />
      <MovieRow type="pop" />
      <MovieRow
        {...{
          genre: 37,
          type: "tv",
          title: "ShowStopper Originals",
        }}
      />
      <MovieRow
        {...{
          genre: 16,
          title: "Animated",
        }}
      />
      <MovieRow
        {...{
          genre: 28,
          title: "Action",
        }}
      />
      <MovieRow
        {...{
          genre: 35,
          title: "Comedy",
        }}
      />
      <MovieRow
        {...{
          genre: 878,
          title: "Sci-Fi",
        }}
      />
      <MovieRow
        {...{
          genre: 80,
          title: "Crime",
        }}
      />
      <MovieRow
        {...{
          genre: 12,
          title: "Adventure",
        }}
      />
      <MovieRow
        {...{
          genre: 37,
          title: "Western",
        }}
      />
    </div>
  );
}

export default App;
