import "./styles/movies.css";

//imdb api key: k_n4q9ekrw
const MovieDetails = (props) => {
  let url = `http://en.wikipedia.org/?curid=${props.searchKey}`;
  return (
    <div className="wiki__details">
      <h2>{props.details.title}</h2>
      <p>
        {props.details.extract}{" "}
        <a href={url} target="_blank">
          Show more
        </a>
      </p>
      <div className="buttons">
        <button>IMDB</button>
        <button onClick={() => props.showModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default MovieDetails;
