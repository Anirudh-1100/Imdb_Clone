import React, { useState } from 'react';


function Watchlist({ watchList, setWatchList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentGenre, setCurrentGenre] = useState('All Genres');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleRemoveFromWatchlist = (movieToRemove) => {
    const newWatchlist = watchList.filter((movie) => movie.imdbID !== movieToRemove.imdbID);
    setWatchList(newWatchlist);
    localStorage.setItem('movies', JSON.stringify(newWatchlist));
  };

  const genres = ['All Genres', ...new Set(watchList.flatMap(movie => movie.Genre.split(', ')))];

  const filteredAndSortedList = watchList
    .filter((movie) => {
      if (currentGenre === 'All Genres') return true;
      return movie.Genre.includes(currentGenre);
    })
    .filter((movie) => movie.Title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const ratingA = parseFloat(a.imdbRating);
      const ratingB = parseFloat(b.imdbRating);
      return sortOrder === 'desc' ? ratingB - ratingA : ratingA - ratingB;
    });

  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setCurrentGenre(genre)} className={`h-12 px-4 rounded-xl text-white font-bold mx-2 my-1 transition-colors ${currentGenre === genre ? 'bg-blue-600' : 'bg-gray-400/50 hover:bg-gray-500'}`}>
            {genre}
          </button>
        ))}
      </div>

      <div className='flex justify-center items-center my-4 space-x-4'>
        <input type='text' placeholder='Search Your Watchlist' className='h-12 w-72 bg-gray-200 outline-none px-4 rounded-lg' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className='flex items-center space-x-2 text-lg text-gray-600'>
          <i onClick={() => setSortOrder('desc')} className={`fa-solid fa-arrow-down-z-a p-2 rounded-full cursor-pointer hover:bg-gray-200 ${sortOrder === 'desc' ? 'text-blue-600' : ''}`} title="Sort by Rating (Descending)"></i>
          <i onClick={() => setSortOrder('asc')} className={`fa-solid fa-arrow-up-a-z p-2 rounded-full cursor-pointer hover:bg-gray-200 ${sortOrder === 'asc' ? 'text-blue-600' : ''}`} title="Sort by Rating (Ascending)"></i>
        </div>
      </div>
      
      <div className='overflow-x-auto rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-gray-700 text-center'>
          <thead className='border-b-2 bg-gray-100'>
            <tr>
              <th className='p-4'>Name</th>
              <th>Rating</th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedList.length > 0 ? (
              filteredAndSortedList.map((movie) => (
                <tr key={movie.imdbID} className='border-b-2 hover:bg-gray-50'>
                  <td className='flex items-center px-6 py-2 min-w-[300px]'>
                    <img className='h-24 w-16 object-cover rounded-md shadow-lg' src={movie.Poster} alt={`${movie.Title} poster`} />
                    <div className='mx-10 font-semibold text-left'>{movie.Title}</div>
                  </td>
                  <td className='font-medium'>{movie.imdbRating} ⭐</td>
                  <td className='font-medium'>{movie.Metascore}</td>
                  <td>{movie.Genre.split(',')[0]}</td>
                  <td>
                    <button onClick={() => handleRemoveFromWatchlist(movie)} className='text-red-600 hover:text-red-800 font-bold px-4 py-2 rounded-lg hover:bg-red-100'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-xl py-10">Your watchlist is empty. Go add some movies! 🍿</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;