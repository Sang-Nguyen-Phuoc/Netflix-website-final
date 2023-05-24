export const BASE_API_URL = "https://api.themoviedb.org/3";
export const API_KEY = "c2077b3b345882782397016e1fdc388b";
export const PREFIX_IMAGE = "https://image.tmdb.org/t/p/original";


export const API_MOVIES_URL = {
    TRENDING_MOVIES: `${BASE_API_URL}/trending/movie/day?api_key=${API_KEY}`,
    POPULAR: `${BASE_API_URL}/movie/popular?api_key=${API_KEY}`,
    TOP_RATED: `${BASE_API_URL}/movie/top_rated?api_key=${API_KEY}`,
    UPCOMING: `${BASE_API_URL}/movie/upcoming?api_key=${API_KEY}`,
    NOW_PLAYING: `${BASE_API_URL}/movie/now_playing?api_key=${API_KEY}`,
    TV_LIST_POPULAR: `${BASE_API_URL}/tv/popular?api_key=${API_KEY}`,
    TV_LIST_TRENDING: `${BASE_API_URL}/trending/tv/day?api_key=${API_KEY}`,
    TV_LIST_TOP_RATED: `${BASE_API_URL}/tv/top_rated?api_key=${API_KEY}`,
    DISCOVER_MOVIE: `${BASE_API_URL}/discover/movie?api_key=${API_KEY}`,
    DISCOVER_TV: `${BASE_API_URL}/discover/tv?api_key=${API_KEY}`,
    MOVIE_DETAIL: `${BASE_API_URL}/movie/`,
}
