import React from "react";

const BasicMovieList = (props) => {
  return (
    <ul>
      {props.movies.map((movie, index) => {
        return (
          <li key={movie.id}>
            <div className="movie__basic">
              <div className="movie__details">
                <h2
                  onClick={() => {
                    props.setIdOfMovie(movie.id);
                    props.fetchDetailsFromWiki(movie.name);
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
