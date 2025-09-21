import React, { useState, useEffect } from "react"; // Corrected: Added useEffect import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import Banner from "./Components/Banner";
import "./App.css";

function App() {
  const [watchList, setWatchList] = useState([]);

  const handleAddToWatchlist = (movieObj) => {
    // Prevents adding duplicate movies
    if (!watchList.some(movie => movie.imdbID === movieObj.imdbID)) {
      const newWatchList = [...watchList, movieObj];
      setWatchList(newWatchList);
      localStorage.setItem('movies', JSON.stringify(newWatchList));
    }
  };

  // Load watchlist from localStorage on the first load
  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                handleAddToWatchlist={handleAddToWatchlist}
                watchList={watchList}
              />
            </>
          }
        />
        <Route
          path="/Watchlist"
          element={<Watchlist watchList={watchList} setWatchList={setWatchList} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;