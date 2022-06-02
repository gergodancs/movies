import { useContext } from "react";
import StoreCtx from "../store/store-context";

const GraphSearch = () => {
  const ctx = useContext(StoreCtx);

  return (
    <div className="related__container">
      {ctx.filtered &&
        ctx.filtered[0].similar.map((related) => {
          return (
            <div className="related__item" key={related.name}>
              <div>
                <h3>{related.name}</h3>
                <p>{related.overview}</p>
              </div>
              <img src={related?.poster?.medium} alt="" />
            </div>
          );
        })}
    </div>
  );
};
export default GraphSearch;
