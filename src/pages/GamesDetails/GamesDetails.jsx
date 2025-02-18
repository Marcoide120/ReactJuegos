import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchGamesDetails } from "../../service/games"; // Asegúrate de importar la función correctamente

export async function loader({ params }) {
  return { id: params.id };
}

export default function GamesDetails() {
  const { id } = useLoaderData();
  const [game, setGame] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamesDetails(id, setGame, setLoading);
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
          <div className="w-full lg:w-1/3">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="rounded-lg shadow-md w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">{game.name}</h1>
            
            {game.description_raw ? (
              <p className="text-base leading-relaxed text-gray-300 mb-6">{game.description_raw}</p>
            ) : (
              <p className="text-base leading-relaxed text-gray-300 mb-6">No hay descripción en español disponible.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

              <div>
                <p className="font-bold text-green-400 mb-2">Publisher:</p>
                <ul className="flex flex-wrap gap-2">
                  {game.publishers.map((publisher) => (
                    <li
                      key={publisher.id}
                      className="px-4 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      {publisher.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-green-400 mb-2">Tags:</p>
                <ul className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <li
                      key={tag.id}
                      className="px-4 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      {tag.name}
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
