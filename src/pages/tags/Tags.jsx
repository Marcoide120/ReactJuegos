"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchTags, fetchGamesByTagOrGenre } from "../../service/games"
import GameCard from "../../components/GamesPoster"
import Pagination from "../../components/Pagination"

const TagDetails = () => {
  const [tag, setTag] = useState(null)
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const loadTagDetails = async () => {
      const details = await fetchTags(id)
      setTag(details)
    }
    loadTagDetails()
  }, [id])

  useEffect(() => {
    const loadTagGames = async () => {
      const result = await fetchGamesByTagOrGenre("tags", id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadTagGames()
  }, [id, currentPage])

  if (!tag) {
    return <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#1a1f2b", color: "#ffffff" }}>Loading...</div>
  }

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#1a1f2b", 
      color: "#ffffff", 
      minHeight: "100vh", // Ocupa al menos el 100% del alto de la ventana
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between" // Distribuye el espacio entre los elementos
    }}>
      <div>
        {/* Nombre del Tag */}
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#22c55e" }}>
          {tag.name} {/* Muestra el nombre del tag */}
        </h1>

        {/* Descripción del Tag (si está disponible) */}
        {tag.description && (
          <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#a0aec0" }}>
            {tag.description} {/* Muestra la descripción del tag */}
          </p>
        )}

        {/* Cantidad de Juegos */}
        <p style={{ fontSize: "1.25rem", marginBottom: "20px" }}>
          Games count: {tag.games_count} {/* Muestra la cantidad de juegos */}
        </p>

        {/* Lista de Juegos Relacionados */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {games.map((game) => (
            <div key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default TagDetails