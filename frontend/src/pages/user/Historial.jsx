import { Link } from "react-router-dom";
import "./Historial.css";

export default function Historial({ user }) {
  const entradas = [
    {
      id: 1,
      titulo: "Avengers: Doomsday",
      fecha: "23/03/2026",
      hora: "19:30hs",
      asientos: "C3, C4",
      cantidad: 2,
      total: 37.8,
      estado: "Pagado",
      imagen: "https://picsum.photos/seed/av1/300/450",
    },
    {
      id: 2,
      titulo: "Sonic 3",
      fecha: "15/03/2026",
      hora: "15:30hs",
      asientos: "B5",
      cantidad: 1,
      total: 16.9,
      estado: "Pagado",
      imagen: "https://picsum.photos/seed/sonic3/300/450",
    },
    {
      id: 3,
      titulo: "Lilo & Stitch",
      fecha: "02/03/2026",
      hora: "12:30hs",
      asientos: "A1, A2, A3",
      cantidad: 3,
      total: 47.7,
      estado: "Pagado",
      imagen: "https://picsum.photos/seed/lilo/300/450",
    },
  ];

  const totalGastado = entradas.reduce((acc, item) => acc + item.total, 0);
  const totalEntradas = entradas.reduce((acc, item) => acc + item.cantidad, 0);
  const ultimaCompra = entradas.length > 0 ? entradas[0].fecha : "-";

  return (
    <div className="historial-page">
      <div className="historial-header">
        <h1>Mis entradas</h1>
        <p className="historial-sub">
          Bienvenido, <strong>{user?.name || "Usuario"}</strong>. Aquí están tus compras.
        </p>
      </div>

      {entradas.length > 0 ? (
        <>
          <div className="historial-resumen">
            <div className="resumen-card">
              <span>Total gastado</span>
              <strong>S/. {totalGastado.toFixed(2)}</strong>
            </div>

            <div className="resumen-card">
              <span>Total de entradas</span>
              <strong>{totalEntradas}</strong>
            </div>

            <div className="resumen-card">
              <span>Última compra</span>
              <strong>{ultimaCompra}</strong>
            </div>
          </div>

          <div className="historial-lista">
            {entradas.map((entrada) => (
              <div className="historial-item" key={entrada.id}>
                <img src={entrada.imagen} alt={entrada.titulo} />

                <div className="historial-info">
                  <h3>{entrada.titulo}</h3>
                  <p>📅 {entrada.fecha} — {entrada.hora}</p>
                  <p>🎟️ Asientos: {entrada.asientos}</p>
                  <p>
                    🎫 {entrada.cantidad} {entrada.cantidad === 1 ? "entrada" : "entradas"}
                  </p>
                </div>

                <div className="historial-total">
                  <span>S/. {entrada.total.toFixed(2)}</span>
                  <span className="badge-pagado">✓ {entrada.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="historial-empty">
          <p>Aún no has comprado entradas.</p>
          <Link to="/cartelera" className="btn-ir">
            Ver cartelera
          </Link>
        </div>
      )}
    </div>
  );
}