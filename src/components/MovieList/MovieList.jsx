import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const MovieList = (props) => {
  const { listTitle, movieData } = props;
  const id = listTitle.replace(/\s/g, "");
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
    <div className="movie-list-container">
      <h2>{listTitle}</h2>
      <div className="movie-list" id={id}>
        <div className="left-arrow">
          <MdChevronLeft className="chevron-icon left-arrow" onClick={slideLeft} />
        </div>
        {movieData &&
          movieData.map((movie) => (
            <MovieItem key={movie.id} movie={movie} listTitle={listTitle} onHandleClick={onHandleClick} />
          ))}
        <div className="right-arrow">
          <MdChevronRight className="chevron-icon right-arrow" onClick={slideRight} />
        </div>
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default MovieList;
