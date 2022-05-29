import axios from "axios";
import React, { useState } from "react";

import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const [detailsFromWiki, setDetailsFromWiki] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [wikiSearchKey, setWikiSearchKey] = useState(null);
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
      <ul>
        {movies.map((movie, index) => {
          return (
            <li key={movie.id}>
              <div className="movie__basic">
                <h2
                  onClick={() => {
                    setIdOfMovie(movie.id);
                    fetchDetailsFromWiki(movie.name);
                  }}
                >
                  {movie.name}
                </h2>
                <p>{movie.overview}</p>
                <span>Release date: {movie?.releaseDate?.slice(0, 10)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {showDetailsModal && idOfMovie && (
        <MovieDetails
          details={detailsFromWiki}
          showModal={setShowDetailsModal}
          searchKey={wikiSearchKey}
          movies={movies}
          filtered={filtered}
        />
      )}
    </>
  );
};

export default Movies;
