import React, { useEffect, useState, useContext } from 'react';
import Header from '../../layouts/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../layouts/Footer/Footer';
import { API_MOVIES_URL, API_KEY } from '../../utils/constant';
import AppContext from '../../contexts/AppContext';
import Loading from '../../components/Loading/Loading';
import './MyList.css';
import MyMovieList from '../../components/MyMovieList/MyMovieList';
import MyTVList from '../../components/MyTVList/MyTVList';


const MyList = () => {
    const { myMovieList, onRemoveMovieFromList, myTVList, onRemoveTVFromList } = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tvShows, setTvShows] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(true);
    const [loadingTv, setLoadingTv] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const movieDetailsPromises = myMovieList.map(async (movieId) => {
                const movieUrl = `${API_MOVIES_URL.MOVIE_DETAIL}${movieId}?api_key=${API_KEY}`;
                const response = await fetch(movieUrl);
                const data = await response.json();
                return data;
            });

            const movieDetails = await Promise.all(movieDetailsPromises);
            setMovies(movieDetails);
            setLoadingMovie(false);
        };

        fetchMovies();
    }, [myMovieList]);

    useEffect(() => {
        const fetchTVShows = async () => {
            const tvShowDetailsPromises = myTVList.map(async (tvShowId) => {
                const tvShowUrl = `${API_MOVIES_URL.TV_DETAIL}${tvShowId}?api_key=${API_KEY}`;
                const response = await fetch(tvShowUrl);
                const data = await response.json();
                return data;
            });
            const tvShowDetails = await Promise.all(tvShowDetailsPromises);
            setTvShows(tvShowDetails);
            setLoadingTv(false);
        };
        fetchTVShows();
    }, [myTVList]);

    useEffect(() => {
        setLoading(loadingMovie && loadingTv);
    }, [loadingMovie, loadingTv]);

    return (
        <>
            <Header />
            <Banner />
            {loading ? (
                <Loading />
            ) : (
                <div className='my-list-container'>
                    <h2>My List</h2>
                    <MyMovieList movies={movies} onRemoveFromList={onRemoveMovieFromList} />
                    <MyTVList TVs={tvShows} onRemoveFromList={onRemoveTVFromList} />
                </div>
            )}

            <Footer />
        </>
    );
};

export default MyList;
