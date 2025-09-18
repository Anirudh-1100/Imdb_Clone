// File: /src/Movies.js
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (page < paginationInfo.pageCount) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    axios.get(`/api/trending-movies?page=${page}`, { signal: controller.signal })
      .then(response => {
        if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies); 
          setPaginationInfo(response.data.pagination);
        } else {
          setError("Received invalid data from server.");
          setMovies([]); 
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          return;
        }
        setError("Could not fetch movies. Please try again later.");
        console.error("Failed to fetch trending movies:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page]);

  if (isLoading) {
    return <div className="text-center text-2xl mt-10">Loading Movies...</div>;
  }
  
  if (error) {
    return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-5">
        <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} name={movie.Title} />
          ))}
        </div>
      </div>
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