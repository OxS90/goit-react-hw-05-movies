import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../TheMovieDatabaseAPI';
import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import styles from './Cast.module.css';

const Cast = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const response = await fetchMovieCast(movieId);
        const modifiedCredits = response.cast.map(actor => ({
          ...actor,
          profile_path: actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : 'https://source.unsplash.com/500x750/?no-photo',
        }));
        setCredits(modifiedCredits);
      } catch (error) {
        console.error('Error fetching cast:', error);
      } finally {
        setLoading(false);
      }
    }
    if (!movieId) return;
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {credits.length > 0 ? (
        credits.map(({ profile_path, name, character, id }) => {
          return (
            <div key={id} className={styles.cast_item}>
              <img
                src={profile_path}
                alt={name}
                className={styles.cast_image}
              />
              <div className={styles.cast_details}>
                <span className={styles.cast_name}>{name}</span>
                <span className={styles.cast_character}>
                  Character: {character}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <i>   Sorry! There are no infos about casting.</i>
      )}
    </div>
  );
};

export default Cast;
