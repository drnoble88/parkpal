import React, { useState } from "react";
import { useGetAllTripsQuery, useDeleteTripMutation, useGetParksQuery } from "./store/apiSlice";
import { Link } from "react-router-dom";
import "./triplist.css";
import dateFormat from "dateformat";

const TripList = () => {
  const { data, isSuccess } = useGetAllTripsQuery();
  const [deleteTrip] = useDeleteTripMutation();
  const { data: parksdb } = useGetParksQuery();
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const parkImage = (trip) => {
    return parksdb
      ?.filter((park) => park.fullName === trip)
      .map((park) => park.images[0]);
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  const containerStyle = {
    backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/moraine-lake-banff-national-park-mountains-daytime-scenery-3840x2160-2923.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gap: "1rem",
    maxWidth: "1200px",
    margin: "80px auto 0",
    justifyContent: "center",
  };

  const cardStyle = {
    minHeight: "400px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    fontFamily: "Bagel Fat One",
    fontWeight: 100,
    fontVariantLigatures: "normal",
    fontSize: "1rem",
    letterSpacing: ".5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "black",
    transition: "transform -8s, box-shadow 0.3s",
    cursor: "pointer",
    transform: "translateY(0)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.6)",
  };

  const imageStyle = {
    margin: "auto", // Center the image horizontally
    display: "block", // Ensure the image takes up the available width
    borderRadius: "5%",
    borderColor: "black",
    border: "2px solid transparent", // Set border color to transparent
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)", // Add a white transparent shadow
    backdropFilter: "blur(10px)", // Apply blur effect
  };

  const cardTitleStyle = {
    textDecoration: "underline",
  };

  const handleDelete = async (tripId) => {
    console.log("tripid", tripId);
    try {
      const response = await deleteTrip(tripId);
      // Handle successful delete
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="yourtrips font-link">Your Upcoming Trips!</h3>
          </div>
          <div style={cardContainerStyle}>
            {data.map((trip) => (
              <div
                key={trip.id}
                className="card"
                style={{
                  ...cardStyle,
                  transform: hoveredCardId === trip.id ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hoveredCardId === trip.id ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={() => setHoveredCardId(trip.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div className="card-body">
                  <img
                    src={parkImage(trip.national_park_name)}
                    alt="Description for image"
                    width="250"
                    height="150"
                    style={imageStyle}
                  />
                  <h3 className="card-title" style={cardTitleStyle}>
                    {trip.national_park_name}
                  </h3>
                  <p>From: {dateFormat(trip.start_date, "dddd, mmmm dS, yyyy")}</p>
                  <p>To: {dateFormat(trip.end_date, "dddd, mmmm dS, yyyy")}</p>
                  <p>Activities: {trip.activities}</p>
                  <div className="d-flex justify-content-between flex-column">
                    <Link to={`/edittrip/${trip.id}`} className="btn btn-dark border border">
                      Edit This Trip
                    </Link>
                    <button className="btn btn-dark border mt-2" onClick={() => handleDelete(trip.id)}>
                      Delete This Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList;
