import { useEffect, useState } from "react";
import GamesPoster from '../../components/GamesPoster';

const API_KEY = "b2685e103fb743d09dc5325f1174937d";

function Games() {
    const [isLoading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

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

    return (
        <section className="p-5">
            <h1 className='font-rubiksh text-green-600 font-extrabold text-4xl mb-3'>
                Biblioteca de juegos
            </h1>

            {/* Muestra un mensaje de carga mientras se obtienen los datos */}
            {isLoading ? (
                <p className="text-center text-white text-lg">Cargando juegos...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {games.map((game) => (
                        <div key={game.id} className="bg-white p-4 rounded-xl shadow-md">
                            <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-lg font-semibold mt-2">{game.name}</h3>
                            <p className="text-gray-600">⭐ {game.rating}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Games;
