import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../TheMovieDatabaseAPI';
import Loader from '../../Loader/Loader';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchDetails();
  }, [movieId]);

  async function fetchDetails() {
    try {
      const data = await fetchMovieDetails(movieId);
      if (data.poster_path === null) {
        data.poster_path = 'https://source.unsplash.com/500x750/?no-photo';
      } else {
        data.poster_path =
          'https://www.themoviedb.org/t/p/w500' + data.poster_path;
      }
      setMovieDetails(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  if (!movieDetails) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        <img src={movieDetails.poster_path} alt={movieDetails.title} />
        <div>
          <h1>
            {movieDetails.title}
            <br></br>({movieDetails.release_date.substring(0, 4)})
          </h1>
          <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          <p>{movieDetails.genres.map(genre => genre.name).join(' ')}</p>
        </div>
      </div>
      <h3>Aditional information</h3>
      <div>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};
MovieDetails.propTypes = {
  movieDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default MovieDetails;
