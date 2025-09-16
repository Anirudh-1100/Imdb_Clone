// File: /api/trending-movies.js
import axios from 'axios';

export default async function handler(req, res) {
    const traktApiKey = process.env.TRAKT_API_KEY;
    const omdbApiKey = process.env.OMDB_API_KEY;

    try {
        const traktUrl = `https://api.trakt.tv/movies/trending?limit=31`;

        const traktRes = await axios.get(traktUrl, {
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": traktApiKey,
            },
        });

        const traktMovies = traktRes.data;

        const omdbPromises = traktMovies.map(item =>
            axios.get(`https://www.omdbapi.com/?i=${item.movie.ids.imdb}&apikey=${omdbApiKey}`)
        );

        const omdbResults = await Promise.allSettled(omdbPromises);

        const moviesData = omdbResults
            .filter(result => result.status === 'fulfilled' && result.value.data.Poster !== 'N/A')
            .map(result => result.value.data);

        res.status(200).json(moviesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching trending movies." });
    }
}