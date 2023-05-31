import React from "react";
import { useGetAllTripsQuery } from "./store/apiSlice";

const TripList = () => {
  const { data, isLoading } = useGetAllTripsQuery();

  if (!isLoading) {
    return <div>Loading...</div>;
  }

 return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {data.map(trip => {
            return (
                <div key={trip.id}>
                <h1>{trip.national_park_name}</h1>
                <p>{trip.start_date}</p>
                <p>{trip.end_date}</p>
                <p>{trip.activities}</p>
                </div>
            );
            })}
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList;
