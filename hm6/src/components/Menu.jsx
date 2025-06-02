import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Menu.css";

export default function Menu() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="menu">
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
      <NavLink to="/countries" className={({ isActive }) => isActive ? "active" : ""}>Countries</NavLink>
      {isAuthenticated ? (
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>Вийти</button>
      ) : (
        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""} style={{ marginLeft: "auto" }}>
          Увійти
        </NavLink>
      )}
    </nav>
  );
}
