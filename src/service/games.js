
export const fetchPopularGames = async () => {
    const fetchGames = async () => {
        try {
          const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`);
          const data = await response.json();
          setGames(data.results);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching games:", error);
          setIsLoading(false);
        }
      };

}

