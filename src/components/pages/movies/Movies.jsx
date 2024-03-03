import React, { useEffect, useState } from 'react';
import { createApiRequest } from '../../TheMovieDatabaseAPI';
import SearchBar from 'components/pages/movies/SearchBar';
import MoviesList from 'components/pages/movies/MoviesList';
import Loader from '../../Loader/Loader';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesArray, setMoviesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMoviesArray([]);
      return;
    }
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await createApiRequest(searchQuery, currentPage);
        setMoviesArray(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchQuery, currentPage]);

  const handleSubmit = event => {
    event.preventDefault();
    setSearchQuery(event.target[1].value);
    setCurrentPage(1);
    event.target.reset();
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      {!loading && !error && <MoviesList data={moviesArray} />}
      {totalPages > 0 && (
        <div className={styles.paginationContainer}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>{' '}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Movies;
