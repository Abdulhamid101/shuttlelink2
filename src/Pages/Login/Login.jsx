import React, { useState } from "react";
import { Link } from "react-router-dom";
import { findUserByEmail } from "../../storage.js";
import "../../Styles/forms.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    const u = findUserByEmail(email);
    if (!u || u.password !== pass) {
      setErr("Invalid credentials (or register first).");
      return;
    }
    const user = { name: u.name, email: u.email, role: u.role };
    localStorage.setItem("sh_user", JSON.stringify(user));
    onLogin && onLogin(user);
  }

  return (
    <div className="center-card">
      <div className="card-sm">
        <h2>Welcome back</h2>
        <form onSubmit={submit} className="form">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {err && <div className="error">{err}</div>}
          <button className="btn primary">Sign in</button>
        </form>
        <div className="meta">
          Don't have account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
