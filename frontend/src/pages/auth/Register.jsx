import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Completa todos los campos");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    login(
      { name: form.name, email: form.email, role: "user" },
      "fake-token"
    );

    navigate("/");
    setLoading(false);
  };

  const campos = [
    { name: "name", type: "text", placeholder: "Nombre completo", icon: "👤" },
    { name: "email", type: "email", placeholder: "Correo electrónico", icon: "📧" },
    { name: "password", type: "password", placeholder: "Contraseña", icon: "🔒" },
    { name: "confirm", type: "password", placeholder: "Confirmar contraseña", icon: "🔐" },
  ];

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
          Crear cuenta
        </motion.h2>

        <motion.p
          className="auth-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Únete y empieza a disfrutar del cine
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
          {campos.map((campo, i) => (
            <motion.div
              key={campo.name}
              className="input-wrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <span className="input-icon">{campo.icon}</span>
              <input
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                value={form[campo.name]}
                onChange={handleChange}
                required
              />
              {form[campo.name] && (
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
          ))}

          {form.password && (
            <motion.div
              className="password-strength"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="strength-bar">
                <motion.div
                  className="strength-fill"
                  animate={{
                    width:
                      form.password.length < 6
                        ? "30%"
                        : form.password.length < 10
                        ? "65%"
                        : "100%",
                    backgroundColor:
                      form.password.length < 6
                        ? "#e50914"
                        : form.password.length < 10
                        ? "#f59e0b"
                        : "#10b981",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <span className="strength-label">
                {form.password.length < 6
                  ? "Débil"
                  : form.password.length < 10
                  ? "Media"
                  : "Fuerte"}
              </span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.02, backgroundColor: "#b0070f" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                Creando cuenta...
              </motion.span>
            ) : (
              "Crear cuenta"
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}