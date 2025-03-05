

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchTagsBySlug } from "../../service/games"

const TagDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [tag, setTag] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoadingGames, setIsLoadingGames] = useState(false)

  useEffect(() => {
    const loadTag = async () => {
      setLoading(true)
      try {
        await loadGames(1)
      } catch (err) {
        setError("Error al obtener información del tag")
      }
      setLoading(false)
    }
    loadTag()
  }, []) // Removed slug from dependencies

  const loadGames = async (page) => {
    setIsLoadingGames(true)
    try {
      const data = await fetchTagsBySlug(slug, page)
      if (!data) throw new Error("No se pudo cargar la información del tag")

      setTag(data)
      setTotalPages(data.totalPages || 1)
      setCurrentPage(page)
    } catch (err) {
      console.error("Error al cargar juegos:", err)
      setError("Error al obtener información del tag")
    }
    setIsLoadingGames(false)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadGames(newPage)
      // Scroll al inicio de la sección de juegos
      document.getElementById("games-section")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleGameClick = (gameId) => {
    navigate(`/GamesDetails/${gameId}`)
  }

  if (isLoading) {
    return <p className="text-center text-green-600 text-xl">Cargando...</p>
  }

  if (error) {
    return <p className="text-center text-red-600 text-xl">{error}</p>
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">{tag.name}</h1>

            <p className="text-lg text-gray-400 mb-4">
              <span className="font-bold text-green-400">Cantidad de juegos:</span> {tag.games_count || 0}
            </p>

            {tag.description && (
              <div className="mb-8">
                <p className="text-base leading-relaxed text-gray-300">{tag.description.replace(/<[^>]*>/g, "")}</p>
              </div>
            )}

            <div id="games-section" className="mt-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Juegos relacionados:</h2>

              {isLoadingGames ? (
                <p className="text-center text-green-600 text-xl">Cargando juegos...</p>
              ) : tag.games && tag.games.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tag.games.map((game) => (
                      <div
                        key={game.id}
                        className="bg-gray-700 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleGameClick(game.id)}
                      >
                        {game.background_image && (
                          <img
                            src={game.background_image || "/placeholder.svg"}
                            alt={game.name}
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-green-300">{game.name}</h3>
                          <p className="text-sm text-gray-400">Lanzamiento: {game.released || "Desconocido"}</p>
                          <p className="text-sm text-gray-400">Rating: {game.rating || "N/A"}/5</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded ${
                            currentPage === 1
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          Anterior
                        </button>

                        <span className="text-gray-300">
                          Página {currentPage} de {totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded ${
                            currentPage === totalPages
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400">No hay juegos relacionados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagDetails

