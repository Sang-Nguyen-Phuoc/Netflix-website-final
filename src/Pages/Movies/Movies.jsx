import MovieList from "../../components/MovieList/MovieList";
import { API_MOVIES_URL } from "../../utils/constant";
import useFetch from "../../hooks/useFetch/useFetch";
import Banner from "../../components/Banner/Banner";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Movies = () => {
    const { data: popularMovies, isLoading: popularMovieLoading } = useFetch(
        API_MOVIES_URL.POPULAR
    );
    const { data: upComingMovies, isLoading: upcomingMovieLoading } = useFetch(
        API_MOVIES_URL.UPCOMING
    );
    const { data: topRatedMovies, isLoading: topRatedMovieLoading } = useFetch(
        API_MOVIES_URL.TOP_RATED
    );
    const { data: nowPlayingMovies, isLoading: nowPlayingMovieLoading } = useFetch(
        API_MOVIES_URL.NOW_PLAYING
    );
    const { data: TRENDING_MOVIES, isLoading: trendingMovieLoading } = useFetch(API_MOVIES_URL.TRENDING_MOVIES);
    const { data: DISCOVER_MOVIE, isLoading: discoerverMovieLoading } = useFetch(API_MOVIES_URL.DISCOVER_MOVIE);

    const isLoading =
        trendingMovieLoading || popularMovieLoading || upcomingMovieLoading || topRatedMovieLoading || nowPlayingMovieLoading || discoerverMovieLoading;
    return (
        <div className="home">
            {isLoading ? (
                <>
                    <div className="NetflixIntro"><Loading /></div>
                </>
            ) : (
                <main>
                    <Header />
                    <Banner />
                    <MovieList
                        listTitle="Popular Movie"
                        movieData={popularMovies.results}
                    />
                    <MovieList
                        listTitle="Trending Movie"
                        movieData={TRENDING_MOVIES.results}
                    />
                    <MovieList
                        listTitle="Top Rated Movie"
                        movieData={topRatedMovies.results}
                    />
                    <MovieList
                        listTitle="Up Coming Movie"
                        movieData={upComingMovies.results}
                    />
                    <MovieList
                        listTitle="Now Playing Movie"
                        movieData={nowPlayingMovies.results}
                    />
                    <MovieList
                        listTitle="Discover Movie"
                        movieData={DISCOVER_MOVIE.results}
                    />
                    <Footer />
                </main>
            )
            }
        </div >
    );
};

export default Movies