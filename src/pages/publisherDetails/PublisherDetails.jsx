import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublisherById } from "../../service/publishers";

export async function loader({ params }) {
  return { id: params.id };  // Cargamos el id desde la URL
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
        const data = await fetchPublisherById(id);  // Usamos el id para obtener los detalles
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
    <section className="p-5">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-green-500 mb-4">{publisher.name}</h1>
        <p className="text-gray-400 text-lg mb-4">Juegos publicados: {publisher.games_count}</p>
        <p className="text-gray-300 text-md">{publisher.description || "No hay descripción disponible."}</p>
      </div>
    </section>
  );
};

export default PublisherDetails;
