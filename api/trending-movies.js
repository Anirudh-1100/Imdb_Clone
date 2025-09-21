// This file runs on the server and is not blocked by CORS.
// Its job is to safely fetch data from external APIs.
import axios from 'axios';

export default async function handler(req, res) {
    const traktApiKey = process.env.TRAKT_API_KEY;
    const omdbApiKey = process.env.OMDB_API_KEY;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = 20;

    try {
        // 1. Fetch the list of trending movies from Trakt
        const traktUrl = `https://api.trakt.tv/movies/trending?page=${page}&limit=${limit}`;
        const traktRes = await axios.get(traktUrl, {
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": traktApiKey,
            },
        });

        // 2. For each movie, fetch detailed info (like posters) from OMDb
        const omdbPromises = traktRes.data.map(item =>
            axios.get(`https://www.omdbapi.com/?i=${item.movie.ids.imdb}&apikey=${omdbApiKey}`)
        );
        const omdbResults = await Promise.allSettled(omdbPromises);

        // 3. Filter and clean the final data
        const moviesData = omdbResults
            .filter(result => result.status === 'fulfilled' && result.value.data.Poster !== 'N/A' && result.value.data.imdbRating !== 'N/A')
            .map(result => result.value.data);

        // 4. Send the complete data back to your frontend
        res.status(200).json({
            movies: moviesData,
            pagination: {
                currentPage: parseInt(traktRes.headers['x-pagination-page'], 10),
                pageCount: parseInt(traktRes.headers['x-pagination-page-count'], 10),
            },
        });

    } catch (error) {
        console.error("API Route Error:", error.message);
        res.status(500).json({ message: "Error fetching trending movies." });
    }
}