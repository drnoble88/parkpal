import React from "react";
import { useGetAllTripsQuery, useDeleteTripMutation } from "./store/apiSlice";
import "./tripListStyle.css"
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

  const cardStyle = {
    width: '300px',
    minHeight: '400px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  // const trippy = data.find(f => f.id === id)

  const handleDelete = async (tripId) => {
    console.log("tripid", tripId)
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
            <h1> Your Upcoming Trips!</h1>
            {data.map((trip) => (
              <div key={trip.id} className="col-md-6">
                <div className="card" style={cardStyle} >
                  <div className="card-body">
                    <h1 className="card-title">{trip.national_park_name}</h1>
                    <p>{trip.start_date}</p>
                    <p>{trip.end_date}</p>
                    <p>{trip.activities}</p>
                    <p>{trip.id}</p>
                    <div className="d-flex justify-content-between">
                       <Link to = {`/edittrip/${trip.id}`} className="btn btn-success">
                      <button className="btn btn-primary">Edit</button>
                      </Link>
                      <button className="btn btn-danger" onClick={() => {handleDelete(trip.id)}}>Delete</button>
                      {/* <button className="btn btn-danger" onClick={() => {deleteTrip(trippy.id)}}>Delete</button> */}
                    </div>
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


