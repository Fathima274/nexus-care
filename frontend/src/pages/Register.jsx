import React, { useState } from "react";
import { register, saveToken, saveUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const { token, user } = await register(form);
      saveToken(token);
      saveUser(user);
      nav("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-sub">Your health companion starts here.</p>

        {err && <div className="auth-error">{err}</div>}

        <form onSubmit={onSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full name"
            required
          />
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
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
