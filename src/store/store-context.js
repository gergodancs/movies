import React, { useState } from "react";
import axios from "axios";

const StoreCtx = React.createContext({
  showModal: false,
  isLoading: false,
  movies: [],
  error: null,
  detailsFromWiki: [],
  wikiSearchKey: null,
  idOfMovie: null,
});

export const StoreCtxProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsFromWiki, setDetailsFromWiki] = useState([]);
  const [wikiSearchKey, setWikiSearchKey] = useState(null);
  const [idOfMovie, setIdOfMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  let filtered = null;

  if (idOfMovie) {
    filtered = movies.filter((item) => item.id === idOfMovie);
  }

  const fetchMoviesHandler = async (input) => {
    const movies_query = `{
        searchMovies(query: "${input}") {
          id
          keywords{
            name
          }
          similar{
            name
            overview
            poster{
              medium
            }
          }
          name
          poster{
            medium
          }
          overview
          releaseDate
          
        }
      }`;
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://tmdb.sandbox.zoosh.ie/dev/grphql/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: movies_query }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      setMovies(data.data.searchMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
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
    setShowModal(true);
  };

  return (
    <StoreCtx.Provider
      value={{
        showModal: showModal,
        setShowModal: setShowModal,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        movies: movies,
        error: error,
        fetchMoviesHandler: fetchMoviesHandler,
        detailsFromWiki: detailsFromWiki,
        setDetailsFromWiki: setDetailsFromWiki,
        wikiSearchKey: wikiSearchKey,
        setWikiSearchKey: setWikiSearchKey,
        fetchDetailsFromWiki: fetchDetailsFromWiki,
        idOfMovie: idOfMovie,
        setIdOfMovie: setIdOfMovie,
        filtered: filtered,
      }}
    >
      {props.children}
    </StoreCtx.Provider>
  );
};

export default StoreCtx;
