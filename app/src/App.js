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
  );
}

export default App;
