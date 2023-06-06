import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetParksQuery } from "./store/apiSlice";
import Carousel from "react-bootstrap/Carousel";
import Search from "./Search";
import { Link } from "react-router-dom";
import states from "./States";

const HomePage = () => {
  const { data, isSuccess } = useGetParksQuery();
  const searchCriteria = useSelector((state) => state.parkSearch.value);
  const [stateCode, setStateCode] = useState();

  const handleStateCode = (event) => {
    setStateCode(event.target.value);
  };

  if (!isSuccess) {
    // Handle loading state or error state
    return <div>Loading...</div>;
  }

  const carouselStyle = {
    position: "relative",
    minHeight: "100vh",
    width: "100%"
  };

  const carouselImgStyle = {
    zIndex: 1,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const textOutlineStyle = {
    textShadow: "2px 2px 0 black",
  };

  const containerStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const filteredParks = () => {
    let filtered = data;

    if (stateCode) {
      filtered = filtered.filter(
        (park) => park.addresses.stateCode === stateCode
      );
    } else {
      filtered = filtered.filter(
        (park) => park.addresses.stateCode === "AZ"
      );
    }

    if (searchCriteria) {
      filtered = filtered.filter((park) =>
        park.fullName.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="custom-container">
      <div className="form-group">
        <select
          onChange={handleStateCode}
          value={stateCode}
          required
          id="state"
          name="state"
          className="form-select"
        >
          <option value="">Choose a State</option>
          {Object.entries(states)?.map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div style={containerStyle}>
        <div style={carouselStyle}>
          <Carousel fade>
            {filteredParks()?.map((park) => (
              <Carousel.Item key={park.id}>
                <img
                  className="d-block w-100"
                  src={park.images[0]}
                  alt="Park Slide"
                  style={carouselImgStyle}
                />
                <Carousel.Caption>
                  <h3 style={textOutlineStyle}>{park.fullName}</h3>
                  <p style={textOutlineStyle}>{park.description}</p>
                  <Link
                    to={`/parkdetails/${park.parkCode}`}
                    className="btn btn-success"
                  >
                    Go to {park.fullName}
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
