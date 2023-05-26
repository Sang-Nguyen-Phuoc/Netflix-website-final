import React, { useState, useEffect, useContext } from "react";
import { API_MOVIES_URL, PREFIX_IMAGE } from "../../utils/constant";
import "../../layouts/Header/Header.css";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import Banner from "../../components/Banner/Banner";
import Footer from "../../layouts/Footer/Footer";
import SearchList from "../../components/SearchList/SearchList";

const SearchPage = () => {
    const [searchMovies, setSearchMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // New state to store the search keyword
    const { onAuthenticated, myMovieList, myTVList } = useContext(AppContext);
    const myList = [...myMovieList, ...myTVList];
    const [show, handleShow] = useState(false);
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
    const onSearchMovie = async (e) => {
        const value = e.target.value;
        setSearchKeyword(value); // Update the search keyword state
        const searchMoviesData = await searchMovieFn(value);
        setSearchMovies(searchMoviesData.results);
    };

    const searchMovieFn = async (query) => {
        const normalizeQuery = query.trim();
        const url = `${API_MOVIES_URL.searchMovie}&query=${normalizeQuery}`;
        const responseData = await fetch(url);
        const data = await responseData.json();
        return data;
    };


    return (
        <div className="search-page">
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
                        <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search"
                            name="searchValue"
                            id="searchValue"
                            onChange={onSearchMovie} />
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
            <Banner />
            <h2 style={{
                color: "white",
                marginLeft: "20px",
            }}>Search for {searchKeyword} : </h2>
            <SearchList searchMovies={searchMovies} />
            <Footer />
        </div >
    );
};

export default SearchPage;


