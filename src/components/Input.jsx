import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Movies from "./Movies";
import "./styles/input.css";

const Input = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchMoviesHandler = async () => {
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetchMoviesHandler();
    setInput("");
  };

  let content = <p>Type any movie title and click for the results</p>;
  if (isLoading) {
    content = <LoadingSpinner />;
  }
  if (movies.length > 0) {
    content = <Movies movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <input
          value={input}
          type="text"
          placeholder="Type a movie title:"
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={!input.length}>Search Movies</button>
      </form>
      {content}
    </>
  );
};

export default Input;
