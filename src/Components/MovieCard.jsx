import React from "react";

function MovieCard({ movie, name }) {
  return (
    <div className="group relative h-[40vh] w-[200px] rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-110">
      <div
        className="h-full w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${movie.Poster})` }}
        
      ></div>
      <div>
        &#128525;
      </div>
       <div className="absolute bottom-0 w-full p-2 text-center text-white text-xl bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {name}
      </div>

     

     
    </div>
  );
}

export default MovieCard;
