import axios from "axios";
import React, { useState } from "react";
import GraphSimilars from "./GraphSimilars";
import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const [detailsFromWiki, setDetailsFromWiki] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [wikiSearchKey, setWikiSearchKey] = useState(null);
  const [showRelatedGraph, setShowRelatedGraph] = useState(false);
  const [idOfMovie, setIdOfMovie] = useState(null);
  const url = `https://en.wikipedia.org/w/api.php?`;
  const params = {
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: "search",
    gsrlimit: 1,
  };
  let filtered = null;

  const { movies } = props;

  const fetchDetailsFromWiki = async (title) => {
    params.gsrsearch = title + " movie";
    const response = await axios(url, { params });
    let data = response.data.query.pages;
    let key = Object.keys(data);
    setWikiSearchKey(key[0]);
    response && setDetailsFromWiki(data[key]);
    setShowDetailsModal(true);
  };
  //console.log(movies[0].similar);
  if (idOfMovie) {
    filtered = movies.filter((item) => item.id === idOfMovie);
  }

  return (
    <>
      {!showRelatedGraph && (
        <ul>
          {movies.map((movie, index) => {
            return (
              <li key={movie.id}>
                <div className="movie__basic">
                  <h2 onClick={() => fetchDetailsFromWiki(movie.name)}>
                    {movie.name}
                  </h2>
                  <p>{movie.overview}</p>
                  <span>Release date: {movie?.releaseDate?.slice(0, 10)}</span>
                  <button
                    onClick={(prevState) => {
                      setShowRelatedGraph(!showRelatedGraph);
                      setIdOfMovie(movie.id);
                    }}
                  >
                    Show Related
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {showRelatedGraph && (
        <GraphSimilars filtered={filtered} close={setShowRelatedGraph} />
      )}

      {showDetailsModal && (
        <MovieDetails
          details={detailsFromWiki}
          showModal={setShowDetailsModal}
          searchKey={wikiSearchKey}
          movies={movies}
        />
      )}
    </>
  );
};

export default Movies;
