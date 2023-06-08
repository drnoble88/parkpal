import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetParksQuery } from "./store/apiSlice";
import Carousel from "react-bootstrap/Carousel";
import { HashLoader } from "react-loading";
import { Link } from "react-router-dom";
import states from "./States";

const HomePage = () => {
  const { data, isSuccess } = useGetParksQuery();
  const searchCriteria = useSelector((state) => state.parkSearch.value);
  const [stateCode, setStateCode] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleStateCode = (event) => {
    setStateCode(event.target.value);
    setActiveIndex(0); // Reset activeIndex to 0 when stateCode changes
  };

  if (!isSuccess) {
    // Handle loading state or error state
    return <div>Loading...</div>;
  }

  const carouselStyle = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
  };

  const selectStyle = {
    display: "flex",
    justifyContent: "center",
    appearance: "none",
    backgroundColor: "white",
    border: "none",
    padding: "0",
    marginLeft: "930px",
    marginTop: "820px",
    fontFamily: "inherit",
    fontSize: "inherit",
    cursor: "inherit",
    lineHeight: "inherit",
    position: "absolute",
    zIndex: 2,
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
    zIndex: 0,
  };

  const filteredParks = () => {
    let filtered = data;

    if (stateCode) {
      filtered = filtered?.filter(
        (park) => park.addresses.stateCode === stateCode
      );
    } else {
      filtered = filtered?.filter(
        (park) => park.addresses.stateCode === "FL"
      );
    }

    if (searchCriteria) {
      filtered = filtered?.filter((park) =>
        park.fullName.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    }

    return filtered;
  };

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="custom-container">
      <div style={selectStyle}></div>
      <div style={containerStyle}>
        <div style={carouselStyle}>
          <Carousel fade activeIndex={activeIndex} onSelect={handleSelect}>
            {filteredParks()?.map((park, index) => (
              <Carousel.Item key={park.id}>
                <img
                  className="d-block w-100"
                  src={park.images[0]}
                  alt="Park Slide"
                  style={carouselImgStyle}
                />
                <Carousel.Caption>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <select
                        onChange={handleStateCode}
                        value={stateCode}
                        required
                        id="state"
                        name="state"
                        style={{
                          width: "200px",
                          borderRadius: "5px",
                          border: "1px solid blue",
                        }}
                      >
                        <option value="">Choose a State</option>
                        {Object.entries(states)?.map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
