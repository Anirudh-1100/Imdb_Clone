import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import Banner from "./Components/Banner";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  let [watchList, setWatchList] = useState([])

  let handleAddToWatchlist = (movieObj) =>{
        let watchList = [...watchList , movieObj]
        setWatchList(newWatchList)
        console.log(newWatchList)
  }
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

          <Route path="/Watchlist" element={<Watchlist />}>
      
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
