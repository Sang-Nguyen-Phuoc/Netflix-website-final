import { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const Header = () => {
  const { onAuthenticated, myMovieList, myTVList } = useContext(AppContext);
  const [show, handleShow] = useState(false);
  const myList = [...myMovieList, ...myTVList];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => { });
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"} `}>
      <div className="left">
        <Link to="/">
          <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
        </Link>
        <div className="nav_img"></div>
        <div className={`nav_options ${show && "nav_options_black"}`}>
          <Link to='/TVSeries' className="nav_option" > <span className="nav_option">TV series</span> </Link>
          <Link to='/Movies' className="nav_option"> <span className="nav_option">Movies</span> </Link>
          <div className="my-list">
            <Link to='/Mylist' className="nav_option my-list-option" ><span className="nav_option">My list</span> </Link>
            {myList.length !== 0 && <span className="movie-quantity"><p className="number"> {myList.length} </p></span>}
          </div>
        </div>
      </div>
      <div className="right">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="dropdown">
          <button class="dropbtn">
            <img
              className="nav__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Avatar" />
          </button>
          <div class="dropdown-content">
            <Link to='/signup' className="dropdown-content-item"><div className="dropdown-content-item" onClick={() => onAuthenticated(false)}>Log out</div></Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header