import React, { useEffect, useState } from "react";
import { getBookingsByUser } from "../../storage.js";
import "../../Styles/card.css";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }
    setBookings(getBookingsByUser(user.email));
  }, [user]);

  return (
    <div className="container">
      <section className="section">
        <h2>My Bookings</h2>
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
    </div>
  );
}
