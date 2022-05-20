import React from "react";
import "./styles/relatedMovies.css";
import LoadingSpinner from "./LoadingSpinner";

const RelatedMovies = (props) => {
  return (
    <div className="related__container">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : (
        props.similarMovies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.image} alt="pics" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default RelatedMovies;
