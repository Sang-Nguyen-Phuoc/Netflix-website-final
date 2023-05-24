import React from "react";
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch/useFetch';
import { PREFIX_IMAGE } from '../../utils/constant';
import "./MovieDetail.css";
import Header from "../../layouts/Header/Header";
import { BASE_API_URL, API_KEY } from '../../utils/constant';
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { useState } from "react";
import { BsStarFill } from 'react-icons/bs';
import Footer from "../../layouts/Footer/Footer";
import { CiPlay1 } from 'react-icons/ci';
const MovieDetail = () => {
    const params = useParams();
    const { movieId } = params;
    const movieDetailAPIUrl = `${BASE_API_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const { data: movieDetail, isLoading } = useFetch(movieDetailAPIUrl, {});
    const { title, poster_path, release_date, vote_average, genres, overview, tagline, runtime } = movieDetail;
    console.log(movieDetail);
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const onHandleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                    console.log(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };


    if (isLoading) {
        return "Loading...";
    }

    return (
        <div className="movie-detail-container">
            <div><Header /></div>
            <div className='singleHeading'>
                <h1>{title} </h1> <span> | {runtime} mins | </span> <span> HD </span>
            </div>
            <div className="movie-detail">
                <div className="movie-img">
                    <img src={`${PREFIX_IMAGE}${poster_path}`} alt="title" />
                </div>
                <div className="movie-info">
                    {/* {tagline && <div className="blockquote-wrapper">
                        <div className="blockquote">
                            <h2>{tagline}</h2>
                            <h4>—Tag line—<br /><em>{title}</em></h4>
                        </div>
                    </div>} */}
                    <div className="movie-info-overview">
                        <div className="overview">Overview</div>
                        <p> {overview}</p>
                        <div className="categories">
                            <span className="vote">{vote_average} <BsStarFill /></span>
                            <span className="release-date">Released: {release_date}</span>
                        </div>
                        <span className="genres">Genres: {genres && genres.map((genre) => genre.name).join(", ")}</span>
                        <div className="trailer">
                            <button className="play-trailer" onClick={() => onHandleClick(movieDetail)}> <CiPlay1 className="play-icon" /> Play Trailer</button>
                        </div>
                        <div>
                            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                        </div>
                    </div >
                </div >
            </div >
            <Footer />
        </div >
    );
};

export default MovieDetail;
