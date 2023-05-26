import { useState } from "react";
import { PREFIX_IMAGE } from "../../utils/constant";
import { Link } from "react-router-dom";
import "./TVItem.css";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiStar } from "react-icons/fi";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";
const TVItem = (props) => {
    const { tv, listTitle, onHandleClick } = props;
    const { onAddTVToList } = useContext(AppContext);
    const [played, setPlayed] = useState(false);
    const { name, backdrop_path, id, vote_average } = tv;
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    const onPlay = () => {
        setPlayed(!played);
    };
    return (
        <div className="tv-item-container">
            <div className="tv-item">
                <img src={`${PREFIX_IMAGE}${backdrop_path}`} alt={name} />
                <div className="tv__desc">
                    <h3 className="tv-item-title">{name}</h3>
                    <span className="vote_average">
                        <FiStar className="fil-star" /> {vote_average}
                    </span>
                    <span className={!played ? "icon-play" : "icon-play-active"}>
                        <BsPlayFill onClick={() => { onPlay(played); onHandleClick(tv); }} className={!played ? "icon-play" : "icon-play-active"} />
                    </span>
                    <span>
                        <Link to={`/tv/${tv?.id}`} className="icon-info">
                            <AiOutlineInfoCircle className="icon-info" />
                        </Link>
                    </span>
                    <p className="tv-item-overview">{truncate(tv?.overview, listTitle === "Popular Movie" ? 100 : 275)}</p>
                    <button
                        onClick={() => onAddTVToList(id)}
                        className="button-64"
                    ><span className="text">Add to list</span>
                    </button>
                </div>
            </div >
        </div >
    );
};

export default TVItem