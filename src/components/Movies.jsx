import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/movies.css";

const Movies = (props) => {
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

  const fetchDetailsFromWiki = async (title) => {
    params.gsrsearch = title;

    const response = await axios(url, { params });

    let data = response.data.query.pages;
    let key = Object.keys(data);

    response && console.log("ez a movi", data[key].extract);
  };

  return (
    <ul>
      {props.movies.map((movie) => {
        return (
          <li key={movie.id}>
            <div>
              <h2>{movie.name}</h2>
              <p>{movie.overview}</p>
              <span>Release date: {movie.releaseDate}</span>
              <button onClick={() => fetchDetailsFromWiki(movie.name)}>
                More info
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Movies;
