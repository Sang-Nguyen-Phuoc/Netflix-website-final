
import { PREFIX_IMAGE } from '../../utils/constant';
import './MyMovieList.css';
import { BsStarFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

const MyMovieList = (props) => {
    const { movies, onRemoveFromList } = props;

    return (
        <div className='my-movie-list-container'>
            {movies.map((movie) => (

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
                        <span className="my-movie-list-genres">Genres: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</span>
                        <button className="my-movie-list-btn" onClick={() => onRemoveFromList(movie.id)}><BsTrash3 /></button>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default MyMovieList