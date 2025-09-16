import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="group relative h-[40vh] w-[200px] rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-110">
      {/* Poster Image */}
      <div
        className="h-full w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${movie.Poster})` }}
      ></div>

     
    </div>
  );
}

export default MovieCard;
