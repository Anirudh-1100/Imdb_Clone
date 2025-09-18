import React from "react";

function MovieCard({ movie, name }) {
  return (
    <div className="group relative h-[40vh] w-[200px] rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-110">
      <div
        className="h-full w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${movie.Poster})` }}
        
      ></div>
       <div className="bg-gray-400 text-white text-center h-[2rem] w-[full]">
        {name.Title}
      </div>

     

     
    </div>
  );
}

export default MovieCard;
