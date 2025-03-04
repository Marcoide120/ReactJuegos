const API_KEY = "b2685e103fb743d09dc5325f1174937d"

export const fetchPopularGames = async (setGames, setIsLoading) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`)
    const data = await response.json()
    setGames(data.results)
    setIsLoading(false)
  } catch (error) {
    alert("Error fetching games:", error)
    setIsLoading(false)
  }
}

export const fetchAllGames = async (query = "", page = 1) => {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`
    if (query) {
      url += `&search=${query}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los juegos")

    const data = await response.json()
    return {
      results: data.results || [],
      totalPages: Math.ceil(data.count / 40),
    }
  } catch (error) {
    alert("Error:", error)
    return { results: [], totalPages: 0 }
  }
}

export const fetchGamesDetails = async (id, setGame, setLoading) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los detalles del juego")

    const data = await response.json()
    setGame(data)
  } catch (error) {
    alert("Error:", error)
    setGame(null)
  } finally {
    setLoading(false)
  }
}

// Obtenemos los juegos relacionados con el tag con paginación
export const fetchTagsBySlug = async (slug, page = 1) => {
  try {
    // Obtener información del tag
    const tagResponse = await fetch(`https://api.rawg.io/api/tags/${slug}?key=${API_KEY}`)
    if (!tagResponse.ok) throw new Error("Error al obtener los detalles del tag")
    const tagData = await tagResponse.json()

    // Obtener juegos relacionados con el tag (ahora con paginación)
    const gamesResponse = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&tags=${slug}&page_size=12&page=${page}`,
    )
    if (!gamesResponse.ok) throw new Error("Error al obtener los juegos del tag")
    const gamesData = await gamesResponse.json()

    return {
      ...tagData,
      games: gamesData.results || [],
      totalPages: Math.ceil(gamesData.count / 12),
      currentPage: page,
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

// Nueva función para obtener juegos por género con paginación
export const fetchGenreGames = async (slug, page = 1) => {
  try {
    // Obtener información del género
    const genreResponse = await fetch(`https://api.rawg.io/api/genres/${slug}?key=${API_KEY}`)
    if (!genreResponse.ok) throw new Error("Error al obtener los detalles del género")
    const genreData = await genreResponse.json()

    // Obtener juegos del género con paginación
    const gamesResponse = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&genres=${slug}&page_size=12&page=${page}`,
    )
    if (!gamesResponse.ok) throw new Error("Error al obtener los juegos del género")
    const gamesData = await gamesResponse.json()

    return {
      ...genreData,
      games: gamesData.results || [],
      totalPages: Math.ceil(gamesData.count / 12),
      currentPage: page,
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchGenres = async () => {
  try {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los géneros")

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export const fetchPublisherById = async (id) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los detalles del publisher")

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

