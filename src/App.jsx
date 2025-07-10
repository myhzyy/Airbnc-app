import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import Home from "./features/home/Home";
import PropertyPage from "./features/properties/PropertyPage";
import MyBookings from "./features/bookings/MyBookings";
import ContactUs from "./components/ContactUs";
import MyProfile from "./features/profile/MyProfile";

function App() {
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home setFilter={setFilter} filter={filter} user={user} />}
        />

        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route path="/property/:id" element={<PropertyPage user={user} />} />
        <Route path="/myBookings" element={<MyBookings user={user} />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route
          path="/profile"
          element={<MyProfile user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
