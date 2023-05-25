import React, { useEffect, useState, useContext } from 'react';
import Header from '../../layouts/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../layouts/Footer/Footer';
import { API_MOVIES_URL, API_KEY, PREFIX_IMAGE } from '../../utils/constant';
import AppContext from '../../contexts/AppContext';
import Loading from '../../components/Loading/Loading';
import './MyList.css';
import { BsStarFill } from 'react-icons/bs';

const MyList = () => {
    const { myList } = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const movieDetailsPromises = myList.map(async (movieId) => {
                const movieUrl = `${API_MOVIES_URL.MOVIE_DETAIL}${movieId}?api_key=${API_KEY}`;
                const response = await fetch(movieUrl);
                const data = await response.json();
                return data;
            });

            const movieDetails = await Promise.all(movieDetailsPromises);
            setMovies(movieDetails);
            setLoading(false);
        };

        fetchMovies();
    }, []);

    return (
        <>
            <Header />
            <Banner />

            {loading ? (
                <Loading />
            ) : (
                <div className='my-list-container'>
                    <h2>My List</h2>
                    {movies.map((movie) => (

                        <div key={movie.id} className='my-list-movie'>
                            <div className="my-list-movie-img">
                                <img src={`${PREFIX_IMAGE}${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="my-list-movie-info">
                                <div className="my-list-overview">{movie.title}</div>
                                <p> {movie.overview}</p>
                                <div className="my-list-categories">
                                    <span className="my-list-vote">{movie.vote_average} <BsStarFill /></span>
                                    <span className="my-list-release-date">Released: {movie.release_date}</span>
                                </div>
                                <span className="my-list-genres">Genres: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</span>
                            </div>
                        </div>
                    ))}
                </div >
            )}

            <Footer />
        </>
    );
};

export default MyList;
