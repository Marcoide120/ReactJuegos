"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPopularGames } from "../../service/games"

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchPopularGames()
        setGames(gamesData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setIsLoading(false)
      }
    }

    loadGames()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [games])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length)
  }

  // Define keyframes for spin animation
  const spinKeyframes = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#111827",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <style>{spinKeyframes}</style>
          <div
            style={{
              animation: "spin 1s linear infinite",
              borderRadius: "9999px",
              height: "4rem",
              width: "4rem",
              borderTop: "2px solid #10b981",
              borderBottom: "2px solid #10b981",
              margin: "0 auto 1rem auto",
            }}
          ></div>
          <h2
            style={{
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Cargando...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "#4b5563",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <section
        style={{
          width: "100%",
          height: "50vh",
          marginBottom: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url('/portada.jpeg')",
        }}
      >
        <div
          style={{
            padding: "0 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <h1
              style={{
                fontSize:
                  window.innerWidth < 640
                    ? "1.875rem"
                    : window.innerWidth < 768
                      ? "2.25rem"
                      : window.innerWidth < 1024
                        ? "3rem"
                        : "3.75rem",
                color: "white",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              La Juegoteca virtual
            </h1>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "#e5e7eb",
                fontSize: window.innerWidth < 768 ? "1rem" : "1.25rem",
              }}
            >
              La mejor información sobre videojuegos. Actuales, indi, 8-bits, etc.
            </p>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "#e5e7eb",
                fontSize: window.innerWidth < 768 ? "1rem" : "1.25rem",
              }}
            >
              Si quieres buscar algún juego este es tu sitio.
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Link
              style={{
                display: "inline-flex",
                height: "2.25rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                backgroundColor: "#10b981",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "white",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "background-color 0.2s",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#10b981")}
              to="/Games"
            >
              Adéntrate en el universo virtual
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          padding: "2rem 0",
          width: "100%",
          height: "50vh",
        }}
      >
        <h2
          style={{
            fontSize: window.innerWidth < 768 ? "1.875rem" : "3rem",
            color: "#34d399",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            marginBottom: "2rem",
          }}
        >
          Los más recientes
        </h2>

        <div
          style={{
            position: "relative",
            width: "90%",
            height: "calc(50vh - 8rem)",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "100%",
                transition: "transform 0.7s ease-in-out",
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {games.map((game, index) => (
                <div
                  key={game.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${index * 100}%`,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
                      opacity: 0.7,
                      padding: "1.5rem",
                      borderBottomLeftRadius: "0.75rem",
                      borderBottomRightRadius: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontSize: "1.875rem",
                        fontWeight: 600,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {game.name}
                    </h3>
                    <p
                      style={{
                        color: "#f3f4f6",
                        fontSize: "1.125rem",
                      }}
                    >
                      {game.released}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: index === currentIndex ? "#10b981" : "#9ca3af",
                margin: "0 0.25rem",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

