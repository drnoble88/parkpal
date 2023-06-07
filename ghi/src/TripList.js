import React, { useEffect } from "react";
import { useGetAllTripsQuery, useDeleteTripMutation, useGetParksQuery } from "./store/apiSlice";
import { Link } from "react-router-dom";
import googleFonts from "google-fonts";

const TripList = () => {
  const { data, isSuccess } = useGetAllTripsQuery();
  const [deleteTrip] = useDeleteTripMutation();
  const { data: parksdb } = useGetParksQuery();

const parkImage = (trip) => {
  return parksdb
    ?.filter(park => park.fullName === trip)
    .map(park => park.images[0]);
};

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
  gridTemplateColumns: 'repeat(auto-fill, 300px)',
  gap: '1rem',
  maxWidth: "1200px",
  margin: '0 auto',
  justifyContent:"center"
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
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontWeight: 100,
    fontVariantLigatures: "normal",
    fontSize: "1rem",
    letterSpacing: ".5px",
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
  
  //useEffect(() => {
  //googleFonts("Roboto", "Yuji Hentaigana Akebono");
  //googleFonts();
  //}, []);
  
  return (
    <div style={containerStyle}>
      <div className="col-md-12 text-center">
        <div className="container">
          <div className="row">
            <h3 style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '4rem' }}>Your Upcoming Trips!</h3>
            <div style={cardContainerStyle}>
              {data.map((trip) => (
                <div key={trip.id} className="card" style={cardStyle} >
                  <div className="card-body">
                   <img src={parkImage(trip.national_park_name)} alt="Description for image" width="250" height="150" style={{ borderRadius: "5%" }} />
                    <h3 className="card-title">{trip.national_park_name}</h3>
                    <p>From: {trip.start_date}</p>
                    <p>To: {trip.end_date}</p>
                    <p>Activities: {trip.activities}</p>
                    <div className="d-flex justify-content-between flex-column">
                      <Link to={`/edittrip/${trip.id}`} className="btn btn-dark border border">
                        Edit This Trip
                      </Link>
                      <button className="btn btn-dark border mt-2" onClick={() => {handleDelete(trip.id)}}>Delete This Trip</button>
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
