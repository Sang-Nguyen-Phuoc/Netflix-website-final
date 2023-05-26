import React from "react";
import TVItem from "../TVItem/TVItem";
import "./TVList.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const TVList = (props) => {
    const { listTitle, TVData } = props;
    const id = listTitle.replace(/\s/g, "");
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

    const slideLeft = () => {
        const slider = document.getElementById(id);
        slider.classList.add("transition"); // Add transition class

        setTimeout(() => {
            slider.scrollLeft -= 500;
            slider.classList.remove("transition"); // Remove transition class after scrolling
        }, 30); // Adjust the delay as needed
    };

    const slideRight = () => {
        const slider = document.getElementById(id);
        slider.classList.add("transition"); // Add transition class

        setTimeout(() => {
            slider.scrollLeft += 500;
            slider.classList.remove("transition"); // Remove transition class after scrolling
        }, 30); // Adjust the delay as needed
    };


    return (
        <div className="tv-list-container">
            <h2>{listTitle}</h2>
            <div className="tv-list" id={id}>
                <div className="left-arrow">
                    <MdChevronLeft className="chevron-icon left-arrow" onClick={slideLeft} />
                </div>
                {TVData &&
                    TVData.map((tv) => (
                        <TVItem key={tv.id} tv={tv} listTitle={listTitle} onHandleClick={onHandleClick} />
                    ))}
                <div className="right-arrow">
                    <MdChevronRight className="chevron-icon right-arrow" onClick={slideRight} />
                </div>
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default TVList;
