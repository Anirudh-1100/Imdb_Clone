// File: /src/Movies.js
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/trending-movies")
      .then(response => {
        setMovies(response.data);
        console.log(movies);
      })
      .catch(err => {
        console.error("Failed to fetch trending movies:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center text-2xl mt-10">Loading Movies...</div>;
  }

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} name={movie.title} />
        ))}
      </div>
    </div>
   
  );
}

export default Movies;