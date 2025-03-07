const API_KEY = "b2685e103fb743d09dc5325f1174937d"
const BASE_URL = "https://api.rawg.io/api"

export const fetchPopularGames = async () => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=10`)
  const data = await response.json()
  return data.results
}

export const fetchGames = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20`)
  return await response.json()
}

export const searchGames = async (searchTerm, page = 1) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${searchTerm}&page=${page}&page_size=20`)
  return await response.json()
}

export const fetchGameDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
  return await response.json()
}

export const fetchGamesByTagOrGenre = async (type, id, page = 1) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&${type}s=${id}&page=${page}&page_size=20`)
  return await response.json()
}

export const fetchPublisherDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/publishers/${id}?key=${API_KEY}`)
  return await response.json()
}

export const fetchPublisherGames = async (id, page = 1) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&publishers=${id}&page=${page}&page_size=20`)
  return await response.json()
}

export const fetchPublishers = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=20`)
  return await response.json()
}

export const searchPublishers = async (searchTerm, page = 1) => {
  const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${searchTerm}&page=${page}&page_size=20`)
  return await response.json()
}

export const fetchTags = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}&page=${page}&page_size=20`)
  return await response.json()
}

export const searchTags = async (searchTerm, page = 1) => {
  const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}&search=${searchTerm}&page=${page}&page_size=20`)
  return await response.json()
}

