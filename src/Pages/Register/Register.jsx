import React, { useState } from "react";
import { saveUser, findUserByEmail } from "../../storage.js";
import "../../Styles/forms.css";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name || !email || !pass) {
      setErr("All fields required");
      return;
    }
    if (findUserByEmail(email)) {
      setErr("Email already used");
      return;
    }
    const user = { name, email, password: pass, role: "passenger" };
    saveUser(user);
    localStorage.setItem(
      "sh_user",
      JSON.stringify({ name, email, role: "passenger" })
    );
    onRegister && onRegister({ name, email, role: "passenger" });
  }

  return (
    <div className="center-card">
      <div className="card-sm">
        <h2>Create account</h2>
        <form onSubmit={submit} className="form">
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="btn primary">Sign up</button>
        </form>
      </div>
    </div>
  );
}
