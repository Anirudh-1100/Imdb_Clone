import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddToWatchlist, watchList }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState(null);

  const handleNext = () => setPage(prevPage => Math.min(prevPage + 1, pageCount));
  const handlePrev = () => setPage(prevPage => Math.max(prevPage - 1, 1));

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const traktApiKey = process.env.REACT_APP_TRAKT_API_KEY;
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
    const limit = 20;
    const traktUrl = `https://api.trakt.tv/movies/trending?page=${page}&limit=${limit}`;

    axios.get(traktUrl, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": traktApiKey,
      },
      signal: controller.signal
    })
    .then(traktRes => {
      setPageCount(parseInt(traktRes.headers['x-pagination-page-count'], 10));
      const traktMovies = traktRes.data;

      const omdbPromises = traktMovies.map(item =>
        axios.get(`https://www.omdbapi.com/?i=${item.movie.ids.imdb}&apikey=${omdbApiKey}`, { signal: controller.signal })
      );

      return Promise.allSettled(omdbPromises);
    })
    .then(omdbResults => {
      const moviesData = omdbResults
        .filter(result => result.status === 'fulfilled' && result.value.data.Poster !== 'N/A' && result.value.data.imdbRating !== 'N/A')
        .map(result => result.value.data);
      setMovies(moviesData);
    })
    .catch(err => {
      if (axios.isCancel(err)) return;
      setError("Could not fetch movies. Please try again later.");
      console.error(err);
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
        pageCount={pageCount}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;