import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Admin.css'
import './Functions.css'

const FUNCIONES_INICIAL = [
  { id: 1, pelicula: 'Avengers: Doomsday', sala: 'Sala 1', fecha: '2026-03-24', horarios: ['10:00', '13:30', '16:00', '19:30', '22:00'], ocupacion: 87, activa: true },
  { id: 2, pelicula: 'Minecraft: La Película', sala: 'Sala 2', fecha: '2026-03-24', horarios: ['11:00', '14:00', '17:00', '20:00'], ocupacion: 62, activa: true },
  { id: 3, pelicula: 'Sonic 3', sala: 'Sala 3', fecha: '2026-03-24', horarios: ['10:30', '13:00', '15:30', '18:00', '21:00'], ocupacion: 45, activa: true },
  { id: 4, pelicula: 'Thunderbolts', sala: 'Sala 1', fecha: '2026-03-25', horarios: ['12:00', '15:00', '18:30', '21:30'], ocupacion: 73, activa: true },
  { id: 5, pelicula: 'Lilo & Stitch', sala: 'Sala 2', fecha: '2026-03-25', horarios: ['10:00', '12:30', '15:00', '17:30'], ocupacion: 30, activa: false },
  { id: 6, pelicula: 'Misión Imposible 8', sala: 'Sala 4', fecha: '2026-03-25', horarios: ['11:30', '14:30', '17:30', '20:30', '23:00'], ocupacion: 91, activa: true },
]

const PELICULAS = ['Avengers: Doomsday', 'Minecraft: La Película', 'Sonic 3', 'Thunderbolts', 'Lilo & Stitch', 'Misión Imposible 8', 'Karate Kid', 'Final Destination']
const SALAS = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala VIP']
const VACIO = { pelicula: '', sala: '', fecha: '', horario: '' }

export default function ManageFunctions() {
  const [funciones, setFunciones] = useState(FUNCIONES_INICIAL)
  const [form, setForm] = useState(VACIO)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [filtroFecha, setFiltroFecha] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleGuardar = () => {
    if (!form.pelicula || !form.sala || !form.fecha || !form.horario) return
    if (editandoId) {
      setFunciones(prev => prev.map(f =>
        f.id === editandoId
          ? { ...f, pelicula: form.pelicula, sala: form.sala, fecha: form.fecha, horarios: [...f.horarios, form.horario] }
          : f
      ))
      setEditandoId(null)
    } else {
      setFunciones(prev => [...prev, {
        id: Date.now(),
        pelicula: form.pelicula,
        sala: form.sala,
        fecha: form.fecha,
        horarios: [form.horario],
        ocupacion: 0,
        activa: true
      }])
    }
    setForm(VACIO)
    setMostrarForm(false)
  }

  const handleEliminar = (id) =>
    setFunciones(prev => prev.filter(f => f.id !== id))

  const toggleActiva = (id) =>
    setFunciones(prev => prev.map(f =>
      f.id === id ? { ...f, activa: !f.activa } : f
    ))

  const filtradas = funciones.filter(f =>
    filtroFecha ? f.fecha === filtroFecha : true
  )

  const getOcupacionColor = (pct) => {
    if (pct >= 80) return '#e50914'
    if (pct >= 50) return '#f59e0b'
    return '#10b981'
  }

  return (
    <div className="admin-page">

      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Link to="/admin" className="back-link">← Dashboard</Link>
          <h1>🕐 Funciones y horarios</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="date"
            value={filtroFecha}
            onChange={e => setFiltroFecha(e.target.value)}
            className="buscador-admin"
            style={{ width: 'auto' }}
          />
          <motion.button
            className="btn-nuevo"
            onClick={() => { setMostrarForm(true); setEditandoId(null); setForm(VACIO) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Nueva función
          </motion.button>
        </div>
      </motion.div>

      {/* RESUMEN SALAS */}
      <div className="salas-resumen">
        {SALAS.map((sala, i) => {
          const funcionesSala = funciones.filter(f => f.sala === sala && f.activa)
          return (
            <motion.div
              key={sala}
              className="sala-mini-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: '#e50914' }}
            >
              <span className="sala-mini-icono">🎭</span>
              <div>
                <p className="sala-mini-nombre">{sala}</p>
                <p className="sala-mini-funciones">{funcionesSala.length} funciones activas</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* FORMULARIO */}
      <AnimatePresence>
        {mostrarForm && (
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h3>➕ Nueva función</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Película</label>
                <select name="pelicula" value={form.pelicula} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {PELICULAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Sala</label>
                <select name="sala" value={form.sala} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {SALAS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Horario</label>
                <input type="time" name="horario" value={form.horario} onChange={handleChange} />
              </div>
            </div>
            <div className="form-botones">
              <motion.button className="btn-cancelar" onClick={() => setMostrarForm(false)} whileHover={{ scale: 1.02 }}>
                Cancelar
              </motion.button>
              <motion.button className="btn-guardar" onClick={handleGuardar} whileHover={{ scale: 1.02 }}>
                ✅ Agregar función
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CARDS DE FUNCIONES */}
      <div className="funciones-grid">
        <AnimatePresence>
          {filtradas.map((f, i) => (
            <motion.div
              key={f.id}
              className={`funcion-card ${!f.activa ? 'inactiva' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, borderColor: f.activa ? '#e50914' : '#333' }}
            >
              <div className="funcion-header">
                <div>
                  <h3 className="funcion-titulo">{f.pelicula}</h3>
                  <div className="funcion-meta">
                    <span className="funcion-sala">🎭 {f.sala}</span>
                    <span className="funcion-fecha">📅 {new Date(f.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <motion.span
                  className={`estado-badge ${f.activa ? 'activa' : 'inactiva'}`}
                  onClick={() => toggleActiva(f.id)}
                  whileHover={{ scale: 1.08 }}
                  style={{ cursor: 'pointer' }}
                >
                  {f.activa ? '● Activa' : '○ Pausada'}
                </motion.span>
              </div>

              {/* HORARIOS */}
              <div className="funcion-horarios">
                {f.horarios.map(h => (
                  <span key={h} className="horario-chip">🕐 {h}</span>
                ))}
              </div>

              {/* OCUPACIÓN */}
              <div className="funcion-ocupacion">
                <div className="ocupacion-header">
                  <span>Ocupación</span>
                  <span style={{ color: getOcupacionColor(f.ocupacion), fontWeight: 700 }}>
                    {f.ocupacion}%
                  </span>
                </div>
                <div className="ocupacion-barra-wrap">
                  <motion.div
                    className="ocupacion-barra"
                    initial={{ width: 0 }}
                    animate={{ width: `${f.ocupacion}%` }}
                    transition={{ delay: i * 0.07 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    style={{ backgroundColor: getOcupacionColor(f.ocupacion) }}
                  />
                </div>
              </div>

              {/* ACCIONES */}
              <div className="funcion-acciones">
                <motion.button
                  className="btn-editar"
                  whileHover={{ scale: 1.05, backgroundColor: '#3b82f6', color: 'white' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setEditandoId(f.id); setForm({ pelicula: f.pelicula, sala: f.sala, fecha: f.fecha, horario: '' }); setMostrarForm(true) }}
                >
                  ✏️ Editar
                </motion.button>
                <motion.button
                  className="btn-eliminar"
                  whileHover={{ scale: 1.05, backgroundColor: '#e50914', color: 'white' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEliminar(f.id)}
                >
                  🗑️ Eliminar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}