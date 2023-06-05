import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useUpdateTripMutation, useGetParksQuery, useGetOneTripQuery } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./tripform.css";

const UpdateTrip = () => {
  const { tripId } = useParams();
  const { data: oneTrip } = useGetOneTripQuery(tripId);
  const [stateCode, setStateCode] = useState("");
  const [nationalPark, setNationalPark] = useState(oneTrip?.national_park_name);
  const [startDate, setStartDate] = useState(oneTrip?.start_date);
  const [endDate, setEndDate] = useState(oneTrip?.end_date);
  const [activities, setActivities] = useState(oneTrip?.activities);
  const [update] = useUpdateTripMutation();
  const navigate = useNavigate();
  const { data: parksdb, isSuccess } = useGetParksQuery();
  console.log("OneTrip:::", oneTrip)
  
  const act = () => {
    return parksdb
      ?.filter(park => park.fullName === nationalPark)
      .map(park => park.activities.join(" - "))
      .join(" - ");
  };
  
  const handleStateCode = (event) => {
    setStateCode(event.target.value)
  }

  const handlePark = (event) => {
    const value = event.target.value
    setNationalPark(value)
  }
  
  const handleActivities = (event) => {
    const value = event.target.value
    setActivities(value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "national_park_name": nationalPark,
      "start_date": startDate,
      "end_date": endDate,
      "activities": activities,
      "id": tripId
    }

    console.log("DATAAA", data)
    const response = await update(data);
    if (response.error) {
      <h1>Error!</h1>
      // Handle validation or input error
    } else {
      // Handle successful signup
      console.log("trip succesfully created");
      // Reset form inputs
      setNationalPark("");
      setStartDate("");
      setEndDate("");
      setActivities("");
      navigate('/mytrips');
    }
  };

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
  
  const formStyle = {
    color: 'white', // Set text color to white
  };



  useEffect(() => {
  }, [stateCode])

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="trip-form-container">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-12 login-title">
                <h1 >{oneTrip?.national_park_name}</h1>
              </div>
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit} style={formStyle}>
                  { (
                    <div className="form-group">
                      <label className="form-control-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  )}
                  { (
                    <div className="form-group">
                      <label className="form-control-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  )}
                  {(
                    <div>
                      <div className="form-group">
                        <label className="form-control-label">Activities</label>
                        <input
                          type="text"
                          className="form-control"
                          value={activities}
                          onChange={handleActivities}
                        />
                      </div>
                      <h3>Please input based on the activities below</h3>
                      {act()}
                    </div>
                  )}
                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-button">
                      <button type="submit" className="btn btn-outline-primary">
                        Update Trip
                      </button>
                    </div>
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

