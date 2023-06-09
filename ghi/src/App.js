import { useEffect, useState } from "react";
import Construct from "./construct.js";
import ErrorNotification from "./errorNotification.js";
import "./index.css";
import Navbar from "./Navbar/Nav.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./login.js";
import HomePage from "./home.js";
import SignupForm from "./signupForm.js";
import TripForm from "./createTrip.js";
import ParkDetails from "./parkDetails.js";
import TripList from "./myTrips.js";
import UpdateTrip from "./editTrip.js";
import SpecificTrip from "./specificTrip.js";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

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
  );
}

export default App;
