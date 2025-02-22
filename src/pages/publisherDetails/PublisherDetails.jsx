import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublisherById } from "../../service/publishers";

export async function loader({ params }) {
  return { id: params.id };
}

const PublisherDetails = () => {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPublisher = async () => {
      setLoading(true);
      try {
        const data = await fetchPublisherById(id);
        setPublisher(data);
      } catch (err) {
        setError("Error al obtener información del publisher");
      }
      setLoading(false);
    };
    loadPublisher();
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
              {publisher.name}
            </h1>

            <p className="text-lg text-gray-400 mb-4">
              <span className="font-bold text-green-400">Juegos publicados:</span>{" "}
              {publisher.games_count}
            </p>

            <p className="text-base leading-relaxed text-gray-300 mb-6">
              {publisher.description
                ? publisher.description.replace(/<[^>]*>/g, "")
                : "No hay descripción disponible."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherDetails;
