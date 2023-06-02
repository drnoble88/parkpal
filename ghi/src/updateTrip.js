import React, { useState } from "react";
import {  useUpdateTripMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateTrip = () => {
  const { tripId } = useParams();
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [update] = useUpdateTripMutation();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "national_park_name": nationalPark,
      "start_date": startDate,
      "end_date": endDate,
      "activities": activities,
      "id": tripId
    }

    console.log("DATAAA",data)
    console.log("Tripid:",data.id)


    const response = await update(data);
    if (response.error) {
      // Handle validation or input error
      setErrorMessage("Please fill in all the fields");
    } else {
      // Handle successful signup
      console.log("trip succesfully created");
      // Reset form inputs
      setNationalPark("");
      setStartDate("");
      setEndDate("");
      setActivities("");
      setErrorMessage("");
      navigate('/mytrips');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">Edit Your Trip!</div>
          <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-label">National Park</label>
                <input
                  type="text"
                  className="form-control"
                  value={nationalPark}
                  onChange={(e) => setNationalPark(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Activities</label>
                <input
                  type="text"
                  className="form-control"
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                />
              </div>
              <div className="col-lg-12 loginbttm">
                <div className="col-lg-6 login-btm login-text">
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="col-lg-6 login-btm login-button">
                  <button type="submit" className="btn btn-outline-primary">
                    Create Trip
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </div>
  );
};

export default UpdateTrip;
