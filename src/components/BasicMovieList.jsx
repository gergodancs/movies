import React, { useContext } from "react";
import StoreCtx from "../store/store-context";

const BasicMovieList = () => {
  const ctx = useContext(StoreCtx);
  return (
    <ul>
      {ctx.movies.map((movie, index) => {
        return (
          <li key={movie.id}>
            <div className="movie__basic">
              <div className="movie__details">
                <h2
                  onClick={() => {
                    ctx.setIdOfMovie(movie.id);
                    ctx.fetchDetailsFromWiki(movie.name);
                  }}
                >
                  {movie.name}
                </h2>
                <p>{movie.overview}</p>
                <span>Release date: {movie?.releaseDate?.slice(0, 10)}</span>
              </div>
              <img src={movie?.poster?.medium} alt="" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default BasicMovieList;
