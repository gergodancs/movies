import { useContext, useState } from "react";
import StoreCtx from "../store/store-context";

const Form = () => {
  const ctx = useContext(StoreCtx);
  const [input, setInput] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    ctx.fetchMoviesHandler(input);
    setInput("");
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        value={input}
        type="text"
        placeholder="Type a movie title:"
        onChange={(e) => setInput(e.target.value)}
      />
      <button disabled={!input.length}>Search Movies</button>
    </form>
  );
};

export default Form;
