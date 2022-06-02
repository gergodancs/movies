import React, { useState, useCallback } from "react";
import "./styles/relatedMovies.css";

import ImdbSearch from "./ImdbSearch";
import GraphSearch from "./GraphSearch";

const RelatedMovies = (props) => {
  const [showImdb, setShowImdb] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [imdbKeyWords, setImdbKeyWords] = useState([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);

  const fetchRelatedMovies = useCallback(() => {
    let imdbUrl = `https://imdb-api.com/en/API/Title/k_n4q9ekrw/${props.imdbSearchKey}`;

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
  }, [props.imdbSearchKey, imdbKeyWords]);

  const imdbShowHandler = () => {
    if (showGraph) {
      fetchRelatedMovies();
      setShowGraph(false);
    }
    return setShowImdb(!showImdb);
  };
  const graphShowHandler = () => {
    if (showImdb) {
      setShowImdb(false);
    }
    return setShowGraph(true);
  };

  return (
    <>
      <div className="related__buttons">
        <button onClick={imdbShowHandler}>Show IMDB Results</button>
        <button onClick={graphShowHandler}>Show graph Results</button>
      </div>
      {showImdb && (
        <ImdbSearch
          similarMovies={similarMovies}
          isLoadingRelated={isLoadingRelated}
        />
      )}
      {showGraph && <GraphSearch />}
    </>
  );
};
export default RelatedMovies;
