import React, { useState, useEffect } from "react";
import { useTripMutation, useGetParksQuery } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";
import states from "./States";

const TripForm = () => {
  const [stateCode, setStateCode] = useState("");
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [trip] = useTripMutation();
  const navigate = useNavigate();
  const { data: parksdb } = useGetParksQuery();

  const act = () => {
    return parksdb
      .filter((park) => park.fullName === nationalPark)
      .map((park) => park.activities.join(" - "))
      .join(" - ");
  };

  const handleStateCode = (event) => {
    setStateCode(event.target.value);
  };

  const handlePark = (event) => {
    const value = event.target.value;
    setNationalPark(value);
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

  const containerStyle = {
    backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/moraine-lake-banff-national-park-mountains-daytime-scenery-3840x2160-2923.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {}, [stateCode]);

  return (
    <div style={containerStyle}>
      <div className="container font-link">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="trip-form-container">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div
                className="col-lg-12 login-title font-link"
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Create Your Trip!</h2>
              </div>
              <div
                className="col-lg-12 login-form"
                style={{
                  marginBottom: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">
                      <h5>Park State</h5>
                    </label>
                    <select
                      onChange={handleStateCode}
                      value={stateCode}
                      required
                      id="state"
                      name="state"
                      className="form-select"
                    >
                      <option value="">Choose a State</option>
                      {Object.entries(states).map(([key, value]) => {
                        return (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {stateCode && (
                    <div className="form-group">
                      <label className="form-control-label">
                        <h5>Park Name</h5>
                      </label>
                      <select
                        onChange={handlePark}
                        value={nationalPark}
                        required
                        id="park"
                        name="park"
                        className="form-select"
                      >
                        <option value="" className="form-select">
                          Choose a Park
                        </option>
                        {parksdb
                          .filter((park) => park.addresses.stateCode === stateCode)
                          .map((park) => {
                            return (
                              <option key={park.parkCode} value={park.fullName}>
                                {park.fullName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  )}
                  {nationalPark && (
                    <div className="form-group">
                      <label className="form-control-label">
                        <h5>Start Date</h5>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  )}
                  {nationalPark && (
                    <div className="form-group">
                      <label className="form-control-label">
                        <h5>End Date</h5>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  )}
                  {endDate && (
                    <div>
                      <div className="form-group">
                        <label className="form-control-label">
                          <h5>Activities</h5>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={activities}
                          onChange={handleActivities}
                        />
                      </div>
                      <h5
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
                        Please input based on the activities below
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
                        {act()}
                      </div>
                    </div>
                  )}
                  <div
                    className="col-lg-12 loginbttm"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-dark"
                      style={{ marginTop: "15px" }}
                    >
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

export default TripForm;
