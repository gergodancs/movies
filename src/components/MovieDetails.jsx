import "./styles/movies.css";
import { useState, useEffect, useCallback } from "react";
import RelatedMovies from "./RelatedMovies";

//imdb api key: k_n4q9ekrw
const MovieDetails = (props) => {
  const [imdbKeyWords, setImdbKeyWords] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [imdbResults, setImdbResults] = useState([]);
  const [showRelated, setShowRelated] = useState(false);
  let imdbSearchKey = imdbResults?.id;
  let wikiUrl = `http://en.wikipedia.org/?curid=${props.searchKey}`;
  let imdbUrl = `https://www.imdb.com/title/${imdbSearchKey}/`;

  const fetchSearchKeyFromImdb = useCallback(() => {
    let imdbUrl = `https://imdb-api.com/en/API/SearchMovie/k_n4q9ekrw/${props.details.title}`;
    console.log("searchkexyurl", imdbUrl);
    fetch(imdbUrl)
      .then((res) => res.json())
      .then((data) => setImdbResults(data.results[0]))
      .catch((err) => console.log(err));
  }, [props.details.title]);

  const fetchRelatedMovies = useCallback(() => {
    let imdbUrl = `https://imdb-api.com/en/API/Title/k_n4q9ekrw/${imdbSearchKey}`;
    console.log(imdbSearchKey);
    fetch(imdbUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.similars) {
          setSimilarMovies(data.similars);
          setImdbKeyWords(data.keywords);
        } else {
          fetch(
            `https://imdb-api.com/API/AdvancedSearch/k_l4ix16jn?keywords=${imdbKeyWords}`
          ).then((res) => res.json().then((data) => setSimilarMovies(data)));
        }
      })
      .catch((err) => console.log(err));
    setIsLoadingRelated(false);
  }, [imdbSearchKey, imdbKeyWords]);

  useEffect(() => {
    fetchSearchKeyFromImdb();
    fetchRelatedMovies();
  }, [fetchSearchKeyFromImdb, fetchRelatedMovies]);

  const relatedClickHandler = () => {
    setShowRelated(true);
  };
  console.log(props.movies);
  return (
    <div className="wiki__details">
      <h2>{props.details.title}</h2>
      <p>
        {props.details.extract}
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
        <button onClick={() => props.showModal(false)}>Close</button>
      </div>

      {/* {showRelated && (
        <RelatedMovies
          isLoading={isLoadingRelated}
          imdbResults={imdbResults}
          imdbSearchKey={imdbSearchKey}
          similarMovies={similarMovies}
        />
      )} */}
    </div>
  );
};

export default MovieDetails;
