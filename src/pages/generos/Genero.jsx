"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGamesByTagOrGenre } from "../../service/games"
import GameCard from "../../components/GamesPoster"
import Pagination from "../../components/Pagination"

const Genero = () => {
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { type, id } = useParams()

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGamesByTagOrGenre(type, id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadGames()
  }, [type, id, currentPage])

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
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#22c55e" }}>
          {type === "tag" ? "Tag" : "Genero"}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {games.map((game) => (
            <div key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default Genero