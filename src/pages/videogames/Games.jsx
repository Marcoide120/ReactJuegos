"use client"

import { useState, useEffect } from "react"
import { fetchGames, searchGames } from "../../service/games"
import GamesPoster from "../../components/GamesPoster"
import Pagination from "../../components/Pagination"

const Games = () => {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true)
        const result = await fetchGames(currentPage)
        // Asegurarse de que result.results es un array
        if (Array.isArray(result.results)) {
          setGames(result.results)
          setTotalPages(Math.ceil(result.count / 20))
        } else {
          console.error("Los datos recibidos no tienen el formato esperado:", result)
          setGames([])
          setTotalPages(0)
        }
      } catch (error) {
        console.error("Error al cargar los juegos:", error)
        setGames([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }
    loadGames()
  }, [currentPage])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      try {
        setIsLoading(true)
        const result = await searchGames(searchTerm, 1)
        if (Array.isArray(result.results)) {
          setGames(result.results)
          setTotalPages(Math.ceil(result.count / 20))
        }
        setCurrentPage(1)
      } catch (error) {
        console.error("Error en la búsqueda:", error)
        setGames([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Calculate columns based on screen width
  const getColumnCount = () => {
    if (windowWidth >= 1200) return 4 // xl breakpoint
    if (windowWidth >= 992) return 3 // lg breakpoint
    if (windowWidth >= 768) return 2 // md breakpoint
    return 1 // default for small screens
  }

  // Calculate grid template columns
  const getGridTemplateColumns = () => {
    const count = getColumnCount()
    return `repeat(${count}, 1fr)`
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1f2b",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              margin: 0,
              color: "#22c55e",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Biblioteca de juegos
          </h1>

          <form
            onSubmit={handleSearch}
            style={{
              flex: "1",
              maxWidth: "500px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  color: "#ffffff",
                  backgroundColor: "#0f1319",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  outline: "none",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar juegos..."
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#22c55e"
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34,197,94,0.2)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
            </div>
          </form>
        </div>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <div
              style={{
                border: "4px solid rgba(255,255,255,0.1)",
                borderTop: "4px solid #22c55e",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            />
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: getGridTemplateColumns(),
              gap: "1.5rem",
            }}
          >
            {games.map((game) => (
              <GamesPoster key={game.id} game={game} />
            ))}
          </div>
        )}

        {!isLoading && games.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  )
}

export default Games

