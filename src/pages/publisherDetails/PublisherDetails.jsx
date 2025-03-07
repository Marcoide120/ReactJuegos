"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchPublisherDetails, fetchPublisherGames } from "../../service/games"
import GameCard from "../../components/GamesPoster"
import Pagination from "../../components/Pagination"

const PublisherDetails = () => {
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const loadPublisherDetails = async () => {
      const details = await fetchPublisherDetails(id)
      setPublisher(details)
    }
    loadPublisherDetails()
  }, [id])

  useEffect(() => {
    const loadPublisherGames = async () => {
      const result = await fetchPublisherGames(id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadPublisherGames()
  }, [id, currentPage])

  if (!publisher) {
    return <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#1a1f2b", color: "#ffffff" }}>Loading...</div>
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#1a1f2b", color: "#ffffff" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#22c55e" }}>{publisher.name}</h1>
      {publisher.image_background && (
        <img
          src={publisher.image_background || "/placeholder.svg"}
          alt={publisher.name}
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      {/* Descripción sin etiqueta */}
      {publisher.description || "No description available."}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "1rem" }}>
        {games.map((game) => (
          <div key={game.id} style={{ flex: "1 1 calc(33.333% - 16px)", maxWidth: "calc(33.333% - 16px)" }}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default PublisherDetails