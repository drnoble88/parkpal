import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useUpdateTripMutation, useGetParksQuery, useGetOneTripQuery } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";

const UpdateTrip = () => {
  const { tripId } = useParams();
  const { data: oneTrip } = useGetOneTripQuery(tripId);
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [update] = useUpdateTripMutation();
  const navigate = useNavigate();
  const { data: parksdb } = useGetParksQuery();

  useEffect(() => {
    if (oneTrip) {
      setNationalPark(oneTrip.national_park_name);
      setStartDate(oneTrip.start_date);
      setEndDate(oneTrip.end_date);
      setActivities(oneTrip.activities);
    }
  }, [oneTrip]);

  const act = () => {
    return parksdb
      ?.filter((park) => park.fullName === nationalPark)
      .map((park) => park.activities.join(" - "))
      .join(" - ");
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
      id: tripId,
    };

    const response = await update(data);
    if (response.error) {
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

  const formStyle = {
    color: "white",
  };

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
              <div className="col-lg-12 login-title" style={{ marginBottom: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>{nationalPark}</h2></div>
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit} style={formStyle}>
                  {oneTrip && (
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
                  {oneTrip && (
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
                  {oneTrip && (
                    <div>
                      <div className="form-group">
                        <label>
                          <h5>Activities</h5>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={activities}
                          onChange={handleActivities}
                        />
                      </div>
                      <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center", color: "black" }}>Please input based on the activities below</h5>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center", color: "black" }}>
                        {act()}
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 loginbttm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="submit" className="btn btn-dark mt-2" style={{ marginTop: '15px' }}>
                      Update Trip
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

export default UpdateTrip;
