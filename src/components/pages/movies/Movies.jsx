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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMoviesArray([]);
      return;
    }
    fetchMovies();
  }, [searchQuery, currentPage]);

  async function fetchMovies() {
    setLoading(true);
    try {
      const data = await createApiRequest(searchQuery, currentPage);
      console.log(data.total_pages);
      setMoviesArray(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const renderPagination = () => {
    const maxButtons = 5;
    const startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    const pages = [];
    if (startPage > 1) {
      pages.push(
        <button key="1" onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="startEllipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="endEllipsis">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

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
      {totalPages > 0 && (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Movies;
