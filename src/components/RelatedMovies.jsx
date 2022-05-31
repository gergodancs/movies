import React, { useState } from "react";
import "./styles/relatedMovies.css";
import LoadingSpinner from "./LoadingSpinner";

const RelatedMovies = (props) => {
  const [showImdb, setShowImdb] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const imdbShowHandler = () => {
    if (showGraph) {
      setShowGraph(false);
    }
    return setShowImdb(!showImdb);
  };
  const graphShowHandler = () => {
    if (showImdb) {
      setShowImdb(false);
    }
    return setShowGraph(true);
  };

  const ImdbSearch = () => {
    console.log(props.similarMovies);
    if (props.similarMovies.results) {
      return (
        <div className="related__container imdb">
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
        <div className="related__container imdb">
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

  const GraphSearch = () => {
    return (
      <div className="related__container">
        {props.filtered &&
          props.filtered[0].similar.map((related) => {
            return (
              <div className="related__item" key={related.name}>
                <div>
                  <h3>{related.name}</h3>
                  <p>{related.overview}</p>
                </div>
                <img src={related?.poster?.medium} alt="" />
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <>
      <div className="related__buttons">
        <button onClick={imdbShowHandler}>Show IMDB Results</button>
        <button onClick={graphShowHandler}>Show graph Results</button>
      </div>
      {showImdb && <ImdbSearch />}
      {showGraph && <GraphSearch />}
    </>
  );
};
export default RelatedMovies;
