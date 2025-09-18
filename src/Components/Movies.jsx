// File: /src/Movies.js
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. State for pagination
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});

  // 2. Handlers to change the current page
  const handleNext = () => {
    // Only go to the next page if it's not the last one
    if (page < paginationInfo.pageCount) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    // Only go to the previous page if it's not the first one
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  // 3. useEffect now depends on `page`
  // It will re-run whenever the page number changes.
  useEffect(() => {
    setIsLoading(true); // Set loading to true when a new page is requested
    axios.get(`/api/trending-movies?page=${page}`)
      .then(response => {
        // 4. API response is now an object, so we access `response.data.movies`
        setMovies(response.data);
        console.log("API RESPONSE:", response.data); 
        setPaginationInfo(response.data.pagination);
      })
      .catch(err => {
        console.error("Failed to fetch trending movies:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]); // Dependency array includes `page`

  if (isLoading) {
    return <div className="text-center text-2xl mt-10">Loading Movies...</div>;
  }

  return (
    // Use a React Fragment <> to return multiple elements
    <>
      <div className="p-5">
        <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} name={movie.Title} />
          ))}
        </div>
      </div>

      {/* 5. Render the Pagination component and pass props */}
      <Pagination
        page={page}
        pageCount={paginationInfo.pageCount}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </>
  );
}

export default Movies;