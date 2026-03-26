import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MovieCard({ pelicula }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/pelicula/${pelicula.id}`} className="movie-card">
        <div className="movie-img-wrap">
          <img src={pelicula.imagen} alt={pelicula.titulo} />
          <motion.div
            className="movie-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <span>🎟️ Comprar</span>
          </motion.div>
          {pelicula.clasificacion && (
            <span className="movie-clasificacion">{pelicula.clasificacion}</span>
          )}
        </div>
        <div className="movie-info">
          <h3>{pelicula.titulo}</h3>
          <div className="movie-meta">
            <span className="genero">{pelicula.genero}</span>
            <span className="duracion">🕐 {pelicula.duracion}</span>
          </div>
          {pelicula.precio && (
            <div className="movie-precio">S/. {pelicula.precio.toFixed(2)}</div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}