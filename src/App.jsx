import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import Banner from "./Components/Banner";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

   const [watchList, setWatchList] = useState([]);

  const handleAddToWatchlist = (movieObj) => {
    if (!watchList.some(movie => movie.imdbID === movieObj.imdbID)) {
      const newWatchList = [...watchList, movieObj];
      setWatchList(newWatchList);
      localStorage.setItem('movies', JSON.stringify(newWatchList));
    }
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies  handleAddToWatchlist={ handleAddToWatchlist} />
              </>
            }
          >
           
          </Route>

          <Route path="/Watchlist" element={<Watchlist watchList={watchList} setWatchList={setWatchList} />}>
      
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
