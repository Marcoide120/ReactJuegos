"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Importamos Link
import { fetchPublishers, searchPublishers } from "../../service/games"
import Pagination from "../../components/Pagination"

const Publishers = () => {
  const [publishers, setPublishers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        setIsLoading(true)
        const result = await fetchPublishers(currentPage)
        if (Array.isArray(result.results)) {
          setPublishers(result.results)
          setTotalPages(Math.ceil(result.count / 20))
        } else {
          console.error("Los datos recibidos no tienen el formato esperado:", result)
          setPublishers([])
          setTotalPages(0)
        }
      } catch (error) {
        console.error("Error al cargar los publishers:", error)
        setPublishers([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }
    loadPublishers()
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
        const result = await searchPublishers(searchTerm, 1)
        if (Array.isArray(result.results)) {
          setPublishers(result.results)
          setTotalPages(Math.ceil(result.count / 20))
        }
        setCurrentPage(1)
      } catch (error) {
        console.error("Error en la búsqueda:", error)
        setPublishers([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getColumnCount = () => {
    if (windowWidth >= 1200) return 4
    if (windowWidth >= 992) return 3
    if (windowWidth >= 768) return 2
    return 1
  }

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
            Biblioteca de Publishers
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
                placeholder="Buscar publishers..."
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
            {publishers.map((publisher) => (
              <Link
                key={publisher.id}
                to={`/publisher/${publisher.id}`} // Redirige a la página de detalles del publisher
                style={{
                  backgroundColor: "#0f1319",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = ""
                  e.currentTarget.style.boxShadow = ""
                }}
              >
                <img
                  src={publisher.image_background || "/placeholder.svg"}
                  alt={publisher.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <h2
                    style={{
                      color: "#fff",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {publisher.name}
                  </h2>
                  <p
                    style={{
                      color: "#22c55e",
                      fontSize: "0.875rem",
                    }}
                  >
                    Juegos publicados: {publisher.games_count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && publishers.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  )
}

export default Publishers