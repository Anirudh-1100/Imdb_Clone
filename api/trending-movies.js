// File: /api/trending-movies.js
import axios from 'axios';

export default async function handler(req, res) {
    const traktApiKey = process.env.TRAKT_API_KEY;
    const omdbApiKey = process.env.OMDB_API_KEY;

    // 1. Get page and limit from the request query, with default values.
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 31;

    try {
        // 2. Add the page and limit parameters to the Trakt API URL.
        const traktUrl = `https://api.trakt.tv/movies/trending?page=${page}&limit=${limit}`;

        const traktRes = await axios.get(traktUrl, {
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": traktApiKey,
            },
        });

        // 3. Extract pagination info from Trakt's response headers.
        const pagination = {
            currentPage: parseInt(traktRes.headers['x-pagination-page'], 10),
            pageCount: parseInt(traktRes.headers['x-pagination-page-count'], 10),
            itemCount: parseInt(traktRes.headers['x-pagination-item-count'], 10),
        };

        const traktMovies = traktRes.data;

        // The rest of your logic remains the same.
        const omdbPromises = traktMovies.map(item =>
            axios.get(`https://www.omdbapi.com/?i=${item.movie.ids.imdb}&apikey=${omdbApiKey}`)
        );

        const omdbResults = await Promise.allSettled(omdbPromises);

        const moviesData = omdbResults
            .filter(result => result.status === 'fulfilled' && result.value.data.Poster !== 'N/A')
            .map(result => result.value.data);

        // 4. Return the movie data AND the pagination object in the response.
        res.status(200).json({
            movies: moviesData,
            pagination: pagination
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching trending movies." });
    }
}