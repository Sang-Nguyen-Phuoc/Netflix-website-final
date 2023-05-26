import { PREFIX_IMAGE } from '../../utils/constant';
import './MyTVList.css';
import { BsStarFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

const MyTVList = (props) => {
    const { TVs, onRemoveFromList } = props;
    return (
        <div className="my-tv-list-container">
            {TVs.map((tv) => (
                <div key={tv.id} className='my-tv-list'>
                    <div className="my-tv-list-img">
                        <img src={`${PREFIX_IMAGE}${tv.poster_path}`} alt={tv.name} />
                    </div>
                    <div className="my-tv-list-info">
                        <div className="my-tv-list-overview">{tv.name}</div>
                        <p> {tv.overview}</p>
                        <div className="my-tv-list-categories">
                            <span className="my-tv-list-vote">{tv.vote_average} <BsStarFill /></span>
                            <span className="my-tv-list-release-date">Released: {tv.first_air_date}</span>
                        </div>
                        <span className="my-tv-list-ori-name">Original name: {tv.original_name}</span>
                        <button className="my-tv-list-btn" onClick={() => onRemoveFromList(tv.id)}><BsTrash3 /></button>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default MyTVList