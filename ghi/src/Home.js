import React from "react";
import { useGetParksQuery } from "./store/apiSlice";
import { useDispatch } from "react-redux";
import { search } from "./store/searchSlice";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  const { data: parks, isSuccess } = useGetParksQuery();
  const dispatch = useDispatch();

  if (!isSuccess) {
    // Handle loading state or error state
    return <div>Loading...</div>;
  }

  const carouselStyle = {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
  };

  const carouselImgStyle = {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    maxWidth: "100%", // Adjust the maximum width as needed
    maxHeight: "100%", // Adjust the maximum height as needed
  };

  const textOutlineStyle = {
    textShadow: "2px 2px 0 black", // Adjust the shadow values as needed
  };

  return (
    <div className="custom-container" style={carouselStyle}>
      <Carousel fade>
        {parks.map((park) => (
          <Carousel.Item key={park.id}>
            <img
              className="d-block w-100"
              src={park.images[0]}
              alt="Park Slide"
              style={carouselImgStyle}
            />
            <Carousel.Caption>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control border-secondary rounded-pill form-control-lg pr-5"
                  type="search"
                  placeholder="National Park"
                  id="example-search-input2"
                  style={{ width: "50%" }}
                  onChange={(e) => dispatch(search(e.target.value))}
                />
                <button
                  className="btn btn-outline-light text-dark border-0 rounded-pill ml-2"
                  type="submit"
                >
                  Search
                </button>
              </div>
              <h3 style={textOutlineStyle}>{park.fullName}</h3>
              <p style={textOutlineStyle}>{park.description}</p>
              <a href="#" className="btn btn-success">
                Go to {park.fullName}
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomePage;
