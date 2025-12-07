import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import RoutesPage from "./Pages/Routes/Routes";
import MyBookings from "./Pages/MyBookings/MyBookings";
import Admin from "./Pages/Admin/Admin";
import Topbar from "./Component/Topbar/Topbar";
import { ensureSeed } from "./data";
// import "./styles/card.css";

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("sh_user") || "null")
  );
  const nav = useNavigate();

  useEffect(() => {
    ensureSeed(); // ensure sample routes exist
  }, []);

  function handleLogout() {
    localStorage.removeItem("sh_user");
    setUser(null);
    nav("/");
  }

  return (
    <div className="app">
      <Topbar user={user} onLogout={handleLogout} />
      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                onLogin={(u) => {
                  setUser(u);
                  nav("/routes");
                }}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onRegister={(u) => {
                  setUser(u);
                  nav("/routes");
                }}
              />
            }
          />
          <Route path="/routes" element={<RoutesPage user={user} />} />
          <Route path="/bookings" element={<MyBookings user={user} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/driver-map" element={<div>Driver Map Coming Soon</div>} />

        </Routes>
      </main>
    </div>
  );
}
