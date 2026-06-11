import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">SHOPEEEZZ</Link>
        <div className="navbar-nav ms-auto gap-2 align-items-lg-center">
          <NavLink className="nav-link" to="/market">Market</NavLink>
          <NavLink className="nav-link" to="/portfolio">Portfolio</NavLink>
          {isAdmin && <NavLink className="nav-link" to="/admin">Admin</NavLink>}
          {user ? (
            <>
              <span className="nav-user">{user.name}</span>
              <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="btn btn-sm btn-primary" to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
