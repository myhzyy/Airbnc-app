import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Properties from "./components/Properties";
import Login from "./components/Login";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";

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
      </Routes>
    </>
  );
}

export default App;
