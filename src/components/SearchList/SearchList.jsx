import React from 'react'
import { PREFIX_IMAGE } from '../../utils/constant';
import { BsStarFill } from 'react-icons/bs';
import "../MovieList/MovieList.css"
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


const SearchList = (props) => {
    const { searchMovies } = props;

    return (
        <div className='my-movie-list-container'>
            {searchMovies.map((movie) => (

                <div key={movie.id} className='my-movie-list'>
                    <div className="my-movie-list-img">
                        <img src={`${PREFIX_IMAGE}${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className="my-movie-list-info">
                        <div className="my-movie-list-overview">{movie.title}</div>
                        <p> {movie.overview}</p>
                        <div className="my-movie-list-categories">
                            <span className="my-movie-list-vote">{movie.vote_average} <BsStarFill /></span>
                            <span className="my-movie-list-release-date">Released: {movie.release_date}</span>
                        </div>
                        <Link to={`/movie/${movie?.id}`}>
                            <button className="banner__button">
                                <span className="icon"><AiOutlineInfoCircle /></span>
                                <span>Info</span>
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default SearchList

{/* <span style={{
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                    textDecoration: "none"
                                }}>Get more info</span> */}