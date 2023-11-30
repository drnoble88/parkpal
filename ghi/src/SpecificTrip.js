import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTripMutation, useGetParksQuery, useGetOneParkQuery } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {containerStyle2, formStyle } from "./styling.js";

const SpecificTrip = () => {
  const { parkCode } = useParams();
  const { data: park1 } = useGetOneParkQuery(parkCode);
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [trip] = useTripMutation();
  const navigate = useNavigate();
  const { data: parksdb } = useGetParksQuery();
  

  useEffect(() => {
    if (park1) {
      setNationalPark(park1.fullName);
    }
  }, [park1]);

  const act = () => {
    return (
      parksdb
        ?.filter((park) => park.fullName === nationalPark)
        .map((park) => park.activities.join(" - "))
        .join(" - ")
    );
  };

  const handleActivities = (event) => {
    const value = event.target.value;
    setActivities(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      national_park_name: nationalPark,
      start_date: startDate,
      end_date: endDate,
      activities: activities,
    };

    const response = await trip(data);
    if (response.error) {
      <h1>Error!</h1>;
    } else {
      setNationalPark("");
      setStartDate("");
      setEndDate("");
      setActivities("");
      navigate("/mytrips");
    }
  };

  return (
    <div style={containerStyle2}>
      <div className="container font-link">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="trip-form-container">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-12 login-title" style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "black" }}>
                <h2>{nationalPark}</h2>
              </div>
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit} style={formStyle}>
                  {parkCode && (
                    <div className="form-group">
                      <label className="form-control-label">
                        <h5>Start Date</h5>
                      </label>
                      <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                  )}
                  {parkCode && (
                    <div className="form-group">
                      <label className="form-control-label">
                        <h5>End Date</h5>
                      </label>
                      <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  )}
                  {parkCode && (
                    <div>
                      <div className="form-group">
                        <label>
                          <h5>Activities</h5>
                        </label>
                        <input type="text" className="form-control" value={activities} onChange={handleActivities} />
                      </div>
                      <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "black" }}>Please input based on the activities below</h5>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "black" }}>
                        {act()}
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 loginbttm" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" className="btn btn-dark" style={{ marginTop: "15px" }}>
                      Create Trip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SpecificTrip;
