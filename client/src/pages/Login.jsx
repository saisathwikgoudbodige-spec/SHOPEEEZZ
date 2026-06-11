import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("Use your account credentials to access protected trading features.");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      login(response.data);
      navigate("/market");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Check API and credentials.");
    }
  }

  return (
    <main className="page-section auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome Back</p>
        <h1>Login</h1>
        <p>{message}</p>
        <label>Email</label>
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <button className="btn btn-primary w-100 mt-3">Login</button>
        <Link className="auth-link" to="/register">Create a new account</Link>
      </form>
    </main>
  );
}
