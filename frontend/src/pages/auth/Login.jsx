import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    if (form.email === "admin@cine.com" && form.password === "123456") {
      login(
        { name: "Admin", email: form.email, role: "admin" },
        "fake-token"
      );
      navigate("/admin");
    } else if (form.email && form.password) {
      login(
        { name: "Usuario", email: form.email, role: "user" },
        "fake-token"
      );
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="auth-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          🎬
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Bienvenido de vuelta
        </motion.h2>

        <motion.p
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Inicia sesión para comprar tus entradas
        </motion.p>

        {error && (
          <motion.p
            className="auth-error"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ⚠️ {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="input-wrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="input-icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
            {form.email && (
              <motion.span
                className="input-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>

          <motion.div
            className="input-wrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "2.8rem" }}
            />
            <motion.button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? "🙈" : "👁️"}
            </motion.button>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, backgroundColor: "#b0070f" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                Entrando...
              </motion.span>
            ) : (
              "Iniciar sesión"
            )}
          </motion.button>
        </form>

        <motion.div
          className="quick-access"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="quick-label">Acceso rápido demo</p>
          <div className="quick-btns">
            <motion.button
              type="button"
              className="quick-btn"
              whileHover={{ scale: 1.05, borderColor: "#e50914", color: "#e50914" }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setForm({ email: "admin@cine.com", password: "123456" })
              }
            >
              ⭐ Admin
            </motion.button>

            <motion.button
              type="button"
              className="quick-btn"
              whileHover={{ scale: 1.05, borderColor: "#3b82f6", color: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setForm({ email: "usuario@cine.com", password: "123456" })
              }
            >
              👤 Usuario
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}