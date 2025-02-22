import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGenres } from "../../service/games";

export default function GenreDetails() {
  const { slug } = useParams(); // Obtén el slug de la URL
  const [genre, setGenre] = useState(null); // Detalles del género específico
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Obtén la lista de todos los géneros
        const allGenres = await fetchGenres();

        // Busca el género específico usando el slug
        const selectedGenre = allGenres.find((g) => g.slug === slug);

        if (!selectedGenre) {
          throw new Error("No se encontró el género");
        }

        // Guarda el género seleccionado
        setGenre(selectedGenre);
      } catch (err) {
        setError("Error al obtener información del género");
      }
      setLoading(false);
    };
    loadData();
  }, [slug]);

  if (isLoading) {
    return <p className="text-center text-green-600 text-xl">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-xl">{error}</p>;
  }

  if (!genre) {
    return <p className="text-center text-red-600 text-xl">No se encontró el género.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Detalles del género */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">
              {genre.name}
            </h1>

            {/* Cantidad de juegos */}
            <p className="font-bold text-green-400 mb-2">Cantidad de juegos:</p>
            <p className="text-gray-400">{genre.games_count || 0}</p>

            {/* Lista de juegos en este género */}
            <div>
              <p className="font-bold text-green-400 mb-2">Juegos en este género:</p>
              {genre.games && genre.games.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {genre.games.map((game) => (
                    <li
                      key={game.id}
                      className="px-4 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      {game.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No hay juegos disponibles en este género.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}