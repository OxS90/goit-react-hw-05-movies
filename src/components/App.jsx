import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
const LazyMovies = React.lazy(() => import('./pages/movies/Movies'));
const LazyMovieDetails = React.lazy(() =>
  import('./pages/movies/MovieDetails')
);
const LazyCast = React.lazy(() => import('./pages/movies/Cast'));
const LazyReviews = React.lazy(() => import('./pages/movies/Reviews'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<LazyMovies />} />
        <Route path="movies/:movieId" element={<LazyMovieDetails />}>
          <Route path="cast" element={<LazyCast />} />
          <Route path="reviews" element={<LazyReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
