import React from "react";
import { useGetAllTripsQuery, useDeleteTripMutation } from "./store/apiSlice";
import { Link } from "react-router-dom";

const TripList = () => {
  const { data, isSuccess } = useGetAllTripsQuery();
  const [deleteTrip] = useDeleteTripMutation();

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  const containerStyle = {
    backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/moraine-lake-banff-national-park-mountains-daytime-scenery-3840x2160-2923.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    maxWidth: '300px', // Added minimum width for grid items
  };

  const cardStyle = {
    minHeight: '400px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
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
      <div className="col-md-12 text-center">
        <div className="container">
          <div className="row">
            <h3> Your Upcoming Trips!</h3>
            <div style={cardContainerStyle}>
              {data.map((trip) => (
                <div key={trip.id} className="card" style={cardStyle} >
                  <div className="card-body">
                    <h3 className="card-title">{trip.national_park_name}</h3>
                    <p>Start date: {trip.start_date}</p>
                    <p>End date: {trip.end_date}</p>
                    <p>{trip.activities}</p>
                    <div className="d-flex justify-content-between">
                      <Link to={`/edittrip/${trip.id}`} className="btn btn-success">
                        Edit
                      </Link>
                      <button className="btn btn-danger" onClick={() => {handleDelete(trip.id)}}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList;
