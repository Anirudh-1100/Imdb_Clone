import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import Banner from "./Components/Banner";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies />
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
