import React, { useState } from "react";
import { login, saveToken, saveUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const { token, user } = await login(form);
      saveToken(token);
      saveUser(user);
      nav("/home");   // Redirect to Home after login
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>NexusCare+ Login</h2>
        <p className="auth-sub">Welcome back — we missed you!</p>

        {err && <div className="auth-error">{err}</div>}

        <form onSubmit={onSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email address"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
