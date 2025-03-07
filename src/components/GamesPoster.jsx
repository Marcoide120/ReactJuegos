"use client"

import { Link } from "react-router-dom"

const GamesPoster = ({ game }) => {
  // Asegurarse de que los géneros sean un array y extraer solo los nombres
  const genres = Array.isArray(game.genres) ? game.genres.map((genre) => genre.name || genre) : []

  return (
    <Link
      to={`/game/${game.id}`}
      style={{
        textDecoration: "none",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          wordWrap: "break-word",
          backgroundColor: "#0f1319",
          backgroundClip: "border-box",
          border: "none",
          borderRadius: "1rem",
          height: "100%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)"
          e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "200px",
          }}
        >
          <img
            src={game.background_image || game.image_background || "/placeholder.svg"}
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
              transition: "transform 0.5s ease",
            }}
            alt={game.name}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          />
        </div>
        <div
          style={{
            flex: "1 1 auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h5
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "#ffffff",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {game.name}
          </h5>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffd700",
              }}
            >
              <span style={{ marginRight: "4px" }}>★</span>
              <span style={{ color: "#ffffff" }}>{game.rating || "N/A"}</span>
            </div>
            <div
              style={{
                padding: "0.25rem 0.5rem",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              {(game.released || game.year || "N/A").toString().split("-")[0]}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GamesPoster

