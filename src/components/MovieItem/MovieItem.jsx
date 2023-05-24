import { useState } from "react";
import { PREFIX_IMAGE } from "../../utils/constant";
import { Link } from "react-router-dom";
import "./MovieItem.css";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiStar } from "react-icons/fi";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

const MovieItem = (props) => {
  const { movie, listTitle, onHandleClick } = props;
  const { onAddToList, added } = useContext(AppContext);
  const [played, setPlayed] = useState(false);
  const { title, backdrop_path, poster_path, id, vote_average } = movie;
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const onPlay = () => {
    setPlayed(!played);
  };

  return (
    <div className="movie">
      <div className={`movie-item ${listTitle === "Popular Movie" && "movie-item-poster"}`}>
        <img src={`${PREFIX_IMAGE}${listTitle === "Popular Movie" ? poster_path : backdrop_path}`} alt={title} />
        <div className="movie__desc">
          <h3 className="movie-item-title">{title}</h3>
          <span className="vote_average">
            <FiStar className="fil-star" /> {vote_average}
          </span>
          <span className={!played ? "icon-play" : "icon-play-active"}>
            <BsPlayFill onClick={() => { onPlay(played); onHandleClick(movie); }} className={!played ? "icon-play" : "icon-play-active"} />
          </span>
          <span>
            <Link to={`/movies/${movie?.id}`} className="icon-info">
              <AiOutlineInfoCircle className="icon-info" />
            </Link>
          </span>
          <p className="movie-item-overview">{truncate(movie?.overview, listTitle === "Popular Movie" ? 100 : 275)}</p>
          <button
            className={added ? "addToList disabled" : "notAddToList"}
            disabled={added}
            onClick={() => onAddToList(id, movie)}
          >
            {added ? "Added" : "Add to List"}
          </button>
        </div>
      </div >
    </div >
  );
};

export default MovieItem;
