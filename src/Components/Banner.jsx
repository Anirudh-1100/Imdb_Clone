import React from "react";

function Banner() {
  return (
    <div
      className=" h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage:
          "url(https://images8.alphacoders.com/137/1371732.jpeg)",
      }}
    >
      <div className="text-white text-xl text-center  w-full bg-gray-900/60 p4">
        Avengers Doomsday
      </div>
    </div>
  );
}

export default Banner;
