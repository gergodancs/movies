import React from "react";
import "./styles/movies.css";

const Movies = (props) => {
  return (
    <ul>
      {props.movies.map((movie) => {
        return (
          <li key={movie.id}>
            <div>
              <h2>{movie.name}</h2>
              <p>{movie.overview}</p>
              <span>Release date: {movie.releaseDate}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Movies;
