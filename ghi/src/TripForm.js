import React, { useState, useEffect } from "react";
import { useTripMutation, useGetParksQuery } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./tripform.css";
import states from "./States";

const TripForm = () => {
  const [stateCode, setStateCode] = useState("");
  const [nationalPark, setNationalPark] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [trip] = useTripMutation();
  const navigate = useNavigate();
  const { data: parksdb, isSuccess } = useGetParksQuery();
  // console.log("activites: ", parksdb[0].activities)
  const act = () => {
    return parksdb
      .filter(park => park.fullName === nationalPark)
      .map(park => park.activities.join(" - "))
      .join(" - ");
  };
  const handleStateCode = (event) => {
    // const value = value
    // console.log(value)
    setStateCode(event.target.value)
    console.log(stateCode)
  }
  // let act = activities.join(" - ");

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
      "activities": activities
    }

    console.log("DATAAA",data)
    const response = await trip(data);
    if (response.error) {
      // Handle validation or input error
      <h1>Error!</h1>
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
            <div className="col-lg-12 login-title" style={{ marginBottom: '5px' }}><h3>Trip Panel</h3></div>
            <div className="col-lg-12 login-form" style={{ marginBottom: '10px' , alignItems: "center" , justifyContent: 'center' }}>
              <form onSubmit={handleSubmit}>
               <div className="form-group">
                <select onChange={handleStateCode} value={stateCode} required id="state" name="state" className="form-select">
                  <option value="">Choose a State</option>
                    {Object.entries(states).map(([key, value]) => {
                      return (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    })}
                  </select>
                </div>
                {/* <div className="form-group"> */}
                  {stateCode &&
                  <div className="form-group">
                    <select onChange={handlePark} value={nationalPark} required id="park" name="park" className="form-select">
                      <option value="">Choose a Park</option>
                        {parksdb.filter(park => park.addresses.stateCode === stateCode)
                        .map(park => {
                            return (
                              <option key={park.parkCode} value={park.fullName}>
                                {park.fullName}
                              </option>                            
                            )
                          })}
                  </select>
                  </div>
                  }
                {nationalPark &&
                  <div className="form-group">
                  <label className="form-control-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>}
                {nationalPark && <div className="form-group">
                  <label className="form-control-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>}
                {/* {
                endDate &&
                  <div className="form-group">
                    <select onChange={handleActivities} value={activities} required id="activities" name="activities" className="form-select">
                      <option value="">Choose an Activity</option>
                      {parksdb
                        .filter(park => park.fullName === nationalPark)
                        .map(park => park.activities.map(activity => (
                          <option key={activity} value={activity}>
                            {console.log(activity)}
                            {activity}
                          </option>
                        )))}  
                    </select>
                  </div>
                  } */}
                {
                  endDate && (
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
                      <h3> Please input based on the activites below</h3>
                      {act()}
                    </div>
                  )
                }
                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary" style={{marginTop: '5px', marginBottom: '5px'}}>
                      Create Trip
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

export default TripForm;
