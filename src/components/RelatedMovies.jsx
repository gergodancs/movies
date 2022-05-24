import React from "react";
import "./styles/relatedMovies.css";
import LoadingSpinner from "./LoadingSpinner";

const RelatedMovies = (props) => {
  if (props.similarMovies.results) {
    return (
      <div className="related__container">
        {props.isLoadingRelated && <LoadingSpinner />}
        {props.similarMovies.results.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.img} alt="pics" />
              <p>IMDB rating: {movie.imdbRating}</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (props.similarMovies) {
    return (
      <div className="related__container">
        {props.isLoadingRelated && <LoadingSpinner />}
        {props.similarMovies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.image} alt="pics" />
            </div>
          );
        })}
      </div>
    );
  }
};
export default RelatedMovies;
