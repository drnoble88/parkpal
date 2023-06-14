import React, { useState } from "react";
import { useGetAllTripsQuery, useDeleteTripMutation, useGetParksQuery } from "./store/apiSlice";
import { Link } from "react-router-dom";
import "./index.css";
import dateFormat from "dateformat";
import { containerStyle, cardContainerStyle, cardStyle, imageStyle, cardTitleStyle } from './styling.js';

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

  const parkCode1 = (trip) => {
    return parksdb
      ?.filter((park) => park.fullName === trip)
      .map((park) => park.parkCode);
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
    } catch (error) {
    }
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="yourtrips font-link">
              <hr /> Your Upcoming Trips!<hr />
            </h3>
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
                    width="250"
                    height="150"
                    style={imageStyle}
                  />
                  <h3 className="card-title" style={cardTitleStyle}>
                    <Link
                      to={`/parkdetails/${parkCode1(trip.national_park_name)}`}
                      style={{
                        color: 'black',
                        transition: 'color 0.3s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'rgb(96, 102, 102)')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                    >
                      {trip.national_park_name}
                    </Link>
                  </h3>
                  <p>From: {dateFormat(new Date(trip.start_date).getTime() + 86400000, "dddd, mmmm dS, yyyy")}</p>
                  <p>To: {dateFormat(new Date(trip.end_date).getTime() + 86400000, "dddd, mmmm dS, yyyy")}</p>
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
