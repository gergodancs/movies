import React, { useContext, useState } from "react";
import StoreCtx from "../store/store-context";
import LoadingSpinner from "./LoadingSpinner";
import Movies from "./Movies";
import "./styles/input.css";

const Input = () => {
  const ctx = useContext(StoreCtx);
  const [input, setInput] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    ctx.fetchMoviesHandler(input);
    setInput("");
  };

  let content = <p>Type any movie title and click for the results</p>;
  if (ctx.isLoading) {
    content = <LoadingSpinner />;
  }
  if (ctx.movies.length > 0) {
    content = <Movies movies={ctx.movies} />;
  }

  if (ctx.error) {
    content = <p>{ctx.error}</p>;
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
