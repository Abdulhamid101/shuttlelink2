import React, { useState } from "react";
import "../../Styles/card.css";
import { saveBooking, getBookingsByUser } from "../../storage.js";

export default function BookingModal({ route, user, onClose, onBooked }) {
  const [stop, setStop] = useState(route.stops[0] || "");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      setMsg("Please login first");
      return;
    }
    // seat number = count of bookings for route + 1
    const all = JSON.parse(localStorage.getItem("sh_bookings") || "[]");
    const countForRoute = all.filter(
      (b) => b.routeId === route.id && b.status === "booked"
    ).length;
    const seatNumber = countForRoute + 1;
    const booking = {
      id: "bk_" + Date.now(),
      routeId: route.id,
      routeName: route.name,
      stop,
      seatNumber,
      bookedBy: user.email,
      createdAt: new Date().toISOString(),
      status: "booked",
    };
    saveBooking(booking);
    setMsg("Booked seat #" + seatNumber);
    onBooked && onBooked();
    setTimeout(() => onClose(), 900);
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <h3>Book — {route.name}</h3>
        <div className="field">
          <label>Choose stop</label>
          <select value={stop} onChange={(e) => setStop(e.target.value)}>
            {route.stops.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="actions">
          <button type="button" className="btn light" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary">Confirm</button>
        </div>
        {msg && <div className="note">{msg}</div>}
      </form>
    </div>
  );
}
