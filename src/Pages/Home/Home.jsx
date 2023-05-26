

import React, { useContext } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { API_MOVIES_URL } from "../../utils/constant";
import useFetch from "../../hooks/useFetch/useFetch";
import Banner from "../../components/Banner/Banner";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import AppContext from "../../contexts/AppContext";
import Login from "../Login/Login";
import TVList from "../../components/TVList/TVList";

const Home = () => {
  const { isAuthenticated } = useContext(AppContext);
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
  const { data: TRENDING_MOVIES, isLoading: trendingMovieLoading } = useFetch(
    API_MOVIES_URL.TRENDING_MOVIES
  );
  const { data: DISCOVER_MOVIE, isLoading: discoverMovieLoading } = useFetch(
    API_MOVIES_URL.DISCOVER_MOVIE
  );
  const { data: TV_LIST_POPULAR, isLoading: TVListLoading } = useFetch(
    API_MOVIES_URL.TV_LIST_POPULAR
  );
  const { data: TV_LIST_TOP_RATED, isLoading: TVListTopRatedLoading } = useFetch(
    API_MOVIES_URL.TV_LIST_TOP_RATED
  );
  const { data: TV_LIST_TRENDING, isLoading: TVListTrendingLoading } = useFetch(
    API_MOVIES_URL.TV_LIST_TRENDING
  );
  const { data: DISCOVER_TV, isLoading: discoverTVLoading } = useFetch(
    API_MOVIES_URL.DISCOVER_TV
  );

  const isLoading =
    trendingMovieLoading ||
    popularMovieLoading ||
    upcomingMovieLoading ||
    topRatedMovieLoading ||
    nowPlayingMovieLoading ||
    TVListLoading ||
    TVListTopRatedLoading ||
    TVListTrendingLoading ||
    discoverMovieLoading ||
    discoverTVLoading;

  console.log(isAuthenticated);
  return (
    <div className="home">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          {isLoading ? (
            <div className="NetflixIntro">
              <Loading />
            </div>
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
                listTitle="Upcoming Movie"
                movieData={upComingMovies.results}
              />
              <MovieList
                listTitle="Now Playing Movie"
                movieData={nowPlayingMovies.results}
              />
              <TVList
                listTitle="Discover Movie"
                TVData={DISCOVER_MOVIE.results}
              />
              <TVList
                listTitle="Trending TV Series"
                TVData={TV_LIST_TRENDING.results}
              />
              <TVList
                listTitle="Popular TV Series"
                TVData={TV_LIST_POPULAR.results}
              />
              <TVList
                listTitle="Top Rated TV Series"
                TVData={TV_LIST_TOP_RATED.results}
              />
              <TVList
                listTitle="Discover TV Series"
                TVData={DISCOVER_TV.results}
              />
              <Footer />
            </main>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
