import React, { useEffect, useState } from "react";
import { getRoutes } from "../../data.js";
import BookingModal from "../../Component/BookingModal/BookingModal.jsx";
import "../../Styles/card.css";
import { getBookingsByUser } from "../../storage.js";

export default function RoutesPage({ user }) {
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setRoutes(getRoutes());
    setBookings(user ? getBookingsByUser(user.email) : []);
  }, [user]);

  function onBooked() {
    if (user) setBookings(getBookingsByUser(user.email));
  }

  return (
    <div className="container">
      <section className="section">
        <h2>Available Routes</h2>
        <p className="muted">Book a seat and check your booking history</p>
        <div className="grid">
          {routes.map((r) => (
            <div key={r.id} className="card route-card">
              <div className="card-row">
                <div>
                  <h3>{r.name}</h3>
                  <div className="chips">
                    {r.stops.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="schedule">{r.schedule.join(" • ")}</div>
              </div>
              <div className="card-actions">
                <button className="btn primary" onClick={() => setSelected(r)}>
                  Book seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>My Bookings</h3>
        <div className="card light">
          {bookings.length ? (
            <ul>
              {bookings.map((b) => (
                <li key={b.id}>
                  {b.routeName} — {b.stop} — seat #{b.seatNumber}{" "}
                  <small className="muted">
                    ({new Date(b.createdAt).toLocaleString()})
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="muted">No bookings yet</div>
          )}
        </div>
      </section>

      {selected && (
        <BookingModal
          route={selected}
          user={user}
          onClose={() => setSelected(null)}
          onBooked={onBooked}
        />
      )}
    </div>
  );
}
