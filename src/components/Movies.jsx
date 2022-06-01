import axios from "axios";
import React, { useState } from "react";
import BasicMovieList from "./BasicMovieList";

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

  if (idOfMovie) {
    filtered = movies.filter((item) => item.id === idOfMovie);
  }

  return (
    <>
      {!showDetailsModal && (
        <BasicMovieList
          movies={movies}
          setIdOfMovie={setIdOfMovie}
          fetchDetailsFromWiki={fetchDetailsFromWiki}
        />
      )}

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
