import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';
const ApiKey = '26403446d47ffcf1e63ea3d7f76a57eb';

async function fetchTrendingMovies() {
  try {
    const response = await axios.get(`${baseUrl}/trending/movie/day`, {
      params: {
        api_key: ApiKey,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    throw error;
  }
}

async function createApiRequest(searchQuery, pageNumber) {
  try {
    const response = await axios.get(`${baseUrl}/search/movie`, {
      params: {
        query: searchQuery,
        page: pageNumber,
        api_key: ApiKey,
        include_adult: false,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    throw error;
  }
}

async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`${baseUrl}movie/${movieId}`, {
      params: {
        api_key: ApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    throw error;
  }
}

async function fetchMovieCast(movieId) {
  try {
    const response = await axios.get(`${baseUrl}movie/${movieId}/credits`, {
      params: {
        api_key: ApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    throw error;
  }
}

async function fetchMovieReviews(movieId) {
  try {
    const response = await axios.get(`${baseUrl}movie/${movieId}/reviews`, {
      params: {
        api_key: ApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    throw error;
  }
}

export {
  fetchTrendingMovies,
  createApiRequest,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};
