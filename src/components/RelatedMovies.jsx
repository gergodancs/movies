import React from "react";
import "./styles/relatedMovies.css";
import LoadingSpinner from "./LoadingSpinner";

const RelatedMovies = (props) => {
  // if (props.similarMovies?.length === 0) {
  //   return <h2>Sorry, IMDB says no movies like this </h2>;
  // }
  if (props.similarMovies?.results) {
    console.log("elsoif", props.similarMovies);
    return (
      <div className="related__container">
        {props.isLoading && <LoadingSpinner />}
        {!props.isLoading &&
          props.similarMovies.results.map((movie) => {
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
    console.log("masodikif", props.similarMovies);
    return (
      <div className="related__container">
        {props.isLoading && <LoadingSpinner />}
        {!props.isLoading &&
          props.similarMovies.map((movie) => {
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
