import "./styles/movies.css";
import { useState, useEffect, useCallback } from "react";

//imdb api key: k_n4q9ekrw
const MovieDetails = (props) => {
  const [imdbSearchKey, setImdbSearchKey] = useState("");
  let wikiUrl = `http://en.wikipedia.org/?curid=${props.searchKey}`;
  let imdbUrl = `https://www.imdb.com/title/${imdbSearchKey}/`;

  const fetchSearchKeyFromImdb = useCallback(() => {
    let imdbUrl = `https://imdb-api.com/en/API/SearchMovie/k_n4q9ekrw/${props.details.title}`;
    fetch(imdbUrl)
      .then((res) => res.json())
      .then((data) => setImdbSearchKey(data.results[0].id));
  }, [props.details.title]);
  useEffect(() => {
    fetchSearchKeyFromImdb();
  }, [fetchSearchKeyFromImdb]);
  return (
    <div className="wiki__details">
      <h2>{props.details.title}</h2>
      <p>
        {props.details.extract}{" "}
        <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
          Show more
        </a>
      </p>
      <div className="buttons">
        <button>
          <a href={imdbUrl} target="_blank" rel="noopener noreferrer">
            IMDB
          </a>
        </button>
        <button onClick={() => props.showModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default MovieDetails;
