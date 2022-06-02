import React, { useContext } from "react";
import StoreCtx from "../store/store-context";
import Form from "./Form";
import LoadingSpinner from "./LoadingSpinner";
import Movies from "./Movies";
import "./styles/input.css";

const Input = () => {
  const ctx = useContext(StoreCtx);

  let content = (
    <p style={{ color: "#fff" }}>
      Type any movie title and click for the results
    </p>
  );
  if (ctx.isLoading) {
    content = <LoadingSpinner />;
  }
  if (ctx.movies.length > 0) {
    content = <Movies />;
  }

  if (ctx.error) {
    content = <p>{ctx.error}</p>;
  }

  return (
    <>
      <Form />
      {content}
    </>
  );
};

export default Input;
