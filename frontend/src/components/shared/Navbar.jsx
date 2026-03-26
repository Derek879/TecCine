import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🎬</span>
          <span className="navbar-logo-text">TecCine</span>
        </Link>

        <nav className="navbar-links">
          <NavLink
            to="/cartelera"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cartelera
          </NavLink>

          {user && (
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Mis entradas
            </NavLink>
          )}

          {user ? (
            <div className="navbar-user-box">
              <span className="navbar-user">Hola, {user.name}</span>

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Admin
                </NavLink>
              )}

              <button className="btn-logout" onClick={handleLogout}>
                Salir
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Iniciar sesión
              </NavLink>

              <Link to="/register" className="btn-register">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}