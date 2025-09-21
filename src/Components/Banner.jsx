import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs only once when the component first loads
  useEffect(() => {
    // Fetch the first page of trending movies from your API route
    axios.get('/api/trending-movies?page=1')
      .then(response => {
        const movies = response.data.movies;
        // Make sure the movies array is not empty
        if (movies && movies.length > 0) {
          // Select a random movie from the list
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setBannerMovie(randomMovie);
        }
      })
      .catch(err => {
        console.error("Banner fetch error:", err);
        setError("Could not load banner image.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // The empty array [] means this effect runs only once on mount

  // Display a loading or error state
  if (isLoading) {
    return (
      <div className="h-[40vh] md:h-[60vh] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Banner...</div>
      </div>
    );
  }

  if (error || !bannerMovie) {
    return (
      <div className="h-[40vh] md:h-[60vh] bg-gray-800 flex items-center justify-center">
        <div className="text-red-400 text-2xl">{error || "Banner could not be displayed."}</div>
      </div>
    );
  }

  // Display the final banner with a random movie
  return (
    <div
      className="h-[40vh] md:h-[60vh] bg-cover bg-center flex items-end transition-all duration-500"
      style={{ backgroundImage: `url(${bannerMovie.Poster})` }}
    >
      <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">
        {bannerMovie.Title}
      </div>
    </div>
  );
}

export default Banner;