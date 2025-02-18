const API_KEY = "b2685e103fb743d09dc5325f1174937d";

export const fetchPopularGames = async (setGames, setIsLoading) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`);
        const data = await response.json();
        setGames(data.results);
        setIsLoading(false);
    } catch (error) {
        alert("Error fetching games:", error);
        setIsLoading(false);
    }
};

export const fetchAllGames = async (query = "", page = 1) => {
    try {
        let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`;
        if (query) {
            url += `&search=${query}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener los juegos");

        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: Math.ceil(data.count / 40),
        };
    } catch (error) {
        alert("Error:", error);
        return { results: [], totalPages: 0 };
    }
};

export const fetchGamesDetails = async (id, setGame, setLoading) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener los detalles del juego");

        const data = await response.json();
        setGame(data);
    } catch (error) {
        alert("Error:", error);
        setGame(null);
    } finally {
        setLoading(false);
    }
};
