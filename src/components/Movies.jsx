import axios from "axios";
import React, { useState, useContext } from "react";
import StoreCtx from "../store/store-context";
import BasicMovieList from "./BasicMovieList";

import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const ctx = useContext(StoreCtx);

  const [idOfMovie, setIdOfMovie] = useState(null);

  let filtered = null;

  if (idOfMovie) {
    filtered = ctx.movies.filter((item) => item.id === idOfMovie);
  }

  return (
    <>
      {!ctx.showModal && (
        <BasicMovieList
          setIdOfMovie={setIdOfMovie}
          fetchDetailsFromWiki={ctx.fetchDetailsFromWiki}
        />
      )}

      {ctx.showModal && idOfMovie && (
        <MovieDetails
          details={ctx.detailsFromWiki}
          searchKey={ctx.wikiSearchKey}
          filtered={filtered}
        />
      )}
    </>
  );
};

export default Movies;
