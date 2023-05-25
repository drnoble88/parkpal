import React, { useState } from "react";
import { useTripMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";

const TripForm = () => {
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [trip] = useTripMutation();
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log(trip({ nationalPark, startDate, endDate, activities }));
    const response = await trip({ nationalPark, startDate, endDate, activities });
    if (response.error) {
      // Handle validation or input error
      setErrorMessage("Please fill in all the fields");
    } else {
      // Handle successful signup
      console.log("Signup successful!");
      // Reset form inputs
      setNationalPark("");
      setStartDate("");
      setEndDate("");
      setActivities("");
      setErrorMessage("");
      navigate('/login');
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
          <div className="col-lg-12 login-title">TRIP Panel</div>
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

export default TripForm;
