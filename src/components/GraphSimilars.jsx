import React from "react";
import "./styles/relatedMovies.css";

const GraphSimilars = (props) => {
  return (
    <>
      <button onClick={() => props.close(false)}>Back</button>
      <div className="related__container">
        {props.filtered &&
          props.filtered[0].similar.map((related) => {
            return (
              <div key={related.name}>
                <h3>{related.name}</h3>
                <p>{related.overview}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GraphSimilars;
