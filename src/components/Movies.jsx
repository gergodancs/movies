import axios from "axios";
import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import "./styles/movies.css";

const Movies = (props) => {
  const [detailsFromWiki, setDetailsFromWiki] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [wikiSearchKey, setWikiSearchKey] = useState(null);
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
    params.gsrsearch = title + " movie";
    const response = await axios(url, { params });
    let data = response.data.query.pages;
    let key = Object.keys(data);
    setWikiSearchKey(key[0]);
    response && setDetailsFromWiki(data[key]);
    setShowDetailsModal(true);
  };

  return (
    <>
      <ul>
        {props.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <div className="movie__basic">
                <h2 onClick={() => fetchDetailsFromWiki(movie.name)}>
                  {movie.name}
                </h2>
                <p>{movie.overview}</p>
                <span>Release date: {movie?.releaseDate?.slice(0, 10)}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {showDetailsModal && (
        <MovieDetails
          details={detailsFromWiki}
          showModal={setShowDetailsModal}
          searchKey={wikiSearchKey}
        />
      )}
    </>
  );
};

export default Movies;
