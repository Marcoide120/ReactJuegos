import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const API_KEY = "b2685e103fb743d09dc5325f1174937d";

export async function loader({ params }) {
  return { id: params.id };
}

export default function GamesDetails() {
  const { id } = useLoaderData();
  const [game, setGame] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener los detalles del juego");

        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-green-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Imagen del juego */}
          <div className="w-full lg:w-1/3">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="rounded-lg shadow-md w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
  
          {/* Información del juego */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">{game.name}</h1>
            <p className="text-base leading-relaxed text-gray-300 mb-6">{game.description_raw}</p>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Detalles generales */}
              <div>
                <p className="text-lg">
                  <span className="font-bold text-green-400">Fecha de lanzamiento:</span>{" "}
                  <span className="text-gray-300">{game.released || "N/A"}</span>
                </p>
                <p className="text-lg mt-2">
                  <span className="font-bold text-green-400">Rating:</span>{" "}
                  <span className="text-yellow-400">⭐ {game.rating}</span>
                </p>
              </div>
  
              {/* Géneros */}
              <div>
                <p className="font-bold text-green-400 mb-2">Géneros:</p>
                <ul className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="px-4 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Plataformas */}
              <div>
                <p className="font-bold text-green-400 mb-2">Plataformas:</p>
                <ul className="flex flex-wrap gap-2">
                  {game.platforms.map((platform) => (
                    <li
                      key={platform.platform.id}
                      className="px-4 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      {platform.platform.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}


