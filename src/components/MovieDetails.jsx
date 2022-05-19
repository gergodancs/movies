import React, { Fragment } from "react";
import "./styles/movies.css";

const MovieDetails = (props) => {
  return (
    <div className="wiki__details">
      <h2>{props.details.title}</h2>
      <p>{props.details.extract}</p>
      <div className="buttons">
        <button>WikiPedia</button>
        <button>IMDB</button>
        <button onClick={() => props.showModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default MovieDetails;
