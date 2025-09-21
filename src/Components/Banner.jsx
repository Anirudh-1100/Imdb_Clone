import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/trending-movies?page=1')
      .then(response => {
        const movies = response.data.movies;
        if (movies && movies.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setBannerMovie(randomMovie);
        }
      })
      .catch(err => {
        console.error("Banner fetch error:", err);
        setError("Could not load banner.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Banner...</div>
      </div>
    );
  }

  if (error || !bannerMovie) {
    return (
      <div className="h-[60vh] bg-gray-800 flex items-center justify-center">
        <div className="text-red-400 text-2xl">{error || "Banner could not be displayed."}</div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerMovie.Poster})` }}
    >
      
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full gap-8 p-4">
        
       
        <img
          src={bannerMovie.Poster}
          alt={`${bannerMovie.Title} Poster`}
          className="h-4/5 rounded-xl shadow-2xl"
        />

      
        <div className="text-white text-4xl md:text-5xl font-bold text-center md:text-left">
          {bannerMovie.Title}
        </div>
      </div>
    </div>
  );
}

export default Banner;