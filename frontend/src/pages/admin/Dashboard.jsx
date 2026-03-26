import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Admin.css'

const STATS = [
  { label: 'Películas activas', valor: 8, icono: '🎬', color: '#e50914', bg: '#1a0505' },
  { label: 'Usuarios registrados', valor: 124, icono: '👥', color: '#3b82f6', bg: '#051a2a' },
  { label: 'Entradas vendidas hoy', valor: 47, icono: '🎟️', color: '#10b981', bg: '#051a12' },
  { label: 'Ingresos del mes', valor: 'S/. 4,820', icono: '💰', color: '#f59e0b', bg: '#1a1205' },
]

const VENTAS_RECIENTES = [
  { id: 1, usuario: 'Carlos López', pelicula: 'Avengers: Doomsday', asientos: 'C3, C4', total: 37.80, fecha: '23/03/2026' },
  { id: 2, usuario: 'María García', pelicula: 'Sonic 3', asientos: 'B5', total: 16.90, fecha: '23/03/2026' },
  { id: 3, usuario: 'Pedro Díaz', pelicula: 'Minecraft', asientos: 'A1, A2', total: 33.80, fecha: '22/03/2026' },
  { id: 4, usuario: 'Ana Torres', pelicula: 'Thunderbolts', asientos: 'D6', total: 18.90, fecha: '22/03/2026' },
  { id: 5, usuario: 'Luis Ramos', pelicula: 'Lilo & Stitch', asientos: 'E2, E3, E4', total: 47.70, fecha: '21/03/2026' },
]

const ACCESOS_RAPIDOS = [
  { label: 'Gestionar películas', icono: '🎬', to: '/admin/peliculas', color: '#e50914' },
  { label: 'Gestionar usuarios', icono: '👥', to: '/admin/usuarios', color: '#3b82f6' },
  { label: 'Ver reportes', icono: '📊', to: '/admin/reportes', color: '#10b981' },
  { label: 'Funciones y horarios', icono: '🕐', to: '/admin/funciones', color: '#f59e0b' },
]

export default function Dashboard() {
  return (
    <div className="admin-page">

      {/* HEADER */}
      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>Panel de administración</h1>
          <p className="admin-sub">Bienvenido de vuelta 👋 Aquí está el resumen de hoy.</p>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            style={{ borderColor: s.color + '33' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, borderColor: s.color, boxShadow: `0 8px 30px ${s.color}33` }}
          >
            <motion.div
              className="stat-icono"
              style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}44` }}
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {s.icono}
            </motion.div>
            <div>
              <motion.p
                className="stat-valor"
                style={{ color: s.color }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
              >
                {s.valor}
              </motion.p>
              <p className="stat-label">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ACCESOS RÁPIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="section-title">Accesos rápidos</h2>
        <div className="accesos-grid">
          {ACCESOS_RAPIDOS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={a.to}
                className="acceso-card"
                style={{ borderColor: a.color + '44' }}
              >
                <motion.span
                  className="acceso-icono"
                  style={{ background: a.color + '22', color: a.color }}
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {a.icono}
                </motion.span>
                <span className="acceso-label">{a.label}</span>
                <motion.span
                  className="acceso-arrow"
                  style={{ color: a.color }}
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* VENTAS RECIENTES */}
      <motion.div
        className="admin-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="section-title">Ventas recientes</h2>
        <div className="tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Película</th>
                <th>Asientos</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {VENTAS_RECIENTES.map((v, i) => (
                <motion.tr
                  key={v.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.07 }}
                  whileHover={{ backgroundColor: '#1a1a1a' }}
                >
                  <td style={{ color: '#555' }}>#{v.id}</td>
                  <td><strong>{v.usuario}</strong></td>
                  <td>{v.pelicula}</td>
                  <td><span className="asiento-tag">{v.asientos}</span></td>
                  <td><span className="total-verde">S/. {v.total.toFixed(2)}</span></td>
                  <td style={{ color: '#555' }}>{v.fecha}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  )
}