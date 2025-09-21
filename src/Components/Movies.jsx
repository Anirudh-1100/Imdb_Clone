
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddToWatchlist, watchList }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [error, setError] = useState(null);

  const handleNext = () => setPage(prev => Math.min(prev + 1, paginationInfo.pageCount));
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    
    axios.get(`/api/trending-movies?page=${page}`, { signal: controller.signal })
      .then(response => {
        setMovies(response.data.movies);
        setPaginationInfo(response.data.pagination);
      })
      .catch(err => {
        if (axios.isCancel(err)) return; 
        console.error("Failed to fetch movies:", err);
        setError("Could not fetch movies. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [page]);

  if (isLoading) return <div className="text-center text-2xl mt-10">Loading Movies...</div>;
  if (error) return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            handleAddToWatchlist={handleAddToWatchlist}
            watchList={watchList}
          />
        ))}
      </div>
      <Pagination
        page={page}
        pageCount={paginationInfo.pageCount}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;