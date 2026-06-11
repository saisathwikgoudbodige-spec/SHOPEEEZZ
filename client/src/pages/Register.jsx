import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("Create an investor account with a starter virtual balance.");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/register", form);
      login(response.data);
      navigate("/market");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Check API connection.");
    }
  }

  return (
    <main className="page-section auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Start Trading</p>
        <h1>Register</h1>
        <p>{message}</p>
        <label>Name</label>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <label>Email</label>
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <label>Password</label>
        <input type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <button className="btn btn-primary w-100 mt-3">Create Account</button>
        <Link className="auth-link" to="/login">Already have an account?</Link>
      </form>
    </main>
  );
}
