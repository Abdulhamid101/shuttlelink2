import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/forms.css";
import "./Topbar.css";

export default function Topbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">🚌</div>
        <div className="brand-text">
          <div className="brand-title">ShuttleLink</div>
          <div className="brand-sub">Campus Shuttle Booking</div>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Nav Menu */}
      <nav className={`nav ${open ? "open" : ""}`}>
        <Link to="/routes" onClick={() => setOpen(false)}>
          Routes
        </Link>
        <Link to="/bookings" onClick={() => setOpen(false)}>
          My Bookings
        </Link>
        <Link to="/admin" onClick={() => setOpen(false)}>
          Admin
        </Link>

        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button
              className="btn small"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" onClick={() => setOpen(false)}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
