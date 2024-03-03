import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MoviesList.module.css';

const MoviesList = ({ data }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {data.map(movie => {
          return (
            <li key={movie.id} className={styles.movie_item}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
                className={styles.movie_link}
              >
                {movie.title} ({movie.release_date.substring(0, 4)})
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

MoviesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MoviesList;
