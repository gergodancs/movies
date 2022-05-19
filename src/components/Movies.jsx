import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const [detailsFromWiki, setDetailsFromWiki] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
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

    response && setDetailsFromWiki(data[key]);
    setShowDetails(true);
  };

  console.log(detailsFromWiki);
  return (
    <>
      <ul>
        {props.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <div>
                <h2 onClick={() => fetchDetailsFromWiki(movie.name)}>
                  {movie.name}
                </h2>
                <p>{movie.overview}</p>
                <span>Release date: {movie.releaseDate}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {showDetails && (
        <MovieDetails details={detailsFromWiki} showModal={setShowDetails} />
      )}
    </>
  );
};

export default Movies;
