import axios from "axios";
import {apiKey} from "../constants";

// endpoints
const apiBaseURL = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const moviesDetailsEndpoints = id => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditEndpoints = id => `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndpoints = id => `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`;

// person endpoints
const personDetailsEndpoints = id => `${apiBaseURL}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoints = id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`;

// search movie endpoints
const searchMovieEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
	const options = {
		method: 'GET',
		url: endpoint,
		params: params? params: {}
	}
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.log(error);
		return {}
	}
}

/**
 * Fetches the trending movies.
 *
 * @return {Promise} A Promise that resolves to the API response.
 */
export const fetchTrendingMovies = () => {
	return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
	return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
	return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
	return apiCall(moviesDetailsEndpoints(id));
}

export const fetchMovieCredit = id => {
	return apiCall(movieCreditEndpoints(id));
}

export const fetchSimilarMovies = id => {
	return apiCall(similarMovieEndpoints(id));
}

export const fetchPersonDetails = id => {
	return apiCall(personDetailsEndpoints(id));
}

export const fetchPersonMovies = id => {
	return apiCall(personMoviesEndpoints(id));
}

export const fetchSearchMovie = params => {
	return apiCall(searchMovieEndpoint, params);
}
