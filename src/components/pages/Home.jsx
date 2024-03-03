import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../TheMovieDatabaseAPI';
import MoviesList from './movies/MoviesList';
import Loader from '../../components/Loader/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moviesArray, setMoviesArray] = useState([]);

  async function displayTrendingMovies() {
    try {
      const data = await fetchTrendingMovies();
      setMoviesArray(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    displayTrendingMovies();
  }, []);

  return (
    <main>
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          <h1>Trending today</h1>
          <MoviesList data={moviesArray} />
        </>
      )}
    </main>
  );
};

export default Home;
