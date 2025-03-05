const API_KEY = "b2685e103fb743d09dc5325f1174937d"

export const fetchAllPublishers = async (query = "", page = 1) => {
  try {
    let url = `https://api.rawg.io/api/publishers?key=${API_KEY}&page_size=40&page=${page}`
    if (query) {
      url += `&search=${query}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los publishers")

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

export const fetchPublisherById = async (id) => {
  try {
    const url = `https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener el publisher")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchPublisherGames = async (id, page = 1) => {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${id}&page_size=12&page=${page}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los juegos del publisher")

    const data = await response.json()
    return {
      results: data.results || [],
      totalPages: Math.ceil(data.count / 12),
      count: data.count,
    }
  } catch (error) {
    console.error("Error:", error)
    return { results: [], totalPages: 0, count: 0 }
  }
}

