import { motion } from 'framer-motion'
import MovieCard from './MovieCard'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function MovieGrid({ peliculas }) {
  if (!peliculas || peliculas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
        <p style={{ fontSize: '1.2rem' }}>😕 No se encontraron películas</p>
      </div>
    )
  }

  return (
    <motion.div
      className="movies-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {peliculas.map(p => (
        <motion.div key={p.id} variants={itemVariants}>
          <MovieCard pelicula={p} />
        </motion.div>
      ))}
    </motion.div>
  )
}