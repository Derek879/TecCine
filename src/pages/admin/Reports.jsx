import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Admin.css'
import './Reports.css'

const VENTAS_MES = [
  { mes: 'Oct', ventas: 3200 },
  { mes: 'Nov', ventas: 4100 },
  { mes: 'Dic', ventas: 6800 },
  { mes: 'Ene', ventas: 3900 },
  { mes: 'Feb', ventas: 4500 },
  { mes: 'Mar', ventas: 4820 },
]

const TOP_PELICULAS = [
  { titulo: 'Avengers: Doomsday', entradas: 312, ingresos: 5896.80, porcentaje: 95 },
  { titulo: 'Minecraft: La Película', entradas: 245, ingresos: 4140.50, porcentaje: 78 },
  { titulo: 'Misión Imposible 8', entradas: 198, ingresos: 3940.20, porcentaje: 63 },
  { titulo: 'Sonic 3', entradas: 176, ingresos: 2974.40, porcentaje: 56 },
  { titulo: 'Thunderbolts', entradas: 154, ingresos: 2908.60, porcentaje: 49 },
  { titulo: 'Lilo & Stitch', entradas: 132, ingresos: 2098.80, porcentaje: 42 },
]

const VENTAS_SEMANA = [
  { dia: 'Lun', entradas: 42, color: '#e50914' },
  { dia: 'Mar', entradas: 38, color: '#e50914' },
  { dia: 'Mié', entradas: 55, color: '#e50914' },
  { dia: 'Jue', entradas: 47, color: '#e50914' },
  { dia: 'Vie', entradas: 89, color: '#e50914' },
  { dia: 'Sáb', entradas: 124, color: '#e50914' },
  { dia: 'Dom', entradas: 98, color: '#e50914' },
]

const MAX_SEMANA = Math.max(...VENTAS_SEMANA.map(v => v.entradas))

const STATS = [
  { label: 'Ingresos este mes', valor: 'S/. 4,820', icono: '💰', color: '#10b981', bg: '#051a12', sub: '+12% vs mes anterior' },
  { label: 'Entradas vendidas', valor: '1,217', icono: '🎟️', color: '#3b82f6', bg: '#051a2a', sub: '+8% vs mes anterior' },
  { label: 'Combos vendidos', valor: '438', icono: '🍿', color: '#f59e0b', bg: '#1a1205', sub: 'S/. 6,240 en combos' },
  { label: 'Película más vista', valor: 'Avengers', icono: '🎬', color: '#e50914', bg: '#1a0505', sub: '312 entradas' },
]

export default function Reports() {
  return (
    <div className="admin-page">

      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Link to="/admin" className="back-link">← Dashboard</Link>
          <h1>📊 Reportes y estadísticas</h1>
        </div>
        <div className="reporte-periodo">
          <span className="periodo-label">Período:</span>
          <select className="periodo-select">
            <option>Marzo 2026</option>
            <option>Febrero 2026</option>
            <option>Enero 2026</option>
          </select>
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
            >
              {s.icono}
            </motion.div>
            <div>
              <p className="stat-valor" style={{ color: s.color }}>{s.valor}</p>
              <p className="stat-label">{s.label}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="reportes-grid">

        {/* GRÁFICA DE BARRAS SEMANAL */}
        <motion.div
          className="reporte-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Entradas vendidas esta semana</h3>
          <div className="barra-chart">
            {VENTAS_SEMANA.map((v, i) => (
              <div key={v.dia} className="barra-item">
                <span className="barra-valor">{v.entradas}</span>
                <motion.div
                  className="barra"
                  initial={{ height: 0 }}
                  animate={{ height: `${(v.entradas / MAX_SEMANA) * 160}px` }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ backgroundColor: '#ff2a35' }}
                  style={{ backgroundColor: '#e50914' }}
                />
                <span className="barra-dia">{v.dia}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GRÁFICA DE LÍNEA MENSUAL */}
        <motion.div
          className="reporte-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Ingresos últimos 6 meses</h3>
          <div className="linea-chart">
            {VENTAS_MES.map((v, i) => {
              const max = Math.max(...VENTAS_MES.map(x => x.ventas))
              const altura = (v.ventas / max) * 140
              return (
                <div key={v.mes} className="linea-item">
                  <motion.div
                    className="linea-punto-wrap"
                    style={{ marginBottom: `${altura}px` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <motion.div
                      className="linea-punto"
                      whileHover={{ scale: 1.5 }}
                    >
                      <span className="linea-tooltip">S/. {v.ventas.toLocaleString()}</span>
                    </motion.div>
                  </motion.div>
                  <span className="linea-mes">{v.mes}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>

      {/* TOP PELÍCULAS */}
      <motion.div
        className="reporte-card full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3>🏆 Top películas del mes</h3>
        <div className="top-lista">
          {TOP_PELICULAS.map((p, i) => (
            <motion.div
              key={p.titulo}
              className="top-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <span className="top-num" style={{
                color: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#cd7c3a' : '#555'
              }}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </span>
              <div className="top-info">
                <span className="top-titulo">{p.titulo}</span>
                <div className="top-barra-wrap">
                  <motion.div
                    className="top-barra"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.porcentaje}%` }}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div className="top-stats">
                <span className="top-entradas">🎟️ {p.entradas}</span>
                <span className="top-ingresos">S/. {p.ingresos.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}