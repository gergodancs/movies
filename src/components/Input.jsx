import React, { useState } from "react";
import Movies from "./Movies";

const Input = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  const movies_query = `{
    searchMovies(query: "${input}") {
      id
      name
      overview
      releaseDate
      cast {
        id
        person {
          name
        }
        role {
          ... on Cast {
            character
          }
        }
      }
    }
  }
  
  `;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetch("https://tmdb.sandbox.zoosh.ie/dev/grphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: movies_query }),
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.data.searchMovies));
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Search Movies</button>
      <Movies movies={movies} />
    </form>
  );
};

export default Input;
