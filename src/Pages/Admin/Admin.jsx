import React, { useState, useEffect } from "react";
import { getRoutes, saveRoutes } from "../../data.js";
import { getAllBookings } from "../../storage.js";
import "../../styles/forms.css";

export default function Admin() {
  const [routes, setRoutes] = useState([]);
  const [name, setName] = useState("");
  const [stopsText, setStopsText] = useState("");
  const [scheduleText, setScheduleText] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setRoutes(getRoutes());
    setBookings(getAllBookings());
  }, []);

  function handleAdd() {
    const next = Math.max(0, ...routes.map((r) => r.id)) + 1;
    const newRoute = {
      id: next,
      name: name || "Untitled",
      stops: stopsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      schedule: scheduleText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const arr = [...routes, newRoute];
    saveRoutes(arr);
    setRoutes(arr);
    setName("");
    setStopsText("");
    setScheduleText("");
  }

  return (
    <div className="container">
      <section className="section">
        <h2>Admin — Manage Routes</h2>
        <div className="card">
          <div className="form">
            <input
              placeholder="Route name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Stops (comma separated)"
              value={stopsText}
              onChange={(e) => setStopsText(e.target.value)}
            />
            <input
              placeholder="Schedule (comma separated times)"
              value={scheduleText}
              onChange={(e) => setScheduleText(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn primary" onClick={handleAdd}>
                Add route
              </button>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: 20 }}>Existing routes</h3>
        <div className="grid">
          {routes.map((r) => (
            <div key={r.id} className="card small">
              <strong>{r.name}</strong>
              <div className="muted">{r.stops.join(" • ")}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>All Bookings</h3>
        <div className="card light">
          {bookings.length ? (
            bookings.map((b) => (
              <div key={b.id}>
                {b.routeName} — {b.stop} — seat #{b.seatNumber} —{" "}
                <strong>{b.bookedBy}</strong>
              </div>
            ))
          ) : (
            <div className="muted">No bookings yet</div>
          )}
        </div>
      </section>
    </div>
  );
}
