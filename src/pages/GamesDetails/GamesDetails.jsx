"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchGameDetails } from "../../service/games"

/**
 * @function GameDetailsPage
 * @description Componente que muestra los detalles de un juego específico.
 * Permite agregar o quitar el juego de favoritos.
 * @returns {JSX.Element} Componente con los detalles del juego.
 */
const GamesDetails = () => {
  const [game, setGame] = useState(null) // Estado para almacenar los detalles del juego
  const [isFavorite, setIsFavorite] = useState(false) // Estado para controlar si el juego es favorito
  const { id } = useParams() // Obtiene el ID del juego de los parámetros de la URL

  useEffect(() => {
    /**
     * @async
     * @function loadGameDetails
     * @description Carga los detalles del juego desde la API y actualiza el estado.
     */
    const loadGameDetails = async () => {
      const gameDetails = await fetchGameDetails(id) // Llama a la API para obtener detalles del juego
      setGame(gameDetails) // Actualiza el estado con los detalles del juego
    }
    loadGameDetails() // Ejecuta la función para cargar los detalles del juego
  }, [id]) // Se ejecuta cuando el ID cambia

  /**
   * @function toggleFavorite
   * @description Cambia el estado de favorito del juego.
   */
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite) // Alterna el estado de favorito
    // Aquí se podría actualizar la información en una base de datos o almacenamiento local
  }

  // Si los detalles del juego aún no se han cargado, muestra un mensaje de carga
  if (!game) {
    return (
      <div style={{ padding: "3rem 0", textAlign: "center", color: "#fff", backgroundColor: "#1a202c" }}>
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "#1a202c",
        color: "#fff",
        padding: "2rem",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#00ff9d",
        }}
      >
        {game.name}
      </h1>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", width: "100%" }}>
        <div style={{ flex: "1", minWidth: "300px", width: "100%" }}>
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              marginBottom: "1rem",
              borderRadius: "4px",
            }}
          />

          <button
            onClick={toggleFavorite}
            style={{
              backgroundColor: isFavorite ? "#f59e0b" : "transparent",
              color: isFavorite ? "#000" : "#f59e0b",
              border: "1px solid #f59e0b",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#00ff9d" }}>About</h2>
            <p style={{ lineHeight: "1.6" }}>{game.description_raw}</p>
          </div>
        </div>

        <div style={{ flex: "1", minWidth: "300px", width: "100%" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#00ff9d" }}>Details</h2>

            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#00ff9d" }}>Fecha de lanzamiento:</span>
                <span>{game.released}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: "#00ff9d", marginRight: "0.5rem" }}>Rating:</span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#f59e0b", marginRight: "0.25rem" }}>★</span>
                  {game.rating}/5
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#00ff9d" }}>Plataformas:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {game.platforms.map((p) => (
                  <span
                    key={p.platform.id}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#4a5568",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#00ff9d" }}>Géneros:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {game.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/games/genre/${genre.id}`}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#4a5568",
                      borderRadius: "4px",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#00ff9d" }}>Tags:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {game.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/games/tag/${tag.id}`}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#4a5568",
                      borderRadius: "4px",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#00ff9d" }}>Publisher:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {game.publishers.map((publisher) => (
                  <Link
                    key={publisher.id}
                    to={`/publisher/${publisher.id}`}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#4a5568",
                      borderRadius: "4px",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    {publisher.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesDetails

