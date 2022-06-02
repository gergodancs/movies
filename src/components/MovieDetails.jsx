import "./styles/movies.css";
import { useState, useEffect, useCallback, useContext } from "react";
import RelatedMovies from "./RelatedMovies";
import StoreCtx from "../store/store-context";

//imdb api key: k_n4q9ekrw
const MovieDetails = (props) => {
  const ctx = useContext(StoreCtx);

  const [imdbResults, setImdbResults] = useState([]);
  const [showRelated, setShowRelated] = useState(false);
  let imdbSearchKey = imdbResults?.id;
  let imdbUrl = `https://www.imdb.com/title/${imdbSearchKey}/`;
  let wikiUrl = `http://en.wikipedia.org/?curid=${ctx.wikiSearchKey}`;

  const fetchSearchKeyFromImdb = useCallback(() => {
    let imdbUrl = `https://imdb-api.com/en/API/SearchMovie/k_n4q9ekrw/${ctx.detailsFromWiki.title}`;

    fetch(imdbUrl)
      .then((res) => res.json())
      .then((data) => setImdbResults(data.results[0]))
      .catch((err) => console.log(err));
  }, [ctx.detailsFromWiki.title]);

  useEffect(() => {
    fetchSearchKeyFromImdb();
  }, [fetchSearchKeyFromImdb]);

  const relatedClickHandler = () => {
    fetchSearchKeyFromImdb();
    setShowRelated(true);
  };

  return (
    <div className="wiki__details">
      <h2>{ctx.detailsFromWiki.title}</h2>
      <p>
        {ctx.detailsFromWiki.extract}
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
        <button onClick={relatedClickHandler}>Show similar movies</button>
        <button onClick={() => ctx.setShowModal(false)}>Close</button>
      </div>

      {showRelated && <RelatedMovies imdbSearchKey={imdbSearchKey} />}
    </div>
  );
};

export default MovieDetails;
