import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTagsById } from "../../service/tags"; // Asumiendo que tienes una función para obtener los tags

export async function loader({ params }) {
  return { id: params.id }; // Cargamos el ID desde la URL
}

const TagDetails = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTag = async () => {
      setLoading(true);
      try {
        const data = await fetchTagsById(id); // Obtener datos del tag
        setTag(data);
      } catch (err) {
        setError("Error al obtener información del tag");
      }
      setLoading(false);
    };
    loadTag();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-green-600 text-xl">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-xl">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-green-400 mb-4">
              {tag.name}
            </h1>

            <p className="text-lg text-gray-400 mb-4">
              <span className="font-bold text-green-400">Descripción:</span>{" "}
              {tag.description || "No hay descripción disponible."}
            </p>

            <p className="text-lg text-gray-400 mb-4">
              <span className="font-bold text-green-400">Cantidad de juegos:</span>{" "}
              {tag.games_count || 0}
            </p>

            <div>
              <p className="font-bold text-green-400 mb-2">Juegos relacionados:</p>
              <ul className="flex flex-wrap gap-2">
                {tag.games.map((game) => (
                  <li
                    key={game.id}
                    className="px-4 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-green-500 hover:text-black transition-all duration-200"
                  >
                    {game.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetails;
