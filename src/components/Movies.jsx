import React, { useContext } from "react";
import StoreCtx from "../store/store-context";
import BasicMovieList from "./BasicMovieList";

import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const ctx = useContext(StoreCtx);

  return (
    <>
      {!ctx.showModal && <BasicMovieList />}
      {ctx.showModal && ctx.idOfMovie && <MovieDetails />}
    </>
  );
};

export default Movies;
