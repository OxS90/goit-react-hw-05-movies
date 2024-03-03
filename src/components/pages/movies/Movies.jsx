import React, { useEffect, useState } from 'react';
import { createApiRequest } from '../../TheMovieDatabaseAPI';
import SearchBar from 'components/pages/movies/SearchBar';
import MoviesList from 'components/pages/movies/MoviesList';
import Loader from '../../Loader/Loader';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesArray, setMoviesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMoviesArray([]);
      return;
    }
    fetchMovies();
  }, [searchQuery]);

  async function fetchMovies() {
    setLoading(true);
    try {
      const data = await createApiRequest(searchQuery, 1);
      setMoviesArray(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    setSearchQuery(event.target[1].value);
    document.querySelector('input').value = '';
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      {!loading && !error && <MoviesList data={moviesArray} />}
    </>
  );
};

export default Movies;
