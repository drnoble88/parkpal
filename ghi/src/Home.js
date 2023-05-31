import React from "react";
import { useSelector } from "react-redux";
import { useGetParksQuery } from "./store/apiSlice";
import Carousel from "react-bootstrap/Carousel";
import Search from "./Search";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, isSuccess } = useGetParksQuery();
  const searchCriteria = useSelector((state) => state.parkSearch.value);

  if (!isSuccess) {
    // Handle loading state or error state
    return <div>Loading...</div>;
  }

  const carouselStyle = {
    position: "relative",
    minHeight: "100vh",
  };

  const carouselImgStyle = {
    zIndex: 1,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    maxWidth: "100%", // Adjust the maximum width as needed
    maxHeight: "100%", // Adjust the maximum height as needed
  };

  const textOutlineStyle = {
    textShadow: "2px 2px 0 black", // Adjust the shadow values as needed
  };

  const searchContainerStyle = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
  };

const filteredParks = () => {
  if (!searchCriteria) {
    return data; // Return all parks if no search criteria is provided
  } else {
    const filtered = data?.filter((park) =>
      park.fullName.includes(searchCriteria)
    );
    return filtered.length > 0 ? filtered : data; // Return filtered parks if any matches found, otherwise return all parks
  }
};



  return (
    <div className="custom-container">
      <div style={carouselStyle}>
        <Carousel fade>
          {filteredParks().map((park) => (
            <Carousel.Item key={park.id}>
              <img
                className="d-block w-100"
                src={park.images[0]}
                alt="Park Slide"
                style={carouselImgStyle}
              />
              <Carousel.Caption>
                <h3 style={textOutlineStyle}>{park.fullName}</h3>
                {/* <Link to= ${`/api/parks/{park.park_code}`} */}
                <p style={textOutlineStyle}>{park.description}</p>
                <Link to = {`/parkdetails/${park.parkCode}`} className="btn btn-success">
                  Go to {park.fullName}
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
              <div style={searchContainerStyle}>
        <Search />
      </div>
      </div>
    </div>
  );
};

export default HomePage;