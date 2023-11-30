<<<<<<< HEAD
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [date_info, setDateInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/date-details`;
      console.log("FastAPI URL: ", url);
      let response = await fetch(url);
      console.log("------- Hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("Received date data!");
        setDateInfo(data.date_details);
      } else {
        console.log("Drat! Something happened!");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={date_info} />
    </div>
=======
import { useState } from "react";
import ErrorNotification from "./ErrorNotification.js";
import "./index.css";
import Navbar from "./Navbar/Nav.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./login.js";
import HomePage from "./Home.js";
import SignupForm from "./SignupForm.js";
import TripForm from "./createTrip.js";
import ParkDetails from "./ParkDetails.js";
import TripList from "./myTrips.js";
import UpdateTrip from "./editTrip.js";
import SpecificTrip from "./SpecificTrip.js";

function App() {
  const [error] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <ErrorNotification error={error} />
        {/* <Construct info={launchInfo} /> */}
        <div>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/createtrip" element={<TripForm />} />
            <Route path="/parkdetails/:parkCode" element={<ParkDetails />} />
            <Route path="/mytrips" element={<TripList />} />
            <Route path="/edittrip/:tripId" element={<UpdateTrip />} />
            <Route path="/specific/:parkCode" element={<SpecificTrip />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
>>>>>>> main
  );
}

export default App;
