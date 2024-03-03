import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../TheMovieDatabaseAPI';
import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const response = await fetchMovieReviews(movieId);
        setReviewsList(response.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (!movieId) return;
    fetchReviews();
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {error && <span>Error: {error}</span>}
      {!loading && !error && (
        <>
          {!reviewsList.length ? (
            <span>
              There are no reviews for this movie. Be the first one to leave
              one!
            </span>
          ) : (
            <div>
              {reviewsList.map(review => {
                return (
                  <div key={review.id} className={styles.review}>
                    <span className={styles.review_author}>
                      {review.author}
                    </span>
                    <p className={styles.review_content}>{review.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Reviews;
