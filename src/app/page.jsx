import Featured from "@/components/Featured";
import MovieRow from "@/components/MovieRow";

function App() {
  // const containerRefs = useRef([]);

  // const setContainerRef = (index) => (ref) => {
  //   containerRefs.current[index] = ref;
  // };

  // const handleScroll = (index, scrollOffset) => {
  //   const newScrollLeft =
  //     containerRefs.current[index].scrollLeft + scrollOffset;
  //   containerRefs.current[index].scrollTo({
  //     left: newScrollLeft,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="App">
      <Featured />
      <MovieRow
        {...{
          index: 0,
          type: "pop",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 1,
          genre: 37,
          type: "tv",
          title: "ShowStopper Originals",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 2,
          genre: 16,
          title: "Animated",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 3,
          genre: 28,
          title: "Action",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 4,
          genre: 35,
          title: "Comedy",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 5,
          genre: 878,
          title: "Sci-Fi",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 6,
          genre: 80,
          title: "Crime",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 7,
          genre: 12,
          title: "Adventure",
          // handleScroll,
          // setContainerRef,
        }}
      />
      <MovieRow
        {...{
          index: 8,
          genre: 37,
          title: "Western",
          // handleScroll,
          // setContainerRef,
        }}
      />
    </div>
  );
}

export default App;
