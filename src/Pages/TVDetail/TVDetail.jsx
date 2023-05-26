import React from "react";
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch/useFetch';
import { PREFIX_IMAGE } from '../../utils/constant';
import "./TVDetail.css";
import Header from "../../layouts/Header/Header";
import { BASE_API_URL, API_KEY } from '../../utils/constant';
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { useState, useContext } from "react";
import { BsStarFill } from 'react-icons/bs';
import Footer from "../../layouts/Footer/Footer";
import { CiPlay1 } from 'react-icons/ci';
import AppContext from "../../contexts/AppContext";
import Loading from "../../components/Loading/Loading";

const TVDetail = () => {
    const { onAddTVToList } = useContext(AppContext);
    const params = useParams();
    const { tvId } = params;
    const tvDetailAPIUrl = `${BASE_API_URL}/tv/${tvId}?api_key=${API_KEY}`;
    const { data: tvDetail, isLoading } = useFetch(tvDetailAPIUrl, {});
    const { name, poster_path, overview, vote_average, first_air_date, episode_number, id, original_name } = tvDetail;
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const onHandleClick = (tv) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(tv?.title || tv?.name || tv?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <>
            {isLoading ? <div><Loading /></div> :
                (
                    <div className="tv-detail-container" >
                        <div><Header /></div>
                        <div className='singleHeading'>
                            <h1>{name} </h1> <span> | {episode_number} Episodes | </span> <span> HD </span>
                        </div>
                        <div className="tv-detail">
                            <div className="tv-img">
                                <img src={`${PREFIX_IMAGE}${poster_path}`} alt={name} />
                            </div>
                            <div className="tv-info">
                                <div className="tv-info-overview">
                                    <div className="overview">Overview</div>
                                    <p> {overview}</p>
                                    <div className="categories">
                                        <span className="vote">{vote_average} <BsStarFill /></span>
                                        <span className="release-date">Released: {first_air_date}</span>
                                    </div>
                                    <span className="ori-name">Original name: {original_name}</span>
                                    <div className="trailer">
                                        <button className="play-trailer" onClick={() => onHandleClick(tvDetail)}> <CiPlay1 className="play-icon" /> Play Trailer</button>
                                        <button
                                            onClick={() => onAddTVToList(id)}
                                            className="button-64-detail"
                                        ><span className="text">Add to list</span>
                                        </button>
                                    </div>
                                    <div>
                                        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                                    </div>
                                </div >
                            </div >
                        </div >
                        <Footer />
                    </div >
                )
            }    </>
    );
};

export default TVDetail