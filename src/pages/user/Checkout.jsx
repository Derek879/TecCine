import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import './Checkout.css'

const PELICULAS = [
  { id: 1, titulo: 'Avengers: Doomsday', precio: 18.90, imagen: 'https://picsum.photos/seed/av1/300/450' },
  { id: 2, titulo: 'Minecraft: La Película', precio: 16.90, imagen: 'https://picsum.photos/seed/mc2/300/450' },
  { id: 3, titulo: 'Sonic 3', precio: 16.90, imagen: 'https://picsum.photos/seed/sn3/300/450' },
  { id: 4, titulo: 'Thunderbolts', precio: 18.90, imagen: 'https://picsum.photos/seed/tb4/300/450' },
  { id: 5, titulo: 'Lilo & Stitch', precio: 15.90, imagen: 'https://picsum.photos/seed/ls5/300/450' },
  { id: 6, titulo: 'Misión Imposible 8', precio: 19.90, imagen: 'https://picsum.photos/seed/mi6/300/450' },
]

const FILAS = ['A', 'B', 'C', 'D', 'E', 'F',   'G', 'H']
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const OCUPADOS = ['A3', 'A4', 'B7', 'C1', 'C2', 'D5', 'E3', 'E8', 'F2', 'F6', 'G4', 'G9', 'H1', 'H11']

const COMBOS = [
  {
    id: 1,
    nombre: 'Combo Personal',
    descripcion: '1 gaseosa mediana + 1 canguil mediano',
    precio: 14.90,
    icono: '🥤',
    popular: false,
  },
  {
    id: 2,
    nombre: 'Combo Pareja',
    descripcion: '2 gaseosas grandes + 1 canguil grande',
    precio: 24.90,
    icono: '🍿',
    popular: true,
  },
  {
    id: 3,
    nombre: 'Combo Familiar',
    descripcion: '4 gaseosas + 2 canguiles + 4 nachos',
    precio: 44.90,
    icono: '🎉',
    popular: false,
  },
  {
    id: 4,
    nombre: 'Solo entrada',
    descripcion: 'Sin combo, solo la entrada',
    precio: 0,
    icono: '🎟️',
    popular: false,
  },
]

const PASOS = ['Asientos', 'Combos', 'Pago', 'Confirmación']

export default function Checkout() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const horario = searchParams.get('horario')
  const { user } = useAuth()

  const pelicula = PELICULAS.find(p => p.id === parseInt(id))

  const [asientosSeleccionados, setAsientosSeleccionados] = useState([])
  const [comboSeleccionado, setComboSeleccionado] = useState(null)
  const [paso, setPaso] = useState(1)
  const [pagando, setPagando] = useState(false)

  const [numeroTarjeta, setNumeroTarjeta] = useState('')
  const [vencimiento, setVencimiento] = useState('')
  const [cvv, setCvv] = useState('')
  const [nombreTarjeta, setNombreTarjeta] = useState('')
  const [errores, setErrores] = useState({})

  const toggleAsiento = (asiento) => {
    if (OCUPADOS.includes(asiento)) return
    setAsientosSeleccionados(prev =>
      prev.includes(asiento)
        ? prev.filter(a => a !== asiento)
        : [...prev, asiento]
    )
  }

  const precioEntradas = asientosSeleccionados.length * (pelicula?.precio || 0)
  const precioCombo = comboSeleccionado?.precio || 0
  const total = precioEntradas + precioCombo

  const handleNumeroTarjeta = (e) => {
    let valor = e.target.value.replace(/\D/g, '').slice(0, 16)
    valor = valor.replace(/(.{4})/g, '$1 ').trim()
    setNumeroTarjeta(valor)
  }

  const handleVencimiento = (e) => {
    let valor = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (valor.length >= 3) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2)}`
    }
    setVencimiento(valor)
  }

  const handleCvv = (e) => {
    const valor = e.target.value.replace(/\D/g, '').slice(0, 3)
    setCvv(valor)
  }

  const validarPago = () => {
    const nuevosErrores = {}

    if (!numeroTarjeta.trim()) {
      nuevosErrores.numeroTarjeta = 'Ingresa el número de tarjeta'
    } else if (numeroTarjeta.replace(/\s/g, '').length !== 16) {
      nuevosErrores.numeroTarjeta = 'La tarjeta debe tener 16 dígitos'
    }

    if (!vencimiento.trim()) {
      nuevosErrores.vencimiento = 'Ingresa la fecha de vencimiento'
    } else if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
      nuevosErrores.vencimiento = 'Formato inválido: MM/AA'
    }

    if (!cvv.trim()) {
      nuevosErrores.cvv = 'Ingresa el CVV'
    } else if (cvv.length !== 3) {
      nuevosErrores.cvv = 'El CVV debe tener 3 dígitos'
    }

    if (!nombreTarjeta.trim()) {
      nuevosErrores.nombreTarjeta = 'Ingresa el nombre de la tarjeta'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handlePagar = () => {
    if (!validarPago()) return

    setPagando(true)
    setTimeout(() => {
      setPaso(4)
      setPagando(false)
    }, 2000)
  }

  if (!pelicula) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p style={{ color: '#888' }}>Película no encontrada</p>
        <Link to="/cartelera" style={{ color: '#e50914' }}>← Volver</Link>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="pasos">
        {PASOS.map((p, i) => (
          <div
            key={p}
            className={`paso ${paso === i + 1 ? 'activo' : ''} ${paso > i + 1 ? 'completado' : ''}`}
          >
            <motion.span
              className="paso-num"
              animate={{
                backgroundColor: paso > i + 1 ? '#e50914' : paso === i + 1 ? '#e50914' : 'transparent',
                scale: paso === i + 1 ? 1.15 : 1
              }}
            >
              {paso > i + 1 ? '✓' : i + 1}
            </motion.span>
            <span>{p}</span>
            {i < PASOS.length - 1 && (
              <div className={`paso-linea ${paso > i + 1 ? 'completada' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
{paso === 1 && (
  <motion.div
    key="asientos"
    className="checkout-content"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.35 }}
  >
    <div className="sala-wrap">
      <h2>Selecciona tus asientos</h2>
      <p className="sala-info">🎬 {pelicula.titulo} — {horario}hs</p>

      <div className="sala-container">

        {/* PANTALLA */}
        <div className="pantalla-wrap">
          <p className="pantalla-texto">Pantalla</p>
          <div className="pantalla-barra" />
          <div className="pantalla-curva" />
        </div>

        {/* ASIENTOS */}
        <div className="sala">
          {FILAS.map(fila => {
            const esFijaAA = fila === 'AA'
            const cols = esFijaAA ? [1,2,3,4,5,6,7,8] : COLS
            return (
              <div key={fila} className="fila">
                <span className="fila-label">{fila}</span>
                <div className="fila-asientos">
                  {cols.map(col => {
                    const sid = `${fila}${col}`
                    const ocupado = OCUPADOS.includes(sid)
                    const seleccionado = asientosSeleccionados.includes(sid)
                    const discapacidad = esFijaAA && col >= 7
                    return (
                      <motion.button
                        key={sid}
                        className={`asiento-circulo ${ocupado ? 'ocupado' : ''} ${seleccionado ? 'seleccionado' : ''} ${discapacidad ? 'discapacidad' : ''}`}
                        onClick={() => toggleAsiento(sid)}
                        disabled={ocupado || discapacidad}
                        whileHover={!ocupado && !discapacidad ? { scale: 1.2, y: -2 } : {}}
                        whileTap={!ocupado && !discapacidad ? { scale: 0.9 } : {}}
                        title={sid}
                      >
                        {discapacidad ? '♿' : ''}
                      </motion.button>
                    )
                  })}
                  {/* espaciado visual fila AA */}
                  {esFijaAA && <span style={{ flex: 1 }} />}
                </div>
                <span className="fila-label">{fila}</span>
              </div>
            )
          })}
        </div>

        {/* LEYENDA */}
        <div className="leyenda">
          <span><span className="dot-circulo libre-c" /> Disponible</span>
          <span><span className="dot-circulo ocupado-c" /> Ocupada</span>
          <span><span className="dot-circulo seleccionado-c" /> Seleccionada</span>
          <span><span className="dot-circulo disc-c">♿</span> Silla de ruedas</span>
        </div>

        {/* NOTA DISCAPACIDAD */}
        <p className="nota-disc">
          ♿ Todas nuestras salas cuentan con espacios para sillas de ruedas.
        </p>
      </div>

      {/* BARRA INFERIOR */}
      <div className="sala-footer">
        <div className="butacas-seleccionadas">
          <span>Butacas seleccionadas:</span>
          <div className="butacas-tags">
            {asientosSeleccionados.length === 0
              ? <span className="sin-seleccion">Ninguna</span>
              : asientosSeleccionados.map(a => (
                <motion.span
                  key={a}
                  className="butaca-tag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {a}
                </motion.span>
              ))
            }
          </div>
        </div>
        <motion.button
          className="btn-continuar"
          disabled={asientosSeleccionados.length === 0}
          onClick={() => setPaso(2)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Continuar ›
        </motion.button>
      </div>
    </div>
  </motion.div>
)}
        {paso === 2 && (
          <motion.div
            key="combos"
            className="combos-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <h2>¿Quieres agregar un combo? 🍿</h2>
            <p className="combos-sub">Ahorra comprando tu combo junto con las entradas</p>

            <div className="combos-grid">
              {COMBOS.map((combo, i) => (
                <motion.div
                  key={combo.id}
                  className={`combo-card ${comboSeleccionado?.id === combo.id ? 'seleccionado' : ''}`}
                  onClick={() => setComboSeleccionado(combo)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, borderColor: '#e50914' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {combo.popular && <span className="combo-popular">⭐ Más popular</span>}
                  <div className="combo-icono">{combo.icono}</div>
                  <h3>{combo.nombre}</h3>
                  <p>{combo.descripcion}</p>
                  <div className="combo-precio">
                    {combo.precio > 0 ? `S/. ${combo.precio.toFixed(2)}` : 'Gratis'}
                  </div>
                  {comboSeleccionado?.id === combo.id && (
                    <motion.div
                      className="combo-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="combos-footer">
              <div className="resumen-mini">
                <span>🎟️ {asientosSeleccionados.length} entrada(s): <strong>S/. {precioEntradas.toFixed(2)}</strong></span>
                {comboSeleccionado && comboSeleccionado.precio > 0 && (
                  <span>🍿 {comboSeleccionado.nombre}: <strong>S/. {comboSeleccionado.precio.toFixed(2)}</strong></span>
                )}
                <span className="total-mini">Total: <strong>S/. {total.toFixed(2)}</strong></span>
              </div>
              <div className="combos-botones">
                <motion.button className="btn-volver" onClick={() => setPaso(1)} whileHover={{ scale: 1.02 }}>
                  ← Volver
                </motion.button>
                <motion.button
                  className="btn-siguiente"
                  disabled={!comboSeleccionado}
                  onClick={() => setPaso(3)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continuar al pago →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {paso === 3 && (
          <motion.div
            key="pago"
            className="pago-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <h2>Datos de pago 💳</h2>

            <div className="pago-card">
              <div className="pago-resumen">
                <h4>Resumen de compra</h4>
                <p>🎬 <strong>{pelicula.titulo}</strong></p>
                <p>💺 Asientos: {asientosSeleccionados.join(', ')}</p>
                <p>🕐 Horario: {horario}hs</p>
                {comboSeleccionado && <p>🍿 {comboSeleccionado.nombre}</p>}
                <hr style={{ borderColor: '#222', margin: '1rem 0' }} />
                <p>Entradas: S/. {precioEntradas.toFixed(2)}</p>
                {comboSeleccionado?.precio > 0 && <p>Combo: S/. {comboSeleccionado.precio.toFixed(2)}</p>}
                <div className="resumen-total" style={{ marginTop: '0.8rem' }}>
                  <span>Total</span>
                  <span>S/. {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-pago">
                <label>Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={numeroTarjeta}
                  onChange={handleNumeroTarjeta}
                />
                {errores.numeroTarjeta && <span className="error-text">{errores.numeroTarjeta}</span>}

                <div className="form-row">
                  <div>
                    <label>Vencimiento</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={vencimiento}
                      onChange={handleVencimiento}
                    />
                    {errores.vencimiento && <span className="error-text">{errores.vencimiento}</span>}
                  </div>

                  <div>
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      value={cvv}
                      onChange={handleCvv}
                    />
                    {errores.cvv && <span className="error-text">{errores.cvv}</span>}
                  </div>
                </div>

                <label>Nombre en la tarjeta</label>
                <input
                  type="text"
                  placeholder={user?.name?.toUpperCase() || 'NOMBRE COMPLETO'}
                  value={nombreTarjeta}
                  onChange={(e) => setNombreTarjeta(e.target.value)}
                />
                {errores.nombreTarjeta && <span className="error-text">{errores.nombreTarjeta}</span>}

                <div className="pago-botones">
                  <motion.button
                    className="btn-volver"
                    onClick={() => setPaso(2)}
                    whileHover={{ scale: 1.02 }}
                  >
                    ← Volver
                  </motion.button>

                  <motion.button
                    className="btn-pagar"
                    onClick={handlePagar}
                    disabled={pagando}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {pagando ? (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      >
                        Procesando...
                      </motion.span>
                    ) : `Pagar S/. ${total.toFixed(2)}`}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {paso === 4 && (
          <motion.div
            key="confirmacion"
            className="confirmacion"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="confirmacion-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              ✓
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              ¡Compra exitosa!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tu compra ha sido confirmada. ¡Disfruta la película!
            </motion.p>

            <motion.div
              className="confirmacion-detalle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p>🎬 <strong>{pelicula.titulo}</strong></p>
              <p>💺 Asientos: <strong>{asientosSeleccionados.join(', ')}</strong></p>
              <p>🕐 Horario: <strong>{horario}hs</strong></p>
              {comboSeleccionado && <p>🍿 Combo: <strong>{comboSeleccionado.nombre}</strong></p>}
              <p>💰 Total pagado: <strong>S/. {total.toFixed(2)}</strong></p>
              <p>👤 Cliente: <strong>{user?.name}</strong></p>
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/historial" className="btn-siguiente">Ver mis entradas</Link>
              <Link to="/cartelera" className="btn-volver">Ver más películas</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}