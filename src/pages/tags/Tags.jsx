import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTagsBySlug } from "../../service/games"; 

const TagDetails = () => {
  const { slug } = useParams(); // Usamos `slug` en lugar de `id`
  const [tag, setTag] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTag = async () => {
      setLoading(true);
      try {
        const data = await fetchTagsBySlug(slug); // Ahora usamos `slug`
        if (!data) throw new Error();
        setTag(data);
      } catch (err) {
        setError("Error al obtener información del tag");
      }
      setLoading(false);
    };
    loadTag();
  }, [slug]);

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

            {/* 🚀 Sección de Juegos Relacionados */}
            <div>
              <p className="font-bold text-green-400 mb-2">Juegos relacionados:</p>
              {tag.games && tag.games.length > 0 ? (
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
              ) : (
                <p className="text-gray-400">No hay juegos relacionados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetails;
