import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Admin.css'

const USUARIOS_INICIAL = [
  { id: 1, name: 'Carlos López', email: 'carlos@gmail.com', role: 'user', compras: 5, fecha: '10/01/2026' },
  { id: 2, name: 'María García', email: 'maria@gmail.com', role: 'user', compras: 3, fecha: '15/01/2026' },
  { id: 3, name: 'Admin CinePlanet', email: 'admin@cine.com', role: 'admin', compras: 0, fecha: '01/01/2026' },
  { id: 4, name: 'Pedro Díaz', email: 'pedro@gmail.com', role: 'user', compras: 8, fecha: '20/02/2026' },
  { id: 5, name: 'Ana Torres', email: 'ana@gmail.com', role: 'user', compras: 2, fecha: '05/03/2026' },
]

export default function ManageUsers() {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIAL)
  const [busqueda, setBusqueda] = useState('')
  const [eliminando, setEliminando] = useState(null)

  const filtrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  const toggleRol = (id) =>
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u
    ))

  const handleEliminar = (id) => {
    setEliminando(id)
    setTimeout(() => {
      setUsuarios(prev => prev.filter(u => u.id !== id))
      setEliminando(null)
    }, 400)
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
          <h1>👥 Gestionar usuarios</h1>
        </div>
        <input
          type="text"
          placeholder="🔍 Buscar usuario..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="buscador-admin"
        />
      </motion.div>

      {/* CARDS DE USUARIOS */}
      <div className="usuarios-grid">
        <AnimatePresence>
          {filtrados.map((u, i) => (
            <motion.div
              key={u.id}
              className="usuario-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: eliminando === u.id ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, borderColor: u.role === 'admin' ? '#818cf8' : '#3b82f6' }}
            >
              <div className="usuario-avatar" style={{
                background: u.role === 'admin' ? '#1a1a3a' : '#051a2a',
                color: u.role === 'admin' ? '#818cf8' : '#3b82f6',
                border: `2px solid ${u.role === 'admin' ? '#3730a3' : '#1d4ed8'}`
              }}>
                {u.name.charAt(0).toUpperCase()}
              </div>
              <div className="usuario-info">
                <h3>{u.name}</h3>
                <p>{u.email}</p>
                <div className="usuario-meta">
                  <span className={`rol-badge ${u.role}`}>
                    {u.role === 'admin' ? '⭐ Admin' : '👤 Usuario'}
                  </span>
                  <span className="compras-badge">🎟️ {u.compras} compras</span>
                </div>
                <p className="usuario-fecha">Desde: {u.fecha}</p>
              </div>
              <div className="usuario-acciones">
                <motion.button
                  className="btn-editar"
                  onClick={() => toggleRol(u.id)}
                  whileHover={{ scale: 1.05, backgroundColor: '#3b82f6', color: 'white' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {u.role === 'admin' ? '👤 Quitar admin' : '⭐ Hacer admin'}
                </motion.button>
                <motion.button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(u.id)}
                  whileHover={{ scale: 1.05, backgroundColor: '#e50914', color: 'white' }}
                  whileTap={{ scale: 0.95 }}
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