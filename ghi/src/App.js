import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Navbar from "./Navbar/Nav.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import HomePage from "./Home.js";
import SignupForm from "./SignupForm.js";
import TripForm from "./TripForm.js";
import ParkDetails from "./ParkDetails.js";
import TripList from "./TripList.js";
import UpdateTrip from "./updateTrip.js";


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
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
