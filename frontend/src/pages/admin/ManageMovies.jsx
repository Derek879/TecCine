import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Admin.css'

const INICIAL = [
  { id: 1, titulo: 'Avengers: Doomsday', genero: 'Acción', duracion: '2h 30min', precio: 18.90, activa: true },
  { id: 2, titulo: 'Minecraft: La Película', genero: 'Aventura', duracion: '1h 50min', precio: 16.90, activa: true },
  { id: 3, titulo: 'Sonic 3', genero: 'Animación', duracion: '1h 45min', precio: 16.90, activa: true },
  { id: 4, titulo: 'Thunderbolts', genero: 'Acción', duracion: '2h 10min', precio: 18.90, activa: true },
  { id: 5, titulo: 'Lilo & Stitch', genero: 'Familiar', duracion: '1h 55min', precio: 15.90, activa: false },
  { id: 6, titulo: 'Misión Imposible 8', genero: 'Thriller', duracion: '2h 20min', precio: 19.90, activa: true },
]

const VACIO = { titulo: '', genero: '', duracion: '', precio: '' }

export default function ManageMovies() {
  const [peliculas, setPeliculas] = useState(INICIAL)
  const [form, setForm] = useState(VACIO)
  const [editandoId, setEditandoId] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [eliminando, setEliminando] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleGuardar = () => {
    if (!form.titulo || !form.genero || !form.duracion || !form.precio) return
    if (editandoId) {
      setPeliculas(prev => prev.map(p =>
        p.id === editandoId ? { ...p, ...form, precio: parseFloat(form.precio) } : p
      ))
      setEditandoId(null)
    } else {
      setPeliculas(prev => [...prev, {
        id: Date.now(), ...form,
        precio: parseFloat(form.precio), activa: true
      }])
    }
    setForm(VACIO)
    setMostrarForm(false)
  }

  const handleEditar = (p) => {
    setForm({ titulo: p.titulo, genero: p.genero, duracion: p.duracion, precio: p.precio })
    setEditandoId(p.id)
    setMostrarForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = (id) => {
    setEliminando(id)
    setTimeout(() => {
      setPeliculas(prev => prev.filter(p => p.id !== id))
      setEliminando(null)
    }, 400)
  }

  const toggleActiva = (id) =>
    setPeliculas(prev => prev.map(p =>
      p.id === id ? { ...p, activa: !p.activa } : p
    ))

  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="admin-page">

      {/* HEADER */}
      <motion.div
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Link to="/admin" className="back-link">← Dashboard</Link>
          <h1>🎬 Gestionar películas</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Buscar..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="buscador-admin"
          />
          <motion.button
            className="btn-nuevo"
            onClick={() => { setMostrarForm(true); setEditandoId(null); setForm(VACIO) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Nueva película
          </motion.button>
        </div>
      </motion.div>

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
            <h3>{editandoId ? '✏️ Editar película' : '➕ Nueva película'}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título de la película" />
              </div>
              <div className="form-group">
                <label>Género</label>
                <select name="genero" value={form.genero} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {['Acción','Aventura','Animación','Terror','Drama','Familiar','Thriller'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Duración</label>
                <input name="duracion" value={form.duracion} onChange={handleChange} placeholder="Ej: 2h 15min" />
              </div>
              <div className="form-group">
                <label>Precio (S/.)</label>
                <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="18.90" step="0.10" />
              </div>
            </div>
            <div className="form-botones">
              <motion.button
                className="btn-cancelar"
                onClick={() => setMostrarForm(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                className="btn-guardar"
                onClick={handleGuardar}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {editandoId ? '💾 Guardar cambios' : '✅ Agregar película'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TABLA */}
      <motion.div
        className="tabla-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Duración</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtradas.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: eliminando === p.id ? 0 : 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td><strong>{p.titulo}</strong></td>
                  <td>
                    <span className="genero-pill">{p.genero}</span>
                  </td>
                  <td style={{ color: '#888' }}>{p.duracion}</td>
                  <td><span className="precio-verde">S/. {p.precio.toFixed(2)}</span></td>
                  <td>
                    <motion.span
                      className={`estado-badge ${p.activa ? 'activa' : 'inactiva'}`}
                      onClick={() => toggleActiva(p.id)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ cursor: 'pointer' }}
                    >
                      {p.activa ? '● Activa' : '○ Inactiva'}
                    </motion.span>
                  </td>
                  <td>
                    <div className="acciones">
                      <motion.button
                        className="btn-editar"
                        onClick={() => handleEditar(p)}
                        whileHover={{ scale: 1.08, backgroundColor: '#3b82f6', color: 'white' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ✏️ Editar
                      </motion.button>
                      <motion.button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(p.id)}
                        whileHover={{ scale: 1.08, backgroundColor: '#e50914', color: 'white' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🗑️ Eliminar
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

    </div>
  )
}