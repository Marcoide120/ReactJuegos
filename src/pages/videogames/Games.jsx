import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "b2685e103fb743d09dc5325f1174937d";

function Games() {
    const [isLoading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
                if (!response.ok) throw new Error("Error al obtener los juegos");

                const data = await response.json();
                setGames(data.results);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="p-5">
            <div className="flex justify-center items-center gap-6 mb-6">
                <h1 className="font-rubiksh text-green-600 font-extrabold text-4xl">
                    Biblioteca de juegos
                </h1>

                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    className="px-5 py-3 w-80 text-lg rounded-full border-2 border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-green-600 text-xl font-semibold animate-pulse">Cargando juegos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {filteredGames.map((game) => (
    <Link to={`/gamesDetails/${game.id}`} key={game.id}>
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={game.background_image || "/placeholder.svg"}
          alt={game.name}
          className="w-full h-56 object-cover rounded-t-3xl"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4 truncate">{game.name}</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-yellow-500 font-semibold">⭐ {game.rating}</p>
            <span className="bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
              {game.released ? new Date(game.released).getFullYear() : "N/A"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {game.genres &&
              game.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-gray-800 text-xs font-medium px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
                >
                  {genre.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

            )}
        </section>
    );
}

export default Games;




