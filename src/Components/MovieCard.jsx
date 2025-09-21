import React from 'react';


function MovieCard({ movie, handleAddToWatchlist, watchList }) {
  const isAdded = watchList.some(item => item.imdbID === movie.imdbID);

  return (
    <div
      className="group relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-110 shadow-lg"
      style={{ backgroundImage: `url(${movie.Poster})` }}
    >
      <div
        onClick={() => !isAdded && handleAddToWatchlist(movie)}
        className={`absolute top-0 right-0 m-2 p-2 rounded-lg bg-gray-900/60 text-2xl ${isAdded ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {isAdded ? '✅' : '❤️'}
      </div>

      <div className="absolute bottom-0 w-full p-2 text-center text-white text-xl bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {movie.Title}
      </div>
    </div>
  );
}

export default MovieCard;
