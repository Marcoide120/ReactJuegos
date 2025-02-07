import { useEffect, useState } from "react";

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

    // Filtrar juegos por nombre según el término de búsqueda
    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="p-5">
            {/* Contenedor del título y la barra de búsqueda */}
            <div className="flex justify-center items-center gap-6 mb-6">
                <h1 className="font-rubiksh text-green-600 font-extrabold text-4xl">
                    Biblioteca de juegos
                </h1>

                {/* Barra de búsqueda alineada a la derecha del título y centrada */}
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    className="px-5 py-3 w-80 text-lg rounded-full border-2 border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Muestra un mensaje de carga mientras se obtienen los datos */}
            {isLoading ? (
                <p className="text-center text-white text-lg">Cargando juegos...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                            <div key={game.id} className="bg-gray-900 p-4 rounded-xl shadow-md">
                                <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="text-lg text-white font-semibold mt-2">{game.name}</h3>
                                <p className="text-white">⭐ {game.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center col-span-full">No se encontraron juegos</p>
                    )}
                </div>
            )}
        </section>
    );
}

export default Games;



