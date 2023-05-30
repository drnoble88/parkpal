
import { reset, search } from "./store/parkSearchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Search = () => {
  const dispatch = useDispatch();
  const [searchCriteria, SetSearchCriteria] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchCriteria))
  }

  return (
    <div className="d-flex justify-content-center">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col">
          <input
            className="form-control border-secondary rounded-pill form-control-lg pr-5"
            type="search"
            placeholder="National Park"
            style={{ width: "100%" }}
            value = {searchCriteria}
            onChange={(e) => SetSearchCriteria(e.target.value)}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-outline-light text-dark border-0 rounded-pill ml-2"
            type="submit">
            Search
          </button>
          <button
              className="btn btn-outline-light text-dark border-0 rounded-pill ml-2"
              type="button"
              onClick={() => {
                dispatch(reset())
                SetSearchCriteria('')
              }}
          >
              reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
